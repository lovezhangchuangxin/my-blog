# with

::: danger 警告
已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。请注意，该特性随时可能无法正常工作。
:::

`with` 语句扩展一个语句的作用域链。

## 用法

**语法**

```js
with (expression) {
  statement
}
```

简化对象上属性的使用

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

with (obj) {
  console.log(a, b, c) // 1 2 3
}
```

## 赋值问题

在给属性赋值时可能会有意料之外的结果

```js
const obj = {
  a: 1,
}

with (obj) {
  b = {}
}

console.log(obj.b) // undefined
console.log(b) // {}
console.log(window.b === b) // true
```

可以看到，如果 `obj` 上没有 `b` 属性，实际上创建了一个全局变量 `b`。不仅实现了预期的功能，还造成了全局变量污染和内存泄漏。

## 缺点

- **严格模式下不允许使用 `with` 语句**
- 可能会造成全局变量污染和内存泄漏
- 会造成性能问题，因为 `with` 语句会在每次执行时都会创建一个新的作用域

## vue2 源码使用 with

在 vue2 中，模板编译时会将模板转换为 `render` 函数，而 `render` 函数中会使用 `with` 语句，这样就可以在模板中直接使用 `vm` 上的属性。

```js
const render = new Function(
  'with(this){return _c("div",{attrs:{"id":"app"}},[_c("span",[_v(_s(message))])])}',
)
```

为什么在 vue2 中使用 with，[尤雨溪的解释](https://www.zhihu.com/question/49929356/answer/118534768)是：

> 为啥呢，因为没有什么太明显的坏处（经测试性能影响几乎可以忽略），但是 with 的作用域和模板的作用域正好契合，可以极大地简化模板编译过程。Vue 1.x 使用的正则替换 identifier path 是一个本质上 unsound 的方案，不能涵盖所有的 edge case；而走正经的 parse 到 AST 的路线会使得编译器代码量爆炸。虽然 Vue 2 的编译器是可以分离的，但凡是可能跑在浏览器里的部分，还是要考虑到尺寸问题。用 with 代码量可以很少，而且把作用域的处理交给 js 引擎来做也更可靠。
>
> 用 with 的主要副作用是生成的代码不能在 strict mode / ES module 中运行，但直接在浏览器里编译的时候因为用了 new Function()，等同于 eval，不受这一点影响。
>
> 当然，最理想的情况还是可以把 with 去掉，所以在使用预编译的时候（vue-loader 或 vueify），会自动把第一遍编译生成的代码进行一次额外处理，用完整的 AST 分析来处理作用域，把 with 拿掉，顺便支持模板中的 ES2015 语法。也就是说如果用 webpack + vue 的时候，最终生成的代码是没有 with 的。
