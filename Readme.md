# 中大图书

一个用于学生间交换图书的平台

# 前后端技术

前端：微信小程序

后端：java+mysql

# 项目人员

15331366 杨奕嘉

15331259 邱旭铨

15331380 于海

15331422 郑品

15331379 尹张昊翔

15332020 张增辉

15332018 张千艺

# 后端部署方式

数据库环境：mysql+redis


修改application.properties中的属性为你需要值
```
// 小程序相关
wxapp.appId=小程序id
wxapp.secret=小程序secret

// 图片存储
img.host=访问路径（例如http://localhost:8080）
img.local.path=保存路径(例如F:/wximg)

// 数据库相关
// mysql
spring.datasource.url=jdbc:mysql://localhost:3306/test?useSSL=false&characterEncoding=UTF-8 (此为样例)
spring.datasource.username=root
spring.datasource.password=
// redis
spring.redis.host=localhost
spring.redis.password=
spring.redis.port=6379
```
注意mysql要使用utf8编码否则会产生乱码

# 后端编译运行环境

使用IntelliJ IDEA