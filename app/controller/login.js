'use strict';

const Controller = require('egg').Controller;
class loginController extends Controller {
  async login() {
    const { ctx, app } = this;
    let msg = null;
    const data = ctx.request.body;
    const seeions = app.redis.get(data.seeions);
    console.log(data);
    if (data.seeions && seeions) {
      app.redis.del(data.seeions);
    } else {
      msg = { code: 20503, errmsg: '无效登陆' };
      ctx.body = ctx.helper.outPut(msg);
      return;
    }
    if (!data.name || !data.passwork) {
      msg = { code: 500, errmsg: '请填写完整信息' };
      ctx.body = ctx.helper.outPut(msg);
      return;
    }
    const name = ctx.helper.privateDecrypt(data.name);
    const passwork = ctx.helper.privateDecrypt(data.passwork);
    const user = await ctx.service.user.getUser(name);
    if (user && user.name === name) {
      if (passwork === ctx.helper.privateDecrypt(user.passwork)) {
        msg = { code: 0, errmsg: '登陆成功' };
      } else {
        msg = { code: 500, errmsg: '密码不正确' };
      }
    } else {
      msg = { code: 500, errmsg: '该账号不存在' };
    }
    ctx.body = ctx.helper.outPut(msg);
  }
  async index() {
    const { ctx } = this;
    console.log(ctx.state.user);
    const use = await ctx.service.register.getUser('张三');
    console.log(use);
    ctx.body = { code: 200, msg: '验证成功', data: use };
  }
}

module.exports = loginController;
