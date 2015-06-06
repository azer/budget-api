var expenses = require("./expenses");
var api = require("circle")({
  '/list-expenses': expenses.list,
  '/add-expense/:title/:amount': expenses.add,
  '/remove-expense/:id': expenses.remove,
  '/change-expense/:id/:amount': expenses.change
});

api.start(process.env.PORT || 8888, 'localhost');
