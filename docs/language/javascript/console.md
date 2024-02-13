# console 基础使用

## console.assert

console.assert 方法接受一个断言，并在断言为假时输出其余参数。

::: tip
Node.js v10.0.0 之前，一个值为假的断言会导致一个 AssertionError 被抛出，从而阻断了代码的执行。之后，Node 和浏览器中的行为一致，假断言并不会中断代码的执行。
:::

```js
// 无输出
console.assert(true, 123)
// 输出 123
console.assert(false, 123)
```

## console.clear

该方法会清空控制台，前提是控制台允许清空。像浏览器运行的图形控制台就允许清空，而像 Node 运行的终端上显示的控制台则不支持它，调用该方法将不会产生任何效果（也不会报错）。

```js
console.clear()
```

## console.count

该方法接受一个可选的参数 label，当 label 不存在时，相当于传入了 default。该方法会记录调用的次数，并在控制台输出 label: count。

```js
let user = ''

function greet() {
  console.count(user)
  return `hi ${user}`
}

user = 'bob'
greet() // bob: 1
user = 'alice'
greet() // alice: 1
greet() // alice: 2
console.count('alice') // alice: 3
```

## console.countReset

重置计数器。此函数有一个可选参数 label，当 label 不存在时，相当于传入了 default。

```js
var user = ''

function greet() {
  console.count(user)
  return 'hi ' + user
}

user = 'bob'
greet() // bob: 1
user = 'alice'
greet() // alice: 1
greet() // alice: 2
console.countReset('bob') // 重置 bob 的计数器
console.count('alice') // alice: 3
```

## console.debug

console.debug() 方法将一条消息输出到 web 控制台，消息的日志级别为“debug”。只有在控制台配置为显示调试输出时，才会向用户显示该消息。

```js
console.debug(123)
```

## console.dir

console.dir() 方法可以显示指定 JavaScript 对象的属性列表，并以交互式的形式展现。输出结果呈现为分层列表，包含展开/折叠的三角形图标，可用于查看子对象的内容。

相比于 console.log，console.dir() 会显示对象的所有属性，而 console.log() 仅显示可枚举的属性。

```js
console.log(Promise)
console.dir(Promise)
```

## console.dirxml

## console.error

向 Web 控制台输出一条错误消息。

```js
console.error('error')
```

## console.group

console.group() 方法在 Web 控制台上创建一个新的分组。随后输出到控制台上的内容都会被添加一个缩进，表示该内容属于当前分组，直到调用 console.groupEnd() 之后，当前分组结束。

## console.groupCollapsed

console.groupCollapsed() 方法在 Web 控制台上创建一个新的分组。与 console.group() 方法的不同点是，新建的分组默认是折叠的。用户必须点击一个按钮才能将折叠的内容打开。

## console.groupEnd

console.groupEnd() 方法结束当前分组。

## console.info

console.info() 方法将一条消息输出到 web 控制台，消息的日志级别为“info”。

## console.log

```js
console.log('cHello world', 'color: red')
```

## console.table

```js
console.table(['apples', 'oranges', 'bananas'])
```

## console.time

你可以启动一个计时器来跟踪某一个操作的占用时长。每一个计时器必须拥有唯一的名字，页面中最多能同时运行 10,000 个计时器。当以此计时器名字为参数调用 console.timeEnd() 时，浏览器将以毫秒为单位，输出对应计时器所经过的时间。

## console.timeEnd

停止一个通过 console.time() 启动的计时器

## console.timeLog

在控制台输出计时器的值，该计时器必须已经通过 console.time() 启动。

## console.trace

console 的 trace() 方法向 Web 控制台 输出一个堆栈跟踪。

## console.warn

console.warn() 方法将一条消息输出到 web 控制台，消息的日志级别为“warn”。
