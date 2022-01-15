// My final code differed in a few slight ways but functioned the same as best as I can tell. This is my final version after all 10 problems.

function makeAccount(number) {
  let balance = 0;
  const transactions = [];

  return {
    number() { 
      return number;
    },

    balance() {
      return balance;
    },

    transactions() {
      return transactions;
    },

    logTransaction(type, amount) {
      transactions.push({ type, amount });
    },

    deposit(amount) {
      balance += amount;
      this.logTransaction('deposit', amount);
      return amount;
    },

    withdraw(amount) {
      let withdrawn = amount;
      balance -= amount;

      if (balance < 0) {
        withdrawn += balance;
        balance = 0;
      }

      this.logTransaction('withdrawal', amount);
      return withdrawn;
    },
  };
}

function makeBank() {
  const accounts = [];
  
  return {
    lastAccountNumber: 100,
    
    getNewAccountNumber() {
      this.lastAccountNumber += 1;
      return this.lastAccountNumber;
    },
    
    getAccount(accountNum) {
      const account = accounts.find(account => account.number === accountNum);
      
      return account;
    },
    
    openAccount() {
      const newAccount = makeAccount(this.getNewAccountNumber());
      
      accounts.push(newAccount);
      return newAccount;
    },
    
    transfer(from, to, amount) {
      from = this.getAccount(from.number);
      to = this.getAccount(to.number);
      
      if (from && to) {
        from.withdraw(amount);
        to.deposit(amount);
        return amount;
      } else {
        console.log('Transfer failed: invalid account(s).');
      }
    },
  };
}

// let bank = makeBank();
// let source = bank.openAccount();
// console.log(source.deposit(10));
// // 10
// let destination = bank.openAccount();
// console.log(bank.transfer(source, destination, 7));
// // 7
// console.log(source.balance);
// // 3
// console.log(destination.balance);
// // 7

// let bank = makeBank();
// let account = bank.openAccount();
// console.log(account.balance());
// // 0
// console.log(account.deposit(17));
// // 17
// let secondAccount = bank.openAccount();
// console.log(secondAccount.number());
// // 102
// console.log(account.transactions());
// // [Object]

let bank = makeBank();
console.log(bank.accounts);
// undefined
