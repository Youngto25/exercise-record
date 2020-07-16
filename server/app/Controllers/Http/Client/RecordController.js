"use strict";

// const _ = require("lodash");
// const moment = require("moment");

const { User, Record } = require("../../../Models");
const Env = use("Env");
//锻炼记录相关
class RecordController {
  async index({ request, response }) {
    let { page = 1, perPage = 20, type } = request.all();
    let query = Record.query();
    if (type) {
      query.where({ type });
    }
    let vo = await query.orderBy("id", "desc").paginate(page, perPage);
    response.json(vo);
  }
  async store({ request, response }) {
    let { count, type, userID = 1 } = request.all();
    let user = await User.find(userID);
    if (!user) {
      throw { error: 1001, message: "没有该用户" };
    }
    let vo = await Record.create({ count, type, userID });
    if (type === "俯卧撑") {
      user.fCount += count;
    } else {
      user.yCount += count;
    }
    await user.save();
    response.json(vo);
  }
  async destroy({ request, params, response }) {
    let vo = await Record.find(params.id);
    if (!vo) {
      throw { error: 1000, message: "没有此记录" };
    }
    await vo.delete();
    response.json(vo);
  }
}

module.exports = RecordController;
