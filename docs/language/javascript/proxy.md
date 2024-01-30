# Proxy

Proxy 是 ES6 新增的功能，可以用来拦截和自定义对象中的操作。

Proxy 没有可将其转为 ES5 的 polyfill，但是各大浏览器都支持 ES6，可以完全放心使用。实际上，很多库和框架都用到了 Proxy，比如 Vue 等。Node.js 也支持 Proxy。

## 概述

Proxy 的英文意思是“代理”，它可以代理一个对象，拦截对该对象的访问，然后进行一些操作。

```js
let proxy = new Proxy(target, handler)
```

使用 `new Proxy`，传入目标对象 `target` 和处理器对象 `handler`，就可以得到目标对象的代理对象 `proxy`。
`handler` 中可以定义很多特定名字的方法（捕捉器），捕捉（代理） `target` 的某些操作。比如：

```js
const target = {
  a: 1,
}
const handler = {
  get(target, propKey, receiver) {
    console.log('get', target, propKey, receiver)
    return target[propKey]
  },
  set(target, propKey, value, receiver) {
    console.log('set', target, propKey, value, receiver)
    target[propKey] = value
    return true
  },
}
const proxy = new Proxy(target, handler)
console.log(proxy.a)
proxy.a = 2
```

<script>
  const target = {
    a: 1,
  }
  const handler = {
    get(target, propKey, receiver) {
      console.log('get', target, propKey, receiver)
      return target[propKey]
    },
    set(target, propKey, value, receiver) {
      console.log('set', target, propKey, value, receiver)
      target[propKey] = value
      return true
    },
  }
  const proxy = new Proxy(target, handler)
  console.log(proxy.a)
  proxy.a = 2
</script>

在控制台中查看效果。我们可以看到，我们通过 `Proxy` 实现了对 `target` 中属性取值和设置值的拦截。

**对 proxy 进行操作，如果在 handler 中存在相应的捕捉器，则它将运行，并且 Proxy 有机会对其进行处理，否则将直接对 target 进行处理。**

> 对于对象的大多数操作，JavaScript 规范中有一个所谓的“内部方法”，它描述了最底层的工作方式。例如 [[Get]]，用于读取属性的内部方法，[[Set]]，用于写入属性的内部方法，等等。这些方法仅在规范中使用，我们不能直接通过方法名调用它们。
>
> 而 Proxy 捕捉器会拦截这些方法的调用。

| 内部方法              | Handler 方法             | 何时触发                                                                                      |
| --------------------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| [[Get]]               | get                      | 读取属性                                                                                      |
| [[Set]]               | set                      | 写入属性                                                                                      |
| [[HasProperty]]       | has                      | in 操作符                                                                                     |
| [[Delete]]            | deleteProperty           | delete 操作符                                                                                 |
| [[Call]]              | apply                    | 函数调用                                                                                      |
| [[Construct]]         | construct                | new 操作符                                                                                    |
| [[GetPrototypeOf]]    | getPrototypeOf           | Object.getPrototypeOf                                                                         |
| [[SetPrototypeOf]]    | setPrototypeOf           | Object.setPrototypeOf                                                                         |
| [[IsExtensible]]      | isExtensible             | Object.isExtensible                                                                           |
| [[PreventExtensions]] | preventExtensions        | Object.preventExtensions                                                                      |
| [[DefineOwnProperty]] | defineProperty           | Object.defineProperty, Object.defineProperties                                                |
| [[GetOwnProperty]]    | getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries                          |
| [[OwnPropertyKeys]]   | ownKeys                  | Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries |

::: details 不变量

不变量（Invariant）
JavaScript 强制执行某些不变量 —— 内部方法和捕捉器必须满足的条件。

其中大多数用于返回值：

`[[Set]]` 如果值已成功写入，则必须返回 true，否则返回 false。
`[[Delete]]` 如果已成功删除该值，则必须返回 true，否则返回 false。
……依此类推，我们将在下面的示例中看到更多内容。
还有其他一些不变量，例如：

