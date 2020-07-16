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
  async show({ request, params, response }) {
    let vo = await User.find(1);
    if (!vo) {
      throw { error: 1000, message: "没有此记录" };
    }
    response.json(vo);
  }
}

module.exports = UserController;
