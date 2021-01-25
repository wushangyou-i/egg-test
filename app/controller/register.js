'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async test() {
    const { ctx } = this;
    console.log(111);
    ctx.body = 'hi, egg';
  }
}

module.exports = RegisterController;

