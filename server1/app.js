const express = require('express');

// 配置跨域
const cors = require('cors');
const app = express();

// 注册跨域中间件
app.use(cors());
// 配置解析表单数据的中间件 ，注意这个中间件只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// 配置解析token的中间件
const expressJWT = require('express-jwt');
const config = require('./config');
app.use(expressJWT({secret: config.jwtSecret}).unless({path: [/^\/api/]}));

// 启动服务器
app.listen(8888, () => {
    console.log('api server running at http://127.0.0.1:8888');
});