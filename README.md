# wx-promisify
Wechat mini program promisify wx object

## 安装
```
$ npm install wx-promisify --save
```

## 使用
所有需要 success 与 fail 参数的微信小程序接口，都能够以 Promise 的方式调用

```js
const wxp = require('/path/to/wx-promisify/wx')

// 登录
wxp.login().then(res => {
  // code
})

// 发送请求
wxp.request({
  // options
}).then(res => {
  // code
});
```

