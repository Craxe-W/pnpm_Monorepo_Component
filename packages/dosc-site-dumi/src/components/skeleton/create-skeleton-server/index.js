/* eslint-disable */
var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块
var express = require('express');
var app = express();
var port = 8082;

/**
 * 递归创建目录
 */
const makeDirs = (data) => {
  if (fs.existsSync(data)) {
    return true;
  }
  if (makeDirs(path.dirname(data))) {
    fs.mkdirSync(data);
    return true;
  }
};

app.use(express.json({ type: 'application/json' }));

//对于所有的接口请求 都会执行后面的回调函数
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('X-Powered-By', ' 3.2.1');
  if (req.method === 'OPTIONS') {
    //设置响应的内容
    res.send(200);
  } else {
    next(); //将控制权传递给下一个处理程序
  }
});
//监听这个接口发送的请求
app.post('/local/v1/skeleton/create', function (req, res) {
  if (!req.body || !req.body.data) {
    return res.send({ code: -1 });
  }
  const { data, filePath, fileName } = req.body;
  const _filePath = path.join(path.resolve('.'), 'src', filePath);
  makeDirs(_filePath); // 创建目录
  const newFile = path.resolve(_filePath, fileName);
  //写入文件
  fs.writeFile(newFile, data, function (err) {
    if (err) {
      console.log(err);
      return res.send({ code: -1 });
    }
    res.send({
      code: 0,
      message: `文件创建成功，地址：${newFile}`,
    });
  });
});

const startServer = (port) => {
  const server = app.listen(port);

  server.on('listening', () => {
    console.log(`骨架屏小工具服务端口：${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      server.close();
      startServer(Number(port) + 1);
    }
  });
};
//创建服务，监听关于port端口下的服务   然后 这个on 触发事件
startServer(port);
