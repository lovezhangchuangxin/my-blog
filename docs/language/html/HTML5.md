# HTML5

HTML5 是 HTML 的最新标准，于 2014 年 10 月 28日正式发布。

实际上 HTML5 包含了 HTML， CSS，JavaScript 在内的一套技术组合。

那么 HTML5 相比于 HTML4 增加了哪些新特性呢？（~~个人觉得这个问题没有意义，因为 HTML5 发布已近 10 年，很多年轻人一上来就学的最新标准~~）

## 1. 语义化标签

HTML5 引入了很多语义化标签，这类标签见名知意，可以让开发者更加方便的理解页面结构，维护代码方便，同时有利于搜索引擎的爬取（SEO）和无障碍阅读（Accessibility）。

| 标签             | 作用                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `<header>`：     | 定义文档的页眉，通常包含一些介绍性的内容，比如网站的 logo，导航栏等。                        |
| `<nav>`：        | 定义文档的导航栏，通常包含一些指向其他页面的链接。                                           |
| `<section>`：    | 定义文档的一个区域，比如一篇文章的章节，或者一个页面的主要内容。                             |
| `<article>`：    | 定义文档的一篇文章，通常包含一些独立的内容，比如一篇博客文章，一篇论坛帖子等。               |
| `<aside>`：      | 定义文档的侧边栏，通常包含一些与页面内容相关的辅助信息，比如侧边栏的广告，相关文章的列表等。 |
| `<footer>`：     | 定义文档的页脚，通常包含一些版权信息，联系方式等。                                           |
| `<main>`：       | 定义文档的主要内容。                                                                         |
| `<figure>`：     | 定义一段独立的流内容，通常包含一些图片，图表，代码等。                                       |
| `<figcaption>`： | 定义 `<figure>` 元素的标题。                                                                 |
| `<mark>`：       | 定义文档中需要突出显示的文本。                                                               |
| `<time>`：       | 定义日期或时间。                                                                             |
| `<details>`：    | 定义用户可以查看或隐藏的额外细节。                                                           |
| `<summary>`：    | 定义 `<details>` 元素的标题。                                                                |

## 2. 媒体标签

HTML5 新增了 `<audio>` 和 `<video>` 标签，用于在网页中嵌入音频和视频。

```html
<!-- 音频 -->
<audio src="audio.mp3" controls></audio>
<!-- 视频 -->
<video src="video.mp4" controls></video>
```

用法参考：[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 和 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

## 3. 增强表单

HTML5 新增了很多表单元素，比如 `datalist`，`keygen`，`output`，`progress`，`meter` 等，同时也增强了一些表单元素的功能，比如 `input`，`textarea`，`select` 等。

**input元素增强**：

| input类型 | 描述       |
| --------- | ---------- |
| color     | 颜色选择器 |
| date      | 日期选择器 |
| datetime  | 日期时间   |
| email     | 邮箱       |
| month     | 月份       |
| number    | 数字       |
| range     | 范围       |
| search    | 搜索       |
| tel       | 电话       |
| time      | 时间       |
| url       | 网址       |
| week      | 周         |

:::details 样例

```html
<!-- 颜色选择器 -->
<input type="color" />
<!-- 日期选择器 -->
<input type="date" />
<!-- 日期时间 -->
<input type="datetime" />
<!-- 邮箱 -->
<input type="email" />
<!-- 月份 -->
<input type="month" />
<!-- 数字 -->
<input type="number" />
<!-- 范围 -->
<input type="range" />
<!-- 搜索 -->
<input type="search" />
<!-- 电话 -->
<input type="tel" />
<!-- 时间 -->
<input type="time" />
<!-- 网址 -->
<input type="url" />
<!-- 周 -->
<input type="week" />
```

:::

**新增表单元素**：

| 标签     | 描述                           |
| -------- | ------------------------------ |
| datalist | 定义选项列表                   |
| keygen   | 定义密钥对（公钥和私钥）生成器 |
| output   | 定义不同类型的输出             |
| progress | 定义进度条                     |
| meter    | 定义度量衡                     |

**新增表单属性**，如：

| 属性         | 描述                             |
| ------------ | -------------------------------- |
| autocomplete | 定义是否启用表单的自动完成功能。 |
| autofocus    | 定义表单加载后是否自动获得焦点。 |
| placeholder  | 定义输入字段的提示信息。         |
| required     | 定义输入字段是否为必填项。       |
| multiple     | 定义是否允许多个值。             |
| pattern      | 定义输入字段的格式。             |
| min          | 定义输入字段的最小值。           |
| max          | 定义输入字段的最大值。           |
| step         | 定义输入字段的合法数字间隔。     |

## 4. Canvas

[Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 提供了一个通过JavaScript 和 HTML的\<canvas\>元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API 主要聚焦于 2D 图形。而同样使用\<canvas\>元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形，例如：

<canvas id="canvas-test" height="160"></canvas>

<script>
  setTimeout(() => {
    const canvas = document.getElementById("canvas-test");
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        ctx.fillStyle =
          "rgb(" +
          Math.floor(255 - 42.5 * i) +
          "," +
          Math.floor(255 - 42.5 * j) +
          ",0)";
        ctx.fillRect(j * 25, i * 25, 25, 25);
      }
    }
  }, 0)