应用于代理（proxy）对象的 `[[GetPrototypeOf]]`，必须返回与应用于被代理对象的 `[[GetPrototypeOf]]` 相同的值。换句话说，读取代理对象的原型必须始终返回被代理对象的原型。
捕捉器可以拦截这些操作，但是必须遵循上面这些规则。

不变量确保语言功能的正确和一致的行为。完整的不变量列表在 [规范](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) 中。如果你不做奇怪的事情，你可能就不会违反它们。

:::

## 1. get 捕捉器

`get(target, propKey, receiver)`

- `target` —— 目标对象
- `propKey` —— 属性名
- `receiver` —— 操作发生的对象，通常是 proxy（或者，如果我们从 proxy 继承，则是从该 proxy 继承的对象）

我们借助 `get` 捕捉器来实现一个访问不存在的属性时抛出错误的例子：

```js
let target = {
  a: 1,
}
const handler = {
  get(target, propKey, receiver) {
    if (propKey in target) {
      return target[propKey]
    } else {
      throw new ReferenceError(`Property ${propKey} does not exist.`)
    }
  },
}

target = new Proxy(target, handler)
console.log(target.a) // 1
console.log(target.b) // ReferenceError: Property b does not exist.
```

上面代码中，对 `target` 的代理又赋值给了 `target`。
**代理应该在所有地方都完全替代目标对象。目标对象被代理后，任何人都不应该再引用目标对象。否则很容易搞砸。**

## 2. set 捕捉器

`set(target, property, value, receiver)`

当写入属性时 `set` 捕捉器被触发，如果写入操作（setting）成功，`set` 捕捉器应该返回 true，否则返回 false（触发 TypeError）。

下面借助 `set` 捕捉器实现一个只允许数字类型的数组的例子：

```js
let numbers = []

numbers = new Proxy(numbers, {
  set(target, prop, val) {
    // 拦截写入属性操作
    if (typeof val == 'number') {
      target[prop] = val
      return true
    } else {
      return false
    }
  },
})

numbers.push(1) // 添加成功
numbers.push(2) // 添加成功
alert('Length is: ' + numbers.length) // 2
numbers.push('test') // TypeError（proxy 的 'set' 返回 false）
```

## 3. apply 捕捉器

`apply(target, thisArg, args)`

- `target` —— 目标对象（函数也是对象）
- `thisArg` —— `this` 的值
- `args` —— 参数列表

`apply` 捕捉器会拦截函数的调用、`call` 以及 `apply` 操作。

```js
function sum(a, b) {
  return a + b
}

const proxy = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log('apply', target, thisArg, args)
    return target.apply(thisArg, args)
  },
})

// 以下三种调用方式都会触发 apply 捕捉器
console.log(proxy(1, 2))
console.log(proxy.call(null, 1, 2))
console.log(proxy.apply(null, [1, 2]))
```

## 4. has 捕捉器

`has(target, property)`

`has` 捕捉器会拦截 `in` 调用，即判断对象上是否有某个属性。

下面利用 `has` 捕捉器来隐藏某些属性不被 `in` 操作符发现：

```js
const target = {
  a: 1,
  _b: 2,
}

const proxy = new Proxy(target, {
  has(target, prop) {
    if (prop[0] === '_') {
      return false
    }
    return prop in target
  },
})

console.log('_b' in proxy) // false
console.log('a' in proxy) // true
```

**注意：has 捕捉器只拦截 `in` 操作符，不会拦截 `hasOwnProperty` 和 `for...in`**

## 5. construct 捕捉器

`construct(target, args, newTarget)`

- `target` —— 目标对象
- `args` —— 参数列表
- `newTarget` —— 最初被调用的构造函数

`construct` 捕捉器会拦截 `new` 操作符，**返回值必须是一个对象，否则会报错。拦截的目标对象必须是函数，否则会报错**

