'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/', controller.home.index);
  router.post('/login', controller.login.login);
  router.get('/login/index', controller.login.index);
  router.post('/register', controller.register.index);
  router.get('/getPlubKey', controller.register.getPlubKey);
};
