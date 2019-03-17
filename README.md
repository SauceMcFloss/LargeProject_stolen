## Testing with POSTMAN or ARC

### Get ALL expenses in database
GET request: https://trackdatcash.herokuapp.com/expenses/
<br/>Input:
``` No input required```
Output:
<br/>- returns all expenses in database

### Get all expenses for a specific user
GET request: https://trackdatcash.herokuapp.com/expenses/getAllExpenses
<br/>Input:
```
{
  "userId" : "5c78ce86a484a23550339d6a"
}
```
Output:
<br/>- returns all expenses for a specific user

### Add an expense 
POST request: https://trackdatcash.herokuapp.com/expenses/add
<br/>Input:
```
{
  "userId" : "5c78ce86a484a23550339d6a",
  "description" : "testing ARC", 
  "amount" : 0,
  "month" : "Mar",
  "day" : 10,
  "year" : 2019
}
```
Output:
```success: <expenseId>```

### Update an expense 
POST request: https://trackdatcash.herokuapp.com/expenses/update/:id
<br/>Input:
```
{
  "description" : "Updated item", 
  "amount" : 15,
  "month" : "Aug",
  "day" : 13,
  "year" : 2018
}
```
Output:
```success: <expenseId>```

- the /:id in the url is the expenseID which you can find from using the /expenses route
    - ex: https://trackdatcash.herokuapp.com/expenses/update/5c85c8617629140017ad930a
- this updates an expense

### Delete an expense 
DELETE request: https://trackdatcash.herokuapp.com/expenses/delete/:id
<br/>Input:
<br/>- delete expense from database
<br/>- does not need JSON object