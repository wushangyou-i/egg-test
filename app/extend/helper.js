'use strict';

const JSEncrypt = require('node-jsencrypt');
// const key = require('../public/pub-key');
const path = require('path');
const fs = require('fs');
module.exports = {
  privateDecrypt(data) {
    const jsencrypt = new JSEncrypt();
    let prikey = '';
    prikey = fs.readFileSync(path.resolve(__dirname, '../static/rsa-prv.pem'), 'utf-8').toString();
    jsencrypt.setPrivateKey(prikey);
    // 解密数据
    const mess = jsencrypt.decrypt(data);
    return mess;
  },
  getPluKey() {
    let prvKey = '';
    prvKey = fs.readFileSync(path.resolve(__dirname, '../static/rsa-plu.pem'), 'utf-8').toString();
    prvKey = Buffer.from(prvKey).toString('base64');
    return prvKey;
  },
  outPut(paramdata) {
    const res = {
      data: paramdata.data || {},
      errmsg: paramdata.errmsg || '',
      errcode: paramdata.errcode || 0,
    };
    return res;
  },
  // setRedisKey(key) {

  // }
};

