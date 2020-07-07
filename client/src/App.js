import React, { Component } from "react";
import logo from "./logo.svg";
import { Input, Select, Button } from "antd";
import "./App.less";
import request from "./Utils/request";

const { Option } = Select;

class App extends Component {
  state = {
    count: 0,
    type: "俯卧撑",
  };

  componentDidMount() {
    console.log(request("get", "/hahh", { name: "dawang" }));
  }

  getCount(e) {
    console.log("e.target", e.target.value);
    let count = Number(e.target.value);
    this.setState({ count });
  }

  getType(e) {
    this.setState({ type: e });
  }

  submit() {
    let { type, count } = this.state;
    if (count <= 0) {
      console.log("1111111111 count");
      return;
    }
    console.log("submit", type, count, typeof count);
  }

  render() {
    let { type } = this.state;
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
      </div>
    );
  }
}

export default App;
