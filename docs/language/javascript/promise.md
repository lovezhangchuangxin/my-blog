# Promise 基础

## 理解

1. 抽象表达：

   - Promise 是一门新的技术（ES6 规范）
   - Promise 是 Js 中进行异步编程的新的解决方案（旧方案是使用回调函数）

2. 具体表达

   - 从语法上来说，Promise 是一个构造函数
   - 从功能上来说，Promise 对象用来封装一个异步操作，并且可以获取其成功或者失败的结果

## 为什么要使用 Promise

1. 指定回调函数的方式更加灵活

   - 旧的方案必须在启动异步任务之前指定
   - promise：启动异步任务 => 返回 promise 对象 => 给 promise 对象绑定回调函数（甚至可以在异步任务结束之后指定多个）

2. 支持链式调用，可以解决回调地狱问题

   回调地狱是指回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件

   回调地狱缺点：

   - 不便于阅读
   - 不便于异常处理

## util.promisify

nodejs 中内置的 util 模块中有个 promisify 方法可以将错误优先的回调风格的函数转为 promise 风格的函数

```js
const util = require('util')
const fs = require('fs')
const myReadFile = util.promisify(fs.readFile)
myReadFile('./readme.md').then((value) => {
  console.log(value.toString())
})
```

## promise 封装 ajax 请求

```js
const sendAjax = function (path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', path)
    // xhr.responseType = "json";
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.status)
      }
    }
  })
}
```

## promise 状态的改变

promise 对象有个内置属性[PromiseState]表示 promise 的状态。有三种状态：pending（未确定）, fulfilled（成功）, rejected（失败）

状态变化只有两种：

1. pending -> fulfilled
2. pending -> rejected

## promise 结果

promise 对象有个内置属性[PromiseResult]表示 promise 对象的结果。即异步任务执行的结果。
我们可以通过 resolve 或者 reject 来给它赋值。

## Promise API

1. **Promise 构造函数**：Promise(executor){}

   - executor 函数：执行器(resolve, reject) => {}
   - resolve 函数：内部定义成功时我们调用的函数 value => {}
   - reject 函数：内部定义失败时我们调用的函数 reason => {}
     说明：executor 函数会在 Promise 内部立即同步调用，异步操作在执行器中执行

2. **Promise.prototype.then 方法**：(onResolved, onRejected) => {}

   - onResolved 函数：成功的回调函数(value) => {}
   - onRejected 函数：失败的回调函数(reason) => {}

   指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 promise 对象

3. **Promise.prototype.catch 方法**：(onRejected) => {}

   - onRejected 函数：失败的回调函数(reason) => {}

4. **Promise.resolve 方法**：(value) => {}

   - value：成功的数据或者 promise 对象

   返回一个成功/失败的 promise 对象

5. **Promise.reject 方法**：(reason) => {}

   - reason：失败的原因

   返回一个失败的 promise 对象

6. **Promise.all 方法**：(promises) => {}

   - promises：包含 n 个 promise 对象的数组

   返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败就是失败

7. **Promise.race方法**：(promises) => {}

   - promises：包含 n 个 promise 对象的数组

   返回一个新的 proimse，第一个完成的 promise 的结果状态就是最终的结果状态

## Promise 异常穿透

- 当使用 promise 的 then 链式调用时，可以在最后指定失败的回调
- 前面任何操作出了异常，都会传到最后失败的回调中处理

## 中断 Promise 链

- 当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数
- 办法：在回调函数中返回一个 pending 状态的 promise 对象

## 手写 Promise

注意，下面的实现只是一个浅显的模仿，和实际效果有很多不同之处。比如：

- 原生的 Promise 的 then 方法中回调的执行时机更靠近，而下面的实现使用 setTimeout 执行时机更靠后
- 原生的 Promise.reject 如果没有指定失败的回调，会抛出异常，而下面的实现没有考虑这点

```js
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callbacks = []
  const self = this

  function resolve(value) {
    if (self.PromiseState !== 'pending') return
    self.PromiseState = 'fulfilled'
    self.PromiseResult = value
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onResolved(value)
      })
    })
  }

  function reject(reason) {
    if (self.PromiseState !== 'pending') return
    self.PromiseState = 'rejected'
    self.PromiseResult = reason
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onRejected(reason)
      })
    })
  }

  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this

  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }

  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }

  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        const result = type(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => resolve(v),
            (r) => reject(r),
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved)
      })
    }
    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      })
    }
    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function (value) {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (v) => resolve(v),
        (r) => reject(r),
      )
    } else {
      resolve(value)
    }
  })
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          count++
          arr[i] = v
          if (count === promises.length) {
            resolve(arr)
          }
        },
        (r) => {
          reject(r)
        },
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      p.then(
        (v) => resolve(v),
        (r) => reject(r),
      )
    })
  })
}
```
