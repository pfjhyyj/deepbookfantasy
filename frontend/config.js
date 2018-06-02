
/**
 * 小程序配置文件
 */
var host = 'http://127.0.0.1:8080';


var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 处理小程序登录代码，用微信code换取小程序session
    authUrl: `${host}/auth/getSession`,

    // 处理用户信息逻辑
    userUrl: `${host}/user`,

    //处理订单信息逻辑
    bookUrl: `${host}/book`
  }
};

module.exports = config;
