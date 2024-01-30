# Function

Function 对象提供了用于处理函数的方法。在 JavaScript 中，每个函数实际上都是一个 Function 对象。

## 使用 `new Function` 创建函数

```js
let func = new Function([arg1, arg2, ...argN], functionBody)
```

参数 `arg1...argN` 可选，由于历史原因，参数也可以按逗号分隔符的形式给出：

以下三种声明的含义相同：

```js
new Function('a', 'b', 'return a + b') // 基础语法
new Function('a,b', 'return a + b') // 逗号分隔
new Function('a , b', 'return a + b') // 逗号和空格分隔
```

以前使用函数时，函数的代码必须早已编写好，而 `new Function` 允许我们将任意字符串变为函数。例如，我们可以从服务器接收一个新的函数并执行它：

```js
let str = ... 动态地接收来自服务器的代码 ...

let func = new Function(str);
func();
```

值得注意的是，`new Function` 创建的函数无法访问外部变量，只能访问全局变量

```js{4}
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error: value is not defined
```

这个原因也是显而易见的，在将 JavaScript 发布到生产环境之前，通常需要使用**压缩程序（minifier）**对其进行压缩。压缩程序会将变量名替换为更短的名称，如果 `new Function` 能够访问外部变量，由于函数是由字符串变量生成的，压缩程序没办法对传入 `new Function` 的字符串进行处理（这是运行时的事），因此会导致创建出来的函数无法找到被压缩的变量。

所以，**即使我们可以在 `new Function` 中访问外部词法环境，我们也会受挫于压缩程序。**

当我们需要向 `new Function` 创建出的新函数传递数据时，我们必须显式地通过参数进行传递。

::: tip

如果你在 MDN 网站的控制台中使用 `new Function`，你可能发现它报错了。这是由于 [内容安全策略 CSP](./内容安全策略CSP.md)导致的。
你可以选择其他网站尝试，或者自己创建一个 HTML 文件并在其中使用 `new Function`。

:::

## 参考

- [现代 JavaScript 教程](https://zh.javascript.info/new-function)
- [MDN Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
