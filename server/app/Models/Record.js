"use strict";

const Model = use("Model");

//记录
class Record extends Model {
  static get table() {
    return "record";
  }
  static get primaryKey() {
    return "id";
  }
  static get createdAtColumn() {
    return "createdAt";
  }
  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Record;
