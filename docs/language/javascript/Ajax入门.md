# Ajax 基本学习

::: tip 简介

- AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
- AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
- **AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。**
- AJAX 需要用户允许 JavaScript 在浏览器上执行。

:::

## 原理

在客户端（如浏览器）和服务器之间加了一个中间层：Ajax 引擎。由 Ajax 引擎独立向服务器请求数据，前端获取到 Ajax 返回的数据后，可以使用新数据来更新页面、或进行其它操作，使用户请求和服务器响应异步化，从而保证了在不刷新页面的前提下可以局部更新网页内容。

如果服务器端支持 CORS，可以通过设置 Access-Control-Allow-Origin 来实现跨域。如果浏览器检测到相应的设置，就会允许 Ajax 进行跨域访问

---

我暂时也不是很理解，不过不影响下面的使用:smile:

## XML

我们注意到前面说过 Ajax = 异步的 Javascript 和 XML，那么什么是 XML 呢？

::: tip 简介

XML 指可扩展标记语言（extensible Markup Language）

:::

如果你熟悉 HTML 的话，你也会对 XML 感到亲切。来看下面这段 XML 的写法

```XML
<role>
<name>刻晴</name>
<age>17</age>
<element>雷</element>
</role>
```

与 HTML 不一样的是，XML 中的标签名不是预定义的，而是自定义的，是由我们自己命名的。HTML 用于呈现页面的结构，而 XML 则被设计为被设计用来传输和存储数据。如果你了解 JSON 的话，上述 XML 代码等价于如下的 JSON 代码

```json
{
  "name": "刻晴",
  "age": 17,
  "element": "雷"
}
```

总之，XML 和 JSON 是存储传输数据的两种方法，而显然 JSON 的语法规则十分简单，可称得上“优雅完美”，同时生成和解析都很方便，现在 XML 已被 JSON 取代，所以我们下面通过 Ajax 传输的数据主要是 JSON 格式的。

简单地来说，使用 Ajax 就是我们通过 Javascript 向服务端发起 http 请求，服务端处理我们的请求并响应，响应的数据以 JSON 格式（也可以是字符串等其他格式）返回，我们再将返回的数据更新到我们的页面。

## HTTP

