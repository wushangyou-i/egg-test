'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const crypto = require('crypto');
// const pubkey = require('../public/pub-key');

class loginController extends Controller {
  async login() {
    // const { ctx } = this;
    // const result = await this.ctx.service.login.login(1);
    // console.log(result);
    // console.log(ctx);
    // ctx.body = result;
    const { ctx, app } = this;
    const { id } = ctx.request.query;
    const token = await app.jwt.sign({
      id,
    }, app.config.jwt.secret);
    console.log(ctx.request.query, token);
    ctx.body = token;
  }
  async index() {
    const { ctx } = this;
    console.log(ctx.state.user);
    ctx.body = { code: 201, msg: '验证成功' };
  }
  async test() {
    const writeData = '哈哈哈';

    const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVjuVnj34QuRwmBxVCU1Fk+IuY
CAANchHQGeDnnAbGUWYOIsIKCMVCDYlQqL0GL6sC5Jpx3M6GSQUgxL1SR2hYqOva
xfUCYRKlRcLBbraCqlc7rC+FrFLxctLS7POks/lJSEGXkM7wrka73V+w2nvTx52+
5RpFzbn7XOFo4cvzLwIDAQAB
-----END PUBLIC KEY-----
`;

    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDVjuVnj34QuRwmBxVCU1Fk+IuYCAANchHQGeDnnAbGUWYOIsIK
CMVCDYlQqL0GL6sC5Jpx3M6GSQUgxL1SR2hYqOvaxfUCYRKlRcLBbraCqlc7rC+F
rFLxctLS7POks/lJSEGXkM7wrka73V+w2nvTx52+5RpFzbn7XOFo4cvzLwIDAQAB
AoGAbwvU4drNdKisqGF6fniQlG5hN/bBADzWYl1ygzywkSL2bFdKiqkw2T3srxJu
5+6Vf/WbEaX9hfomPnnO8B/Nc4iqwVqocIK2P8/7IlcqbRvFTOOJWcX0W3ubo54y
jf5HGTyqbeO5lT7E+7TdGP6GUSjYpdWYxZI6Yya3sy3ZDuECQQD+ZgF/ivhwlUZD
DSoioUX9NgQcvDkZ/kilOdJtaQFT1tqQPFqLUqFGLRVME9lUWFRfkJw5ZHShbt0J
3zFtSFAHAkEA1ucSOMYN4dXUonDxOxHTDbfgVnI4+FR/k5hgcenFXpBTBAQjLaoo
QCI52jvEU2BkzfpdagTpWs8kYsNHxmUpmQJBAPCJZnU/4zQgEHUpp2Ni9Zg7UJwS
5DLNmcaP64UDufuZtMKYLkx5bn+59N8gDWeQtQY+51fkwdo5xsmkvUlFDFUCQQCX
r03LSPAvgTCu361FllU0D5+HJORVU78gvKMGhIzNLG2MHid+aeYzLnVLNnhiqV09
jgQ1evYDJMZ394JH5MuxAkEAqtJf9AiKzI+hJtEKTuvhDC1UROyyocny6fcw5hBJ
hjHY8MCRdWUvmwChK0N1uhM/z3lHa8fwyQRREgUSDPeB+A==
-----END RSA PRIVATE KEY-----
`;

    const path = '../static/key.txt';


    // 加密
    const publicKeyData = crypto.publicEncrypt(publicKey, Buffer.from(writeData));
    // Buffer转为JSON
    fs.writeFileSync(path, JSON.stringify(publicKeyData.toJSON()), function(err) {
      if (err) console.error(err);
    });

    const data = fs.readFileSync(path, 'utf-8');
    // 解密
    const bufferData = JSON.parse(data);
    const buffer = Buffer.from(bufferData.data); // JSON转为Buffer
    const readData = crypto.privateDecrypt(privateKey, buffer);

    console.log('publicKeyData', publicKeyData); // 哈哈哈
    console.log('readData', readData);
  }
}

module.exports = loginController;
