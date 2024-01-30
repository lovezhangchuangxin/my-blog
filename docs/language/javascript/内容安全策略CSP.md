# 内容安全策略 CSP

> 内容安全策略（CSP）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等

为使 CSP 可用，你需要配置你的网络服务器返回 [Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) HTTP 标头，或者通过 `<meta>` 标签来配置策略。

## 编写策略

策略由一系列策略指令所组成，每个策略指令都描述了针对某个**特定资源的类型**以及**策略生效的范围**。

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';"
/>
```

如上面例子中，策略配置在 `<meta>` 标签的 `content` 属性中，每个策略指令由一个策略名和一个或多个策略值组成，策略值之间用空格分隔，策略指令之间用分号分隔。

## 常见策略指令

### default-src

[`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src) 指令用于设置所有资源类型的默认源，如果没有为某个资源类型指定源，则会使用默认源。

### script-src

`script-src` 指令用于设置 JavaScript 脚本的源。

## 常见源

- `'self'`：指向与要保护的文件所在的源，包括相同的 URL scheme 与端口号。
- `'none'`：不允许任何内容。
- `'unsafe-inline'`：允许使用内联资源，例如内联 `<script>` 元素（javascript: URL）、内联事件处理器以及内联 `<style>` 元素。
- `'unsafe-eval'`：允许使用 eval() 以及相似的函数来从字符串创建代码。

## 参考

- [MDN CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
