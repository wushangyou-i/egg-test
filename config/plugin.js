'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
