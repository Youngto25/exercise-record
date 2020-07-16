import React, { Component } from "react";
import logo from "./logo.svg";
import { Input, Select, Button, Carousel } from "antd";
import "./App.less";
import request from "./Utils/request";
import moment from "moment";

const { Option } = Select;

class App extends Component {
  state = {
    count: "",
    type: "俯卧撑",
    record: null,
    currentPage: 1,
    userInfo: null,
  };

  /* ---------- 生命周期  -----------  */
  async componentWillMount() {
    this.getRecord();
    this.getUserDetail();
  }

  componentDidMount() {}

  /* ---------- 事件  -----------  */
  async getRecord() {
    let { currentPage } = this.state;
    let data = await request("get", "record", { page: currentPage });
    console.log("data", data);
    this.setState({
      record: data,
    });
  }

  async getUserDetail() {
    let userInfo = await request("get", `user/0`);
    this.setState({
      userInfo,
    });
  }

  getCount(e) {
    let count = Number(e.target.value);
    this.setState({ count });
  }

  getType(e) {
    this.setState({ type: e });
  }

  async submit() {
    let { type, count } = this.state;
    if (!count || count <= 0) {
      return;
    }
    console.log("submit", type, count, typeof count);
    let data = await request("post", "record", { type, count });
    this.setState({ currentPage: 1, count: "" });
    this.getRecord();
    this.getUserDetail();
  }

  getWhichDay(weekday) {
    var weekday = moment(weekday).weekday();
    var weekarr = {
      0: "星期日",
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
    };
    return weekarr[weekday];
  }

  render() {
    let { type, record, userInfo, count } = this.state;
    return (
      <div className="main">
        <div className="container">
          <div className="title">Keep</div>
          <div className="wrapper">
            <Select
              value={type}
              style={{ width: 300 }}
              onChange={this.getType.bind(this)}
            >
              <Option value="俯卧撑">俯卧撑</Option>
              <Option value="仰卧起坐">仰卧起坐</Option>
            </Select>
            <Input
              placeholder="数量"
              type="number"
              value={count}
              style={{ width: 300 }}
              onChange={this.getCount.bind(this)}
            />
            <Button
              style={{ width: 300 }}
              type="primary"
              onClick={this.submit.bind(this)}
            >
              提交
            </Button>
          </div>
        </div>
        <div className="record-wrapper">
          <div className="user-wrapper">
            <span>{userInfo ? userInfo.userName : ""}</span>
            <span className="span-wrapper">
              <span>俯卧撑：</span>
              <span>{userInfo ? userInfo.fCount : ""}</span>
            </span>
            <span className="span-wrapper">
              <span>仰卧起坐：</span>
              <span>{userInfo ? userInfo.yCount : ""}</span>
            </span>
          </div>
          <div className="detail-wrapper">
            {record &&
              record.data.map((value, index) => (
                <div key={value + index} className="the-item">
                  <div className="the-time">
                    <span>
                      {moment(value.createdAt).format("YYYY-MM-DD HH:mm")}
                    </span>
                    <span>
                      {this.getWhichDay(
                        moment(value.createdAt).format("YYYY-MM-DD")
                      )}
                    </span>
                  </div>
                  <div className="the-message">
                    <span>{value.type}</span>
                    <span>+ {value.count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
