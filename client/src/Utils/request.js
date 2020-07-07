import axios from "axios";

async function request(method, url, payload) {
  let ret = await axios({
    method: "get",
    url: "http://127.0.0.1:3333/client/record",
  });
  console.log("ret", ret);
  return { method, url, payload };
}

export default request;
