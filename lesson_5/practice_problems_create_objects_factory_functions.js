// 1. The two disadvantages of using factory functions are that all code for methods is duplicated with every new object made, and that there's no way to tell whether an object was made from a factory function (to inspect/confirm which type it is).

// 2
function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

// 3
function createInvoice(obj) {
  let phone, internet;
  
  if (obj === undefined || !obj.phone) {
    phone = 3000;
  } else {
    phone = obj.phone;
  }
  
  if (obj === undefined || !obj.internet) {
    internet = 5500;
  } else {
    internet = obj.internet;
  }

  return {
    phone: phone,
    internet: internet,
    total() {
      return this.phone + this.internet;
    },
  };
}

// 4
function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || null,
    
    total() {
      if (this.amount) return this.amount;
      
      return this.phone + this.internet;
    },
  };
}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

// 5
// 5
function createInvoice(obj = {}) {
  return {
    phone: obj.phone || 3000,
    internet: obj.internet || 5500,
    payments: [],
    
    totalOwed() {
      return this.phone + this.internet;
    },
    
    totalPaid() {
      return this.payments.reduce((totalPaid, payment) => totalPaid + payment.total(), 0);
    },
    
    addPayment(payment) {
      this.payments.push(payment);
    },
    
    addPayments(paymentsArr) {
      paymentsArr.forEach(payment => {
        this.addPayment(payment);
      });
    },
    
    amountDue() {
      return this.totalOwed() - this.totalPaid();
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;
  let i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || null,
    
    total() {
      if (this.amount) return this.amount;
      
      return this.phone + this.internet;
    },
  };
}


let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
