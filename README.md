# ATM Software
This is a mock ATM. You are able to do Withdrawals, Deposits, and check your balance.

# Getting it running & WrapUp
See [Wrap Up](./wrap-up.md)

# Validations in place
#### Making Withdrawals
When making a withdrawal, the following rules apply.
- A customer can withdraw no more than $200 in a single transaction.
- A customer can withdraw no more than $400 in a single day. 
- A customer can withdraw any amount that can be dispensed in $5 bills.
- The customer cannot withdraw more than they have in their account, unless it is a credit account, in which case they cannot withdraw more than their credit limit.

#### Making Deposits
When making a deposit, the following rules apply.
- A customer cannot deposit more than $1000 in a single transaction.
- If this is a credit account, the customer cannot deposit more in their account than is needed to 0 out the account.

#### Checking Balance
The customer should be output their balance when selecting this option.