</script>

:::details 代码

```html
<canvas id="canvas-test"></canvas>

<script>
  const canvas = document.getElementById('canvas-test')
  const ctx = canvas.getContext('2d')

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle =
        'rgb(' +
        Math.floor(255 - 42.5 * i) +
        ',' +
        Math.floor(255 - 42.5 * j) +
        ',0)'
      ctx.fillRect(j * 25, i * 25, 25, 25)
    }
  }
</script>
```

:::

## 5. SVG

可缩放矢量图形（Scalable Vector Graphics，SVG）基于 XML 标记语言，用于描述二维的矢量图形。

[SVG教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)

很多图标库都是基于 SVG 实现的，比如 [iconfont](https://www.iconfont.cn/)，[iconpark](https://iconpark.oceanengine.com/) 等。

## 6. 地理定位

HTML5 提供了地理定位 API：[Geolocation](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)，可以获取用户的地理位置信息。Geolocation 接口是一个用来获取设备地理位置的可编程的对象，它可以让 Web 内容访问到设备的地理位置，这将允许网站或应用基于用户的地理位置提供定制的信息。

<button @click="getPosition">点我获取位置，然后打开控制台查看</button>

<script setup>
  const getPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log("Latitude : " + crd.latitude);
      console.log("Longitude: " + crd.longitude);
      console.log("More or less " + crd.accuracy + " meters.");
    }

    function error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
</script>

## 7. 拖放 API

HTML5 提供了拖放 API：[Drag and Drop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)，可以实现拖拽功能。

## 8. Web 存储

- cookie，用于存储少量数据，每次请求都会携带，容量小（4KB），不安全，不支持跨域。
- localStorage，用于存储大量数据，容量大（5MB），不安全，不支持跨域。
- sessionStorage，用于存储大量数据，容量大（5MB），不安全，不支持跨域，会话结束后数据会被清除。
- IndexedDB，用于存储大量数据，容量大（无限），安全，支持跨域。

## 9. Web Worker

Web Worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。你可以继续做任何愿意做的事情：点击、选取内容等等，而此时 Web Worker 在后台运行。

## 10. WebSocket

WebSocket 是一种网络通信协议，可以在单个 TCP 连接上进行全双工通信，位于 OSI 模型的应用层。特点：

- 建立在 TCP 协议之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是 `ws`（如果加密，则为 `wss`），服务器网址就是 URL。

## 参考

- [HTML 最新标准](https://html.spec.whatwg.org/multipage/)
- [HTML5 维基百科](https://zh.wikipedia.org/wiki/HTML5)
- [MDN Web开发技术](https://developer.mozilla.org/zh-CN/docs/Web)