使用 Ajax 之前我们必须什么是 HTTP 协议，如果你还不知道 HTTP 请求方式，HTTP 状态码，请自行上网搜索学习。
如果你想深入了解，这里有 HTTP 的[中文 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

## Ajax 的使用

使用之前我们要知道，Ajax 用于客户端向服务端请求数据并实现页面的更新，为了测试我们写的 Ajax 代码，我们可能需要搭建一个服务端，比如使用[express](https://www.expressjs.com.cn/)来搭建，但是这样有些麻烦，这里我们使用[Swagger 开放接口](https://api.apiopen.top/swagger/index.html#/%E5%BC%80%E6%94%BE%E6%8E%A5%E5%8F%A3/)，我们向这些接口发送请求即可得到响应的结果

开始写 Ajax 代码啦:heart:

1. 首先我们创建一个 html 文件，Ajax 代码将在 html 文件中 script 标签中书写。
   我们要实现的功能是点击获取名言的按钮，页面中会呈现一句名言。
   注意我们引入了 [booststrap](https://www.bootcss.com/) 用于美化我们的页面，不必过多关注

```html {20}
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ajax学习</title>
    <!-- 引入bootstrap -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />
  </head>

  <body>
    <div class="container">
      <h1>每日名言</h1>
      <button class="btn btn-info">获取名言</button>
      <h2></h2>
    </div>

    <script></script>
  </body>
</html>
```

2. 使用 XMLHttpRequest 对象发送请求处理响应

```js
// 创建XMLHttpRequest对象
const xhr = new XMLHttpRequest()
// 设置请求方法与请求地址
xhr.open('GET', 'https://api.apiopen.top/api/sentences')
// 发送请求
xhr.send()
// 接收响应数据
// xhr对象上有readyState这个属性，当它发生变化时就会调用onreadystatechange这个方法
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    // status属性表示请求的状态码，如果是200表示请求成功
    if (xhr.status === 200) {
      // 使用JSON.parse将字符串转换成JSON对象
      const res = JSON.parse(xhr.responseText)
      console.log(res)
      document.querySelector('h2').innerHTML = res.result.name
    }
  }
}
```

::: details 点击查看完整代码

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ajax学习</title>
    <!-- 引入bootstrap -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />
  </head>

  <body>
    <div class="container">
      <h1>每日名言</h1>
      <button class="btn btn-info">获取名言</button>
      <h2></h2>
    </div>

    <script>
      function getQuote() {
        // 创建XMLHttpRequest对象
        const xhr = new XMLHttpRequest()
        // 设置请求方法与请求地址
        xhr.open('GET', 'https://api.apiopen.top/api/sentences')
        // 发送请求
        xhr.send()
        // 接收响应数据
        // xhr对象上有readyState这个属性，当它发生变化时就会调用onreadystatechange这个方法
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            // status属性表示请求的状态码，如果是200表示请求成功
            if (xhr.status === 200) {
              // 使用JSON.parse将字符串转换成JSON对象
              const res = JSON.parse(xhr.responseText)
              console.log(res)
              document.querySelector('h2').innerHTML = res.result.name
            }
          }
        }
      }
      // 获取按钮
      const btn = document.querySelector('button')
      // 给按钮绑定点击事件
      btn.onclick = getQuote
    </script>
  </body>
</html>
```

:::

以上是 Ajax 的基本使用

## Ajax 使用补充

1. **open 方法**

open 方法的完整格式是这样的：`xhr.open(method, url, [async])`。

- 第一个参数用于指定 HTTP 请求的方法，不区分大小写。
- 第二个参数用于指定 HTTP 请求的 URL 地址，可以是 绝对 URL 或 相对 URL；
  绝对 URL 需要满足同源策略，除非服务端允许跨域请求。相对 URL 即是相对于文档的 URL。
- 第三个参数可选，默认为 true，表示异步调用此次 Ajax 请求，不阻塞后续脚本的执行

open()方法其实还可以有第四、第五个参数，分别是用于 HTTP 请求访问认证的用户名和密码，使用它们需要在服务器做相应的配置，较为少用。

2. **send 方法**

发送 GET 请求时，send 方法不需要传递参数（也可以传递 null）。发送 POST 时，数据可以通过 send 方法发送

```js
const xhr = new XMLHttpRequest()
xhr.open('POST', 'login')
// 设置请求头
xhr.setRequestHeader(
  'Content-type',
  'application/x-www-form-urlencoded;charset=UTF-8',
)
xhr.send('username=123&password=123456')
```

3. **readyState 属性**

前面我们说过，readyState 是 XMLHttpRequest 对象上的一个属性，用于表示请求所处的状态。

> - 0：初始值，表示请求未初始化，open 方法尚未调用
> - 1：启动请求，open 方法已经调用，但尚未调用 send 方法
> - 2：请求发送，已经调用 send 方法，但尚未接收到响应
> - 3：接收响应，已经接受到部分响应数据，主要是响应头
> - 4：HTTP 响应完成，已经接收到全部响应数据，而且可以在客户端使用
>
> 每次 reaystate 属性值改变都会触发 reaystatechange 事件但只有 reaystate 属性值为 4 时才表示 HTTP 响应准备就绪

4. **设置请求头**

```js
// 设置请求体内容的类型
xhr.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded')
// 自定义头信息
xhr.setRequestHeader('name', 'ykyk')
```

5. **请求超时和网络异常**

```js
// 超时设置 （2秒）
xhr.timeout = 2000
// 超时回调
xhr.ontimeout = function () {
  alert('网络超时，请稍后重试')
}
// 网络异常回调
xhr.onerror = function () {
  alert('网络异常，请稍后重试')
}
```

6. 取消请求

```js
// 手动取消
xhr.abort()
```

7. 解决 IE 等浏览器的缓存问题

在一些浏览器中(如 IE),由于缓存机制的存在，对于相同的 URL，ajax 只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。
解决的方法很简单，给 URL 添加赘余不重复的参数即可。

```js
xhr.open('get', '/testAJAX?t=' + Date.now())
```
