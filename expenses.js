var now = require("unique-now");
var io = require("./io");

module.exports = {
  add: add,
  remove: remove,
  change: change,
  list: list
};

function add (reply, match) {
  set(now(), match.params.title, match.params.amount, match.params.leftAmount, reply);
}

function remove (reply, match) {
  io.del(match.params.id, function (err) {
    if (err) return reply(err);
    reply(undefined, true);
  });
}

function change (reply, match) {
  set(match.params.id, match.params.title, match.params.amount, match.params.leftAmount, reply);
}

function list (reply) {
  var result = [];

  io.createReadStream()
    .on('data', function (data) {
      result.push({ id: data.key, value: data.value });
    })
    .on('error', function (err) {
      reply(err);
    })
    .on('end', function () {
      reply(undefined, result);
    });
}


function set (id, title, amount, leftAmount, callback) {
  var rec = {
    title: title,
    amount: Number(amount),
    leftAmount: Number(leftAmount)
  };

  io.set(id, rec, function (err) {
    if (err) return callback(err);

    callback(undefined, {
      id: id,
      title: title,
      amount: amount,
      leftAmount: leftAmount
    });
  });
}
