# terser 基本使用

> JavaScript mangler and compressor toolkit（Javascript 管理器和压缩工具包）

Terser 是一款行业标准的 JavaScript 代码精简器。它可以缩减变量名、删除空白和注释，并删除未使用的代码。你可以通过命令行或者 Nodejs API 来使用它。

## 安装

通过 npm 安装：

```bash
npm install terser --save-dev
```

或者通过 CDN 引入（它会暴露一个包含 `.minify` 属性的全局变量 `Terser`）：

```html
<script src="https://cdn.jsdelivr.net/npm/source-map@0.7.3/dist/source-map.js"></script>
<script src="https://cdn.jsdelivr.net/npm/terser/dist/bundle.min.js"></script>
```

## API 使用

### 基本使用

导入 `terser` 中的 `minify` 方法：

```javascript
import { minify } from 'terser'
// 或者 CommonJS 中使用
// const { minify } = require('terser')
```

`async minify(code,options)` 是一个异步函数，你可以传入代码和选项对象，返回一个包含结果的 Promise 对象。默认情况下，它会启用混淆和压缩。

```javascript
const code = `function add(first, second) { return first + second; }`
const result = await minify(code)
console.log(result.code) // function add(n,d){return n+d}
```

可以看到，空格、分号、变量名都进行了处理，实现了代码压缩和混淆。

`minify_sync()` 方法是 `minify()` 的同步版本，它接受相同的参数并立即返回一个结果对象。

你也可以**一次性传入多个代码**：

```javascript
const code = {
  'file1.js': 'function add(first, second) { return first + second; }',
  'file2.js': 'console.log(add(1 + 2, 3 + 4));',
}
const result = await minify(code)
console.log(result.code) // function add(d,n){return d+n}console.log(add(3,7));
```

### 处理异常

```javascript
try {
  const result = await minify({ 'foo.js': 'if (0) else console.log(1);' })
  // Do something with result
} catch (error) {
  const { message, filename, line, col, pos } = error
  // Do something with error
}
```

### 开启 source map

可以通过 `sourceMap` 选项来开启 source map，设置为 `true` 或者传入一个对象：

```javascript
const result = await minify(
  'function add(first, second) { return first + second; }',
  {
    sourceMap: {
      filename: 'out.js',
      url: 'out.js.map',
    },
  },
)
console.log(result.code) // function add(n,d){return n+d}
console.log(result.map) // {"version":3,"file":"out.js","names":["add","first","second"],"sources":["0"],"mappings":"AAAA,SAASA,IAAIC,EAAOC,GAAU,OAAOD,EAAQC,CAAQ"}
```

## 压缩选项（Compress options）

这些选项控制 Terser 的压缩行为。

- `defaults`(default `true`)

  传入 `false` 可禁用大部分默认启用的压缩转换。当你只想启用几个压缩选项，而禁用其他选项时，这很有用。

- `drop_console`(default `false`)

  传入 `true` 可删除所有的 `console` 语句。如果只想丢弃部分控制台内容，可以传入一个数组，如 `['log', 'warn']`，则只会删除 `console.log` 和 `console.warn`。

  ```javascript
  const result = await minify(
    'console.log(1);console.warn(2);console.error(3);',
    {
      compress: {
        drop_console: ['log', 'warn'],
      },
    },
  )
  console.log(result.code) // console.error(3);
  ```

- `drop_debugger`(default `true`)

  传入 `false` 可保留 `debugger` 语句。

- `global_defs`(default `{}`)

  传入一个对象，可以在压缩时定义全局变量。这对于在开发和生产环境中使用不同的配置非常有用。

  ```javascript
  const result = await minify('console.log(ENV)', {
    compress: {
      global_defs: {
        ENV: 'production',
      },
    },
  })
  console.log(result.code) // console.log("production");
  ```

  在 global_defs 的属性名前面加上 @ 符号，可以将其解析为表达式：

  ```javascript
  const result = await minify("alert('hello');", {
    compress: {
      global_defs: {
        '@alert': 'console.log',
      },
    },
  })
  console.log(result.code) // console.log("hello");
  ```

- `toplevel`(default `false`)

  在顶层作用域中丢弃未引用的函数（"funcs"）和/或变量（"vars"）（默认为 false，true 则丢弃未引用的函数和变量）

## 混淆选项（Mangle options）

- `reserved`(default `[]`)

  传入一个数组，可以保留指定的变量名。这对于在混淆时保留全局变量非常有用。

  ```javascript
  const result = await minify('function add(a, b){return a + b}', {
    mangle: {
      reserved: ['a'],
    },
  })
  console.log(result.code) // function add(a,n){return a+n}
  ```

- `keep_classnames`(default `false`)

  传入 `true` 则不混淆类名。传入一个正则表达式，则只保留匹配的类名。

- `keep_fnames`(default `false`)

  传入 `true` 则不混淆函数名。传入一个正则表达式，则只保留匹配的函数名。

## 格式选项（Format options）

这些选项控制 Terser 输出代码的格式。以前称为 "输出选项"（output options）。

- `ecma`(default `5`)

  可以设置为 5、2015、2016、2017、2018、2019、2020 等。将 ecma 设置为 2015 或更高时，将会美化某些输出，比如 `{a: a}` 会被转换为 `{a}`。注意：Terser 并不是 Babel，它不会将代码转换为 ES5。

  ```javascript
  const result = await minify('const a = 123; console.log({a: a})', {
    format: {
      ecma: 2015,
    },
  })
  console.log(result.code) // const a=123;console.log({a});
  ```

- `comments`(default `some`)

  保留注释。默认情况下，Terser 只会保留一些重要的注释，如 `@license`、`@preserve`、`@copyright` 等。如果设置为 `true` 或者 `all`，则会保留所有注释。如果设置为 `false`，则会删除所有注释。

  ```javascript
  const result = await minify('/* comment */', {
    format: {
      comments: true,
    },
  })
  console.log(result.code) // /* comment */
  ```

- `keep_numbers`(default `false`)

  保持代码中原始的字面量形式。默认情况下，Terser 会将数字字面量转为更短的形式，比如 `1000` 会被转为 `1e3`，`0.123` 会被转为 `.123`。如果设置为 `true`，则会保持原始形式。

  ```javascript
  const result = await minify('const a = 1000;', {
    format: {
      keep_numbers: true,
    },
  })
  console.log(result.code)
  ```
