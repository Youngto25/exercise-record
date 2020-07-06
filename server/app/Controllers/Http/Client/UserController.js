"use strict";

// const _ = require("lodash");
// const moment = require("moment");

const { User } = require("../../../Models");
const Env = use("Env");
//后台用户
class UserController {
  async index({ request, response }) {
    let vo = await User.query().fetch();
    return vo;
  }
}

module.exports = UserController;
