'use strict';

const loki = require("lokijs");

var db = new loki("transaction.db");
var transactions = db.addCollection("mocks");

exports.upsert = function (tranId, value) {
  transactions.chain().find({tranId}).remove();
  transactions.insert(value);
  return;
};

exports.getByTranId = function (tranId) {
  return transactions.find({ tranId: tranId });
};

exports.getAll = function () {
  return transactions.chain().simplesort('mocks').data();
};