```js
const proxy = new Proxy(function () {}, {
  construct(target, args, newTarget) {
    console.log('construct', target, args, newTarget)
    return { value: args[0] * 10 }
  },
})

console.log(new proxy(1).value) // 10
```

**注意，`construct()` 方法中的 `this` 指向的是 `handler`，而不是实例对象。**

## 6. deleteProperty 捕捉器

`deleteProperty(target, property)`

`deleteProperty` 捕捉器会拦截 `delete` 操作符。

下面利用 `deleteProperty` 来阻止删除某些属性：

```js
let target = {
  a: 1,
  _b: 2,
}

target = new Proxy(target, {
  deleteProperty(target, prop) {
    if (prop[0] === '_') {
      return false
    }
    return delete target[prop]
  },
})

console.log(delete target.a) // true
console.log(delete target._b) // false
```

## 7. defineProperty 捕捉器

`defineProperty(target, property, descriptor)`

`defineProperty` 捕捉器会拦截 `Object.defineProperty` 操作。

下面利用 `defineProperty` 来阻止定义某些属性：

```js
let target = {}

target = new Proxy(target, {
  defineProperty(target, prop, descriptor) {
    if (prop[0] === '_') {
      return false
    }
    return Object.defineProperty(target, prop, descriptor)
  },
})

console.log(Object.defineProperty(target, 'c', { value: 3 })) // {c: 3}
console.log(Object.defineProperty(target, '_d', { value: 4 })) // 报错
```

## 8. getOwnPropertyDescriptor 捕捉器

`getOwnPropertyDescriptor(target, property)`

`getOwnPropertyDescriptor` 捕捉器会拦截 `Object.getOwnPropertyDescriptor` 操作。

下面利用 `getOwnPropertyDescriptor` 来隐藏某些属性不被 `Object.getOwnPropertyDescriptor` 发现：

```js
let target = {
  a: 1,
  _b: 2,
}

target = new Proxy(target, {
  getOwnPropertyDescriptor(target, prop) {
    if (prop[0] === '_') {
      return undefined
    }
    return Object.getOwnPropertyDescriptor(target, prop)
  },
})

console.log(Object.getOwnPropertyDescriptor(target, 'a')) // {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(target, '_b')) // undefined
```

## 9. getPrototypeOf 捕捉器

`getPrototypeOf(target)`

`getPrototypeOf` 捕捉器会拦截获取对象原型的操作：

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

```js
let target = {}
let proto = { a: 1 }
target = new Proxy(target, {
  getPrototypeOf(target) {
    return proto
  },
})

console.log(Object.getPrototypeOf(target)) // {a: 1}
```

**`getPrototypeOf()` 方法的返回值必须是对象或者 null，否则报错。此外，如果目标对象不可扩展（non-extensible），则 `getPrototypeOf()` 方法必须返回目标对象的原型对象。**

## 10. isExtensible 捕捉器

`isExtensible(target)`

`isExtensible` 捕捉器会拦截 `Object.isExtensible()` 操作。

```js
let target = {}
target = new Proxy(target, {
  isExtensible(target) {
    console.log('isExtensible')
    return true
  },
})

console.log(Object.isExtensible(target)) // true
```

**`isExtensible()` 方法必须返回一个布尔值，否则报错。且它的返回值必须与目标对象的 `isExtensible` 属性保持一致**

## 11. ownKeys 捕捉器

`ownKeys(target)`

`ownKeys` 捕捉器会拦截对象自身属性的读取操作：

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in循环`

```js
let target = {
  a: 1,
  _b: 2,
  [Symbol.for('c')]: 3,
}

target = new Proxy(target, {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter((key) => key[0] !== '_')
  },
})

console.log(Object.keys(target)) // ["a"]
```

## 12. preventExtensions 捕捉器

`preventExtensions(target)`

`preventExtensions` 捕捉器会拦截 `Object.preventExtensions()` 操作。

```js
let target = {}
target = new Proxy(target, {
  preventExtensions(target) {
    console.log('preventExtensions')
    Object.preventExtensions(target)
    return true
  },
})

