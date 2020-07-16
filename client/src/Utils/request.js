import axios from "axios";

async function request(method, url, payload) {
  let ret = await axios({
    method: method,
    url: `http://127.0.0.1:3333/client/${url}`,
    data: payload,
  });
  let result;
  if (ret.status === 200) {
    result = ret.data;
  } else {
    console.long("status", ret);
  }
  return result;
}

export default request;
