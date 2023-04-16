const express = require("express");

const os = require('os')

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "5mb", parameterLimit: 1000000 }));
app.use(bodyParser.urlencoded({ limit: "5mb", parameterLimit: 1000000, extended: false }));

app.use((req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  // //允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  // //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

const port = 8080

app.listen(port, () => {
  let arr = getLocahost().map(item => `http://${item}${port == 80 ? '' : `:${port}`}`)
  console.log(`服务开启成功，访问地址为：\n${arr.join('\n')}`);
})

function getLocahost() {
  let obj = os.networkInterfaces()
  let arr = []
  Object.keys(obj).forEach(item => {
    let value = obj[item]
    if (Object.prototype.toString.call(value).slice(8, -1) === 'Array') {
      arr = [...arr, ...value.filter(item => item.family == 'IPv4').map(item => item.address)]
    }
  })
  return arr;
}


app.get('/test', (req, res) => {
  res.send(req.query)
})

app.post('/test', (req, res) => {
  res.send(req.body)
})


text