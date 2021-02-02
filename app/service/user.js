'use strict';
// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
  constructor(...args) {
    super(...args);
    this.tableName = 'user';
  }

  async getUser(name) {
    const user = await this.app.mysql.get(this.tableName, { name });
    return user;
  }
  async insert(data) {
    const result = await this.app.mysql.insert(this.tableName, data);
    return result;
  }
}

module.exports = UserService;

