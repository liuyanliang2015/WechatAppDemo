var HOST = "http://localhost:8090/SpringMVC";
var login = HOST + "/login/login.do?";
var user_list = HOST +"/user/queryUsers.do?";
var user_details = HOST + "/user/getUser.do?";
module.exports = {
  loginUrl: login,
  user_list_url: user_list,
  user_details: user_details
}  