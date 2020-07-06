/**
 * Created by 杨涛 on 2020/7/6.
 */
const Route = use("Route");
const Env = use("Env");

// 无需登录
Route.group(() => {
  Route.resource("user", "UserController");
  Route.resource("record", "RecordController");
})
  .prefix("client")
  .namespace("Client");
// 需要登录
Route.group(() => {})
  .prefix("client")
  .namespace("Client")
  .middleware("adminAuth");

// 文件上传接口
Route.group(() => {}).prefix("client");
