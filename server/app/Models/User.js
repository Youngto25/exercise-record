"use strict";

const Model = use("Model");

//用户
class User extends Model {
  static get table() {
    return "user";
  }
  static get primaryKey() {
    return "id";
  }
  static get createdAtColumn() {
    return "createdAt";
  }
  static get updatedAtColumn() {
    return "updatedAt";
  }
}

module.exports = User;
