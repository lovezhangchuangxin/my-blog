# Javascript 相关面试题

::: details 常用工具

- [ES6 - 阮一峰](https://es6.ruanyifeng.com/)
- [JS 基准测试](https://jsbench.me/)

:::

## 1. 请你实现一个类的私有属性，类中可以直接访问，类外不能直接访问。

答：首先，限制属性访问想到闭包，但是闭包是一个隐藏内部变量的函数，此处的要求是类而不是函数。但道理都是相同的。我们不直接定义私有属性，而是通过将需要限制访问的属性放在一个外界无法访问的作用域中。比如，模块作用域：

```javascript
let data = 1

class A {
  getData() {
    return data
  }
}
```

你说 data 能直接访问？拜托，你不是在这个文件中使用类 A，而是其他文件，这时变量 data 没有导出是访问不了的，模块作用域未导出的变量从某种意义中就是私有的。

问题还没有结束，如果像上面那样使用属性，相当于是静态属性，所有的对象共用，但是我们想要私有的是实例属性。类虽然不是函数，但是类的构造函数是函数，我们可以使用构造函数来构造闭包：

```javascript
class A {
  constructor() {
    let data = 1
    this.getData = function () {
      return data
    }
  }
}
```

这种方式不太优雅，我不想在构造函数里面定义函数怎么办？

```javascript
class A {
  map = new Map()

  constructor() {
    this.map.set('data', 1)
  }

  getData() {
    return this.map.get('data')
  }
}
```

这样外部可以通过 map 属性访问 data 怎么办？map 从类中移出，放到模块作用域即可，注意为了避免内存泄漏，我们使用 WeakMap：

```javascript
let map = new WeakMap()

class A {
  constructor() {
    map.set(this, new Map())
    map.get(this).set('data', 1)
  }

  getData() {
    return map.get(this).get('data')
  }
}
```

## 2. JS 中如何存储浮点数

JS 采用了 IEEE 754 标准，使用双精度浮点数来表示整数和浮点数。符号类 S 占 1 位，指数 E 占 11 位，尾数 M 占 52 位。由于尾数的第一位总是 1，因此将其省略，所以实际上尾数的精度是 53 位。

JS 中的整数实际上是存储在浮点数的 M 区，因此只有 53 位的精度。如果超过 53 位，就可能丢失精度。例如：

```javascript
2 ** 53 + 1 == 2 ** 53 // true
```

相比于 C、Python 等支持 64 位整数运算语言，JS 的整数精度要低很多。不过可以通过 bigint 来弥补这一缺陷。

## 3. JS 中为什么 0.1 + 0.2 !== 0.3 ？

首先这不是 JS 的锅，而是 JS 所采用的 IEEE 754 标准的特性。0.1 和 0.2 在二进制中是无限循环的小数，因此在转换为二进制时会丢失精度。
其他采用该标准的语言，如 Python、C 等，也会出现这个问题。

如何避免这个问题？

在一些精度要求不高的场景，可以使用 `toFixed` 方法保留一定的小数位数，这样低位的误差就会被舍去。注意 `toFixed` 返回的是字符串，需要使用 `parseFloat` 等方法转换为数字。

```javascript
;(0.1 + 0.2).toFixed(10) === (0.3).toFixed(10) // true

parseFloat((0.1 + 0.2).toFixed(10)) // 0.3
```

或者使用一些基于字符串运算的库，将小数转换为字符串基于十进制运算规则来进行运算。

## 4. 手写一个深拷贝

```javascript
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const result = Array.isArray(obj) ? [] : {}

  for (const key of Object.keys(obj)) {
    result[key] = deepClone(obj[key])
  }

  return result
}
```

用 `JSON.parse` 和 `JSON.stringify` 呢？在我看来只是一种奇技淫巧，除了代码简单之外，没有理由使用。

图方便可以使用 `lodash` 的 `cloneDeep` 方法。

多提一句，浅拷贝和深拷贝的区别是什么？浅拷贝只会拷贝对象的第一层属性，而深拷贝会递归拷贝对象的所有属性。

`Object.assign` 和 `...` 运算符拷贝对象是浅拷贝。

## 5. 手写数组扁平化

注意：数组原生的 `flat` 方法默认只能扁平化一层，传入参数指定要提取的嵌套的层数，传入 `Infinity` 可以完全扁平化。

```javascript
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    Array.isArray(cur) ? acc.push(...flatten(cur)) : acc.push(cur)
    return acc
  }, [])
}
```

你不想考虑性能可以使用 `concat` 代替 `push` 来简化代码编写。然而，并不推荐。在数组很大时，这很可能会比 `push` 实现慢上几十倍。

`concat` 每次会返回一个新数组，这意味着每次都要开辟一个新数组并就将旧数组的元素复制到新数组中。

更微妙的是，`concat` 会判断传入的参数是否是数组，如果是数组则会将数组展开，这意味着 `concat` 会对每个元素进行类型判断，这也会导致性能损失。

```javascript
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
```

还有没有其他方法？本质就是遍历、递归，你使用别的遍历方法即可。但是注意，大量数据遍历的情况下：

`for, while, do while > for...of > forEach, map, reduce, filter... > for...in`

`for...in` 会遍历原型链上的属性，因此性能最差。某些情况下可以用 `for...of Object.keys` 来代替。

## 6. 数组去重

```javascript
function unique(arr) {
  // return Array.from(new Set(arr)) // 这种写法也可以
  return [...new Set(arr)]
}
```

如果我希望去重后的数组顺序不变呢？希望对引用类型的数据也能根据内容去重呢？

```javascript
function unique(arr) {
  const set = new Set()
  const res = []
  arr.forEach((item) => {
    if (typeof item != 'object') {
      if (!set.has(item)) {
        res.push(item)
        set.add(item)
      }
      return
    }

    const key = JSON.stringify(item)
    if (set.has(key)) return
    res.push(item)
    set.add(key)
  })

  return res
}
```

缺点，写法简单但效率很低。

仅考虑数组元素为基本数据类型，更多的去重方法：

- 用 `sort` 排序后一遍遍历去重
- 用 `includes` 判断是否重复（效率很低）

## 7. 实现伪随机数

首先，伪随机数不是真正的随机数，而是计算机根据一定的算法生成的数。因此，伪随机数是可以预测的。

我们要想实现伪随机数，首先要有一个种子，种子是一个初始值，通过种子可以生成一系列的随机数。种子可以是时间戳、用户输入、设备信息等。

这里采用**线性同余法**实现伪随机数，即 `seed = (a * seed + c) % m`，其中 `seed` 是种子，`a`、`c`、`m` 是常数。

```javascript
const lcg = (seed) => {
  return (1103515245 * seed + 12345) % 0x80000000 // 2^31
}

// 如果想要 0~1 之间的随机数
const random = (seed) => {
  return lcg(seed) / 0x80000000
}
```

## 8. 计算 1 到 10000 之间的质数

使用**埃拉托斯特尼筛法**，即从 2 开始，将 2 的倍数全部标记为非质数，然后找到下一个未标记的数，重复上述步骤。

```javascript
function getPrimes(n) {
  const isPrime = new Array(n + 1).fill(true)
  isPrime[0] = isPrime[1] = false

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false
      }
    }
  }

  return isPrime.reduce((acc, cur, index) => {
    if (cur) acc.push(index)
    return acc
  }, [])
}

console.log(getPrimes(10000))
```

## 9. 提取 URL 中的参数

使用 split 分割 url 字符串：

```javascript
function getQueryParams(url) {
  const search = url.split('?')[1]
  if (!search) return {}

  return search.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {})
}
```

或者使用 URLSearchParams 对象：

```javascript
function getQueryParams(url) {
  const searchParams = new URL(url).searchParams
  return Object.fromEntries(searchParams)
}
```

注意 URL 对象的 searchParams 就是 URLSearchParams 对象。兼容性很好。

## 10. 打乱数组

原理很简单，遍历数组，每次将当前元素与随机位置的元素交换。

```javascript
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * arr.length)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    // arr[i] ^= arr[j] ^= arr[i] ^= arr[j]
  }
  return arr
}
```

或者借助 `sort` 方法：

```javascript
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5)
}
```

## 11. URL 上如何编码参数

URL 中只能携带 ASCII 字符，如果要携带特殊字符，需要进行编码。常用的编码方式有两种：

- `encodeURI`：编码整个 URL，但是不会编码 `:/?#[]@` 这些字符
- `encodeURIComponent`：编码 URL 中的参数，会编码 `:/?#[]@!$&'()*+,;=` 这些字符

```javascript
const url = 'https://www.baidu.com/s?wd=特殊字符'
console.log(encodeURI(url)) // https://www.baidu.com/s?wd=%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6
console.log(encodeURIComponent(url)) // https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3D%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6
```

所以说，`encodeURI` 用于编码整个 URL，但是不编码一些特殊字符。而 `encodeURIComponent` 用于编码 URL 中的参数。

对应的解码方法是 `decodeURI` 和 `decodeURIComponent`。

## 12. 控制 a, b, c 三个异步函数的执行顺序，a 和 b 同时执行，c 在 a 和 b 都执行完后执行

使用 `Promise.all`：

```javascript
await Promise.all([a(), b()])
c()
```

不用 promise 怎么办？使用计数器（类比信号灯）：

```javascript
let count = 0
function callback() {
  count++
  if (count === 2) {
    c()
  }
}

a(callback)
b(callback)
```

## 13. 用 Promise 实现一个 sleep 函数

```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// 使用
await sleep(1000)
```

## 14. 用 JS 实现发布订阅模式

实现 `on, off, emit` 方法：

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, callback, once = false) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push({ callback, once })
  }

  once(event, callback) {
    this.on(event, callback, true)
  }

  emit(event, ...args) {
    if (!this.events[event]) return
    this.events[event].forEach((cb, index) => {
      cb.callback(...args)
    })
    this.events[event] = this.events[event].filter((cb) => !cb.once)
  }

  off(event, callback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter(
      (cb) => cb.callback !== callback,
    )
  }
}
```

## 15. ES6 相比于 ES5 有哪些新特性

首先说明，ES5 是 2009 年发布的标准，ES6 是 2015 年发布的标准 ES2015。然而，我们谈 ES6 的时候，一般并不是单指 ES2015 这一个版本，而是指自 ES2015 以来的所有版本，即现代的 Javascript。

这个问题其实除了体现面试官的懒之外没有意义，因为很多人一开始学的就是 ES6 语法。正确的问法不是笼统地问 ES6 新增了哪些特性，那太多太多了，而是具体问某些特性的作用，比如 箭头函数、Promise、Class语法糖、async/await、解构赋值、扩展运算符、新增数据结构 WeakMap、WeakSet、Proxy、Generator 等等。

你或许可以反问他，你知道从 2015 年到如今 JS 新增的所有标准吗？不能遗漏哦。

当然，问题还是得回答，下面谈到了一些常用的特性：

- 新增 `let`、`const` 关键字用于声明变量，从此 JS 中有了块级作用域
- 新增对象和数组的解构赋值，当然字符串等也可以解构赋值，从而简化了变量的赋值的写法
- 新增模板字符串，可以使用 `${}` 来插入变量，简化了字符串的拼接
- 支持箭头函数，简化了函数的写法，也给 `this` 的指向带来了一些变化
- 新增了一些数组方法，比如`find`、`findIndex`、`includes`、`flat` 等
- 新增了一些对象方法，比如 `Object.assign`、`Object.keys`、`Object.values`、`Object.entries`、`Object.fromEntries` 等
- 新增了一些运算符，比如 `**`、`?.`、`??` 等
- 新增 `symbol`、`bigint`等数据类型，Symbol 用于创建唯一的值，BigInt 用于表示任意精度的整数
- 新增了一些数据结构，比如 `Map`、`Set`、`WeakMap`、`WeakSet` 等
- 新增了 `Proxy`、`Reflect` 等对象，用于实现元编程
- 新增了 `Promise`、`async/await` 等异步编程的语法糖
- 新增了 `class` 语法糖，用于实现面向对象编程
- 新增了 `Generator`、`Iterator` 等用于实现迭代器的语法糖
- 新增了 `ESM`，用于实现模块化编程
- 还有 `ArrayBuffer`、`Decorator` 等等很多很多

## 16.var、let、const 区别

- var 声明的变量属于**函数作用域**，let 和 const 声明的变量属于**块级作用域**
- var 可以**重复声明**，let 和 const 不可以重复声明
- var 存在**变量提升**，一般认为 let 和 const 不存在变量提升（严格来说也有）
- var 不存在**暂时性死区**，let 和 const 存在暂时性死区
- var 和 let 可以先声明后赋值，const 必须同时声明和赋值
- 在浏览器中，全局作用域下 var 声明的变量会成为 window 对象的属性，let 和 const 不会

## 17. 实现 call、apply、bind

```javascript
Function.prototype.myCall = function (context, ...args) {
  context = context || window
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.myApply = function (context, args) {
  context = context || window
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

// 注意：如果目标函数是可构造的，绑定函数也可以使用 new 运算符进行构造
Function.prototype.myBind = function (context, ...args) {
  const self = this
  return function F(...rest) {
    // 如果是 new 调用，this 指向实例
    if (this instanceof F) {
      return new self(...args, ...rest)
    }
    return self.apply(context, args.concat(rest))
  }
}
```

## 18. 使用箭头函数时要注意什么？

- 箭头函数没有自己的 `this`，它的 `this` 是继承自父作用域的，因此箭头函数不能用于构造函数，也没有 `prototype` 属性，不过 `__proto__` 属性是存在的
- 箭头函数内不能使用 `arguments` 对象，可以使用 `rest` 参数代替
- 箭头函数不能使用 `yield` 关键字，因此箭头函数不能用作 Generator 函数
- `call`、`apply`、`bind` 无法改变箭头函数的 `this` 指向
- 箭头函数中没有自己的 `super`，它的 `super` 是继承自父作用域的

## 19. 自己实现模板字符串的解析

例子：给定字符串 `str="你的名字是${name}"` 和 `name = "张三"`，请定义函数 `parse`，使得 `parse(str)` 返回 `你的名字是张三`。

```javascript
function parse(str) {
  return str.replace(/\$\{([^}]+)\}/g, (match, p1) => {
    return eval(p1)
  })
}
```

## 20. Set 和 WeakSet，Map 和 WeakMap 的区别

- `Set` 和 `Map` 是强引用，`WeakSet` 和 `WeakMap` 是弱引用
- `WeakSet` 中的元素只能是对象，`WeakMap` 中的键只能是对象，而 `Set` 和 `Map` 中的元素和键可以是任意类型
- `WeakSet` 和 `WeakMap` 不可迭代，没有 `size` 属性，没有 `clear` 方法，没有 `forEach`

## 21. ESM 和 CJS 的区别

- ESM 是静态加载，在编译时就确定了模块的依赖关系，而 CJS 是动态加载，只有在运行时才能确定模块的依赖关系
- ESM 有 tree-shaking，可以在编译时去除无用代码
- ESM 的 import 可以异步加载，而 CJS 的 require 是同步加载
- ESM 导出的变量是只读的，而 CJS 导出的变量是可变的

## 22. Promise 值穿透

Promise 中的值穿透是指，如果 `then`、`catch` 方法中没有传入函数，那么会将上一个 `then` 方法中返回的值传递给下一个 `then`、`catch` 方法。

```javascript
Promise.resolve(1)
  .then(0)
  .then((value) => {
    console.log(value) // 1
  })
```

## 23. `["1", "2", "3"].map(parseInt)` 输出什么？

`parseInt` 函数有两个参数，第一个参数是要转换的字符串，第二个参数是进制。`map` 方法的回调函数有三个参数，分别是当前元素、当前索引、原数组。

因此，`["1", "2", "3"].map(parseInt)` 相当于：

```javascript
;['1', '2', '3'].map((item, index) => parseInt(item, index))
```

相当于调用了 `parseInt('1', 0)`、`parseInt('2', 1)`、`parseInt('3', 2)`。当进制为 0 时，按照 10 进制处理。

所以输出是 `[1, NaN, NaN]`。

## 24. 手写数组方法 reduce

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue
  for (let i = 0; i < this.length; i++) {
    if (acc === undefined) {
      acc = this[i]
      continue
    }
    acc = callback(acc, this[i], i, this)
  }
  return acc
}
```

## 25. LRU 缓存是什么，请实现一个 LRU 缓存类

> 参考：[Touryung's Blog - LRU 居然翻译成最近最少使用？真相原来是这样！（附力扣题解）](https://www.cnblogs.com/touryung/p/17151753.html)

LRU 是一种缓存淘汰策略。当缓存满了淘汰数据的时候，它会删除最久未被访问的数据。当访问一个到数据时，它会将该数据提前。

LRU 中需要在频繁地进行数据的查找插入删除，因此采用**哈希表**+**双向链表**来实现。哈希表用于快速查找数据，双向链表用于快速删除和插入数据。

双向链表的节点要同时存 key 和 value，这是因为淘汰节点要根据节点的 key 进而删除哈希表中的数据，如果只有 value 无法找到哈希表中对应的数据。

```javascript
// 先实现双向链表
function Node(key, value) {
  this.key = key
  this.value = value
  this.prev = null
  this.next = null
}

// 插入尾节点
function insertTail(tail, node) {
  tail.prev.next = node
  node.prev = tail.prev
  node.next = tail
  tail.prev = node
}

// 删除节点
function removeNode(node) {
  node.prev.next = node.next
  node.next.prev = node.prev
}

var LRUCache = function (capacity) {
  this.capacity = capacity
  // 初始化哈希表
  this.map = new Map()
  // 初始化双向链表
  this.head = new Node()
  this.tail = new Node()
  this.head.next = this.tail
  this.tail.prev = this.head
}

LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1

  const node = this.map.get(key)
  // 提高优先级，先删除后插入
  removeNode(node)
  insertTail(this.tail, node)

  return node.value
}

LRUCache.prototype.put = function (key, value) {
  // 已经存在，修改值并移动
  if (this.map.has(key)) {
    const node = this.map.get(key)
    node.value = value
    removeNode(node)
    insertTail(this.tail, node)
    return
  }
  // 容量不够，淘汰最久未被使用的节点
  if (this.map.size >= this.capacity) {
    // 删除头节点
    this.map.delete(this.head.next.key)
    removeNode(this.head.next)
  }
  // 插入新节点
  const node = new Node(key, value)
  this.map.set(key, node)
  insertTail(this.tail, node)
}
```

注意：在 JS 中 map，set是有序的，因此可以直接使用 map 来实现 LRU 缓存。map.keys() 返回的是一个迭代器，迭代器的顺序是插入的顺序。

## 26. 如何取消 promise

首先需要说明的是，传入 Promise 的 executor 函数是立即执行，因此不可能取消。所谓的取消 promise，是指在 promise 状态变更之前，提前调用 reject，使得之后的成功的回调不能执行。

这有业务场景呢？比如我处于页面 A，使用 Promise 包装一个异步任务，其成功的回调是跳转到页面 B。但是现在我又点击了页面 C。假如页面 A 创建的 Promise 没有被销毁，那么等异步任务完成后，又会跳转到页面 B。这显然是不合理的。

```typescript
class CancellablePromise<T> extends Promise<T> {
  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
    abortSignal?: AbortSignal,
  ) {
    let _reject: (reason?: any) => void

    super((resolve, reject) => {
      _reject = reject
      return executor(resolve, reject)
    })

    abortSignal?.addEventListener('abort', (reason) => {
      _reject(reason)
    })
  }
}
```

使用：

```typescript
// 使用
const controller = new AbortController()
const signal = controller.signal
const promise = new CancellablePromise((resolve) => {
  setTimeout(() => {
    resolve('done')
  }, 1000)
}, signal)

promise.then(console.log).catch((event: Event) => {
  let target = event.target
  if (target instanceof AbortSignal) {
    console.log(`aborted: ${target.aborted}, reason: ${target.reason}`)
  } else {
    console.log(event)
  }
})
controller.abort()
```

## 27. 防抖和节流

防抖和节流是控制函数执行频率的两种方法。比如浏览器的 `resize`、`scroll`、`mousemove` 事件，滚动加载、搜索联想等场景，由于事件触发频繁，容易导致性能问题。这时候可以通过防抖和节流来优化性能。

防抖是指延迟一定时间再执行，如果在这段时间内再次触发，则重新计时。
节流是指一定时间内只执行一次。

拿公交车来举例，将函数执行一次比作公交车跑一趟。假设防抖和节流的时间间隔都是十分钟。

防抖是指公交车司机想在十分钟后发车，一旦有客人上车了，司机就重新计时。（因为一个客人上车意味着接下来可能还有客人，所以需要重新等十分钟）

节流是指公交车司机每隔十分钟发一趟车。

防抖实现：

```javascript
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

节流：

时间戳写法：

```javascript
function throttle(fn, delay) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last > delay) {
      fn.apply(this, args)
      last = now
    }
  }
}
```

定时器写法：

```javascript
function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}
```

时间戳写法和定时器写法的区别是：前者是同步执行，后者是异步执行。

## 28. 函数柯里化

函数柯里化是指将一个多参数的函数转换为一系列单参数函数的过程。比如将 `f(a, b, c)` 转换为 `f(a)(b)(c)`。

实现：

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      // return function (...args2) {
      //   return curried.apply(this, args.concat(args2))
      // }
      return curried.bind(this, ...args)
    }
  }
}
```
