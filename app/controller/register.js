'use strict';

const Controller = require('egg').Controller;
class RegisterController extends Controller {
  async index() {
    const { ctx, app } = this;
    let msg = null;
    const data = ctx.request.body;
    const name = ctx.helper.privateDecrypt(data.name);

    // const passwork = ctx.helper.privateDecrypt(data.passwork);
    const seeions = app.redis.get(data.seeions);

    if (data.seeions && seeions) {
      app.redis.del(data.seeions);
      const use = await ctx.service.register.getUser(name);
      console.log('use', use);
      if (use && use.name === name) {
        msg = { errmsg: '用户名已被注册', code: 500 };
      } else {
        const insertData = {
          name,
          passwork: data.passwork,
          phone: data.phone,
          createTime: new Date().getTime(),
          updateTime: new Date().getTime(),
        };
        const result = await ctx.service.register.insert(insertData);
        if (result.affectedRows === 1) {
          msg = { errmsg: '注册成功' };
        } else {
          msg = { errmsg: '注册失败', code: 500 };
        }
      }
    } else {
      msg = { errmsg: '无效请求', code: 200503 };
    }
    ctx.body = ctx.helper.outPut(msg);
  }
  async getPlubKey() {
    const { ctx, app } = this;
    const prvKey = ctx.helper.getPluKey();
    const seeions = `${Math.floor(new Date().getTime())}${Math.floor(Math.random() * Math.pow(10, 8))}`;
    app.redis.set(seeions, seeions, 'EX', 60 * 2);
    ctx.body = ctx.helper.outPut({ data: { prekey: prvKey, seeions } });
  }
}

module.exports = RegisterController;

