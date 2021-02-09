'use strict';

const dataStoreService = require('../services/dataStoreService');

exports.restGet = function (req, res) {
  const storeReq = {
    tranId: 1,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body
  };
  dataStoreService.upsert(1, storeReq);
  console.log(dataStoreService.getByTranId(1));
  return res.status(200).json('Ok');
};

exports.restPost = function (req, res) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
  return res.status(200).json('Ok');
};
