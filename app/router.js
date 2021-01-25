'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/', controller.home.index);
  router.get('/login', controller.login.login);
  router.get('/login/index', controller.login.index);
  router.get('/login/test', controller.login.test);
  router.get('/register', controller.register.index);
  router.post('/register/index', controller.register.test);
};