Object.preventExtensions(target) // preventExtensions
```

只有目标对象不可扩展时（即 `Object.isExtensible(proxy)` 为 false），`proxy.preventExtensions` 才能返回true，否则会报错。

## 13. setPrototypeOf 捕捉器

`setPrototypeOf(target, prototype)`

`setPrototypeOf` 捕捉器会拦截 `Object.setPrototypeOf()` 操作。

```js
let target = {}
let proto = { a: 1 }
target = new Proxy(target, {
  setPrototypeOf(target, proto) {
    console.log('setPrototypeOf')
    Object.setPrototypeOf(target, proto)
    return true
  },
})

Object.setPrototypeOf(target, proto) // setPrototypeOf
```

该方法需要返回布尔值。如果目标对象不可扩展，`setPrototypeOf()` 方法不能改变目标对象的原型。

## Proxy.revocable()

`Proxy.revocable()` 方法可以创建一个可撤销的代理对象。

```js
let target = {}
let handler = {}
let { proxy, revoke } = Proxy.revocable(target, handler)

proxy.a = 1
console.log(proxy.a) // 1

revoke()
proxy.a // 报错
```

## this 问题

对象被代理后，`this` 的指向会发生变化。

```js
const target = {
  m: function () {
    console.log('target method:', this === proxy)
  },
  get x() {
    console.log('target getter:', this === target)
  },
}
const handler = {
  get(target, propKey, receiver) {
    console.log('handler get:', this === handler)
    return target[propKey]
  },
}

const proxy = new Proxy(target, handler)

target.m() // target method: true
proxy.m() // handler get: true target method: false
target.x // target getter: true
```

- proxy 方法内部的 `this` 指向 proxy
- proxy `getter` 的 `this` 指向 target
- handler 中 `get` 捕捉器 的 `this` 指向 handler

## Proxy 的局限性

> 许多内建对象，例如 Map，Set，Date，Promise 等，都使用了所谓的“内部插槽”。
>
> 它们类似于属性，但仅限于内部使用，仅用于规范目的。例如，Map 将项目（item）存储在 [[MapData]] 中。内建方法可以直接访问它们，而不通过 [[Get]]/[[Set]] 内部方法。所以 Proxy 无法拦截它们。

也就是说，在这些内建对象被 Proxy 代理后，由于代理对象没有这些内部插槽，因此内建方法将会失败。

```js
let map = new Map()

let proxy = new Proxy(map, {})

proxy.set('test', 1) // Error
```

事实上，类的私有字段也是通过内部插槽实现，因此也无法直接代理。

幸运地是，使用 `bind` 可以使代理正常。

```js{5,6}
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1（工作了！）
```

## Proxy 与 Object.defineProperty() 的比较

- `Object.defineProperty()` 只能对单个属性进行拦截，而 `Proxy` 可以对整个对象进行拦截。
- `Proxy` 可以直接监听数组的变化，而 `Object.defineProperty()` 只能通过修改数组的原型方法来监听。
- `Object.defineProperty()` 只能监听属性的读取和写入，而 `Proxy` 还可以监听属性的删除、`in` 操作符、`for...in` 循环、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`、`Object.keys()`、`Reflect.ownKeys()` 等操作。
- `Object.defineProperty()` 无法取消监听，而 `Proxy` 可以通过 `Proxy.revocable()` 方法取消监听。
- `Proxy` 的性能比 `Object.defineProperty()` 的性能要好。
- `Proxy` 可能有兼容性问题，而 `Object.defineProperty()` 是 ES5 的标准，兼容性更好。

## 参考

- [MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [阮一峰 ES6 入门教程](https://es6.ruanyifeng.com/#docs/proxy)
- [现代 JavaScript 教程](https://zh.javascript.info/proxy)
