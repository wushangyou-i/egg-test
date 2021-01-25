'use strict';
// app/service/user.js
const Service = require('egg').Service;

class LoginService extends Service {
  constructor(...args) {
    super(...args);
    this.tableName = 'user';
  }

  async login() {
    // const user = await this.app.mysql.select('user');
    const { ctx, app } = this;
    const { id } = ctx.request.query;
    const token = await app.jwt.sign({
      id,
    }, app.config.jwt.secret);
    console.log(ctx.request.query, token);
    ctx.body = token;

    // return user;
  }
  async index() {
    const { ctx } = this;
    console.log(ctx.state.user);
    ctx.body = { code: 201, msg: '验证成功' };
  }
}

module.exports = LoginService;

