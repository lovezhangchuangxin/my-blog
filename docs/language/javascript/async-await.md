# async await

参考 [现代Javascript教程 - async/await](https://zh.javascript.info/async-await)

async/await 本质是 Generator 的语法糖，它的目的是简化 Promise 的使用，特别是处理链式调用。

它能以同步的写法来处理异步的操作，不过它的本质还是异步的。

## 模拟实现

```javascript
function asyncToGenerator(generator) {
  return function () {
    // generator可以传参
    const gen = generator.apply(this, arguments)

    return new Promise((resolve, reject) => {
      function step(key, val) {
        // 1. gen.next(val) 2. gen.throw(err)
        let generatorResult
        try {
          generatorResult = gen[key](val)
        } catch (error) {
          reject(error)
          return
        }

        const { value, done } = generatorResult
        if (done) {
          // 最后一次
          return resolve(value)
        }
        return Promise.resolve(value).then(
          (val) => step('next', val),
          (err) => step('throw', err),
        )
      }

      // 第一次不需要传值
      step('next')
    })
  }
}

function* testG() {
  const data = yield new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  })
  console.log('data', data)
  const data2 = yield new Promise((resolve) => {
    setTimeout(() => {
      resolve('world')
    }, 2000)
  })
  console.log('data2', data2)
  return 'ending'
}

const test = generatorToAsync(testG)

test().then((result) => {
  console.log(result)
})
```

## 注意

- async 函数返回的是一个 Promise 对象
- await 只能在 async 函数中使用，或者 ES6 模块中顶层使用
- async 函数中使用 await 并不会阻塞函数之外的代码执行，只会使函数内的代码按顺序执行
- await 后面的 Promise 对象如果变为 reject 状态，会抛出异常，可以使用 try...catch 捕获
