# IIFE

IIFE (Immediately Invoked Function Expression) **立即调用函数表达式**，也称**自执行匿名函数**。

**基本格式**：

```javascript
;(function () {
  // 代码
})()

// 或者
;(function () {
  // 代码
})()

// 或者箭头函数形式
;(() => {
  // 代码
})()

// ...
```

注意：

- IIFE 前面的 `;` 是为了防止代码合并时出现问题。
- IIFE 可以传参数，例如 `(function (a, b) { console.log(a + b) })(1, 2)`。

**IIFE 本质就是一个立即执行的匿名函数。它的作用是创建一个独立的作用域（函数作用域），避免变量污染全局作用域。**

你完全可以把 IIFE 的写法拆成两部分：函数声明和函数调用。

当然，IIFE 作为函数，函数具有的功能它也有。

## 示例

1. 避免变量污染全局作用域

```javascript
var a = 1
;(function () {
  var b = 2
})()

console.log(window.a) // 1
console.log(window.b) // undefined
```

2. 执行异步函数

```javascript
;(async function () {
  const res = await fetch('https://api.github.com/users')
  const data = await res.json()
  console.log(data)
})()
```

某些 Javascript 运行环境不能直接在顶层使用 `async`，这时候可以用 async IIFE 包裹代码，在函数体中就可以使用 `async` 了。

## IIFE 的由来

Javascript 早期只有 `var` 关键字，在全局作用域下使用 `var` 声明的变量会成为全局对象的属性。当多个 JS 代码声明同名的全局变量时，就会导致冲突。而使用 IIFE 就可以避免创建不必要的全局变量，减少对全局作用域的污染。

## 现在还有必要使用 IIFE 吗？

几乎没有必要。

以为现在大多数浏览器都支持 ES6，可以使用 `let` 和 `const` 关键字来声明变量，它们都是块级作用域，不会污染全局作用域。

并且，现在有模块化的概念，模块内未导出的变量不会污染全局作用域。

## 面试题

1. 以下代码输出什么？

   ```javascript
   for (var i = 0; i < 5; i++) {
     setTimeout(function () {
       console.log(i)
     }, 1000)
   }
   ```

   答案：5 5 5 5 5

   原因：for 循环创建了一个块级作用域，然而，var 声明的变量属于函数作用域。在循环的整个过程中，var 声明的变量 i 都是同一个 i。setTimeout 中的回调函数会在循环结束后才执行，此时 i 已经是 5 了。

2. 不使用 ES6 语法，如何解决上面的问题？

   答案：可以使用 IIFE

   ```javascript
   for (var i = 0; i < 5; i++) {
     ;(function (i) {
       setTimeout(function () {
         console.log(i)
       }, 1000)
     })(i)
   }
   ```

3. IIFE 可以创建闭包吗？

   当然可以，本质就是函数，函数可以它当然可以。

## 参考

- [MDN - IIFE](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)
