# Reflect

`Reflect` 对象与 `Proxy` 对象一样是 ES6 提出的新 API，它可以简化 `Proxy` 的创建。

对象上有一些内部方法：`[[Get]]` 和 `[[Set]]`，我们不能直接调用。`Reflect` 对象则使调用这些内部方法成为了可能。

```js
let user = {}

Reflect.set(user, 'name', 'John')

alert(user.name) // John
```

以下是执行相同操作和 Reflect 调用的示例：

| 操作              | Reflect 调用                      | 内部方法      |
| ----------------- | --------------------------------- | ------------- |
| obj[prop]         | Reflect.get(obj, prop)            | [[Get]]       |
| obj[prop] = value | Reflect.set(obj, prop, value)     | [[Set]]       |
| delete obj[prop]  | Reflect.deleteProperty(obj, prop) | [[Delete]]    |
| new F(value)      | Reflect.construct(F, value)       | [[Construct]] |
| …                 | …                                 | …             |

## Reflect 的设计目的

1. 将 `Object` 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty`），放到 `Reflect` 对象上。

2. 修改某些 `Object` 方法的返回结果，让其变得更合理。

   比如 `Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false`。

3. 让 `Object` 操作都变成函数行为。
   某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]`，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。

4. `Reflect` 对象的方法与 `Proxy` 的方法一一对应。

   对于每个可被 `Proxy` 捕获的内部方法，在 `Reflect` 中都有一个对应的方法，其名称和参数与 `Proxy` 捕捉器相同。我们可以很方便地使用 `Reflect` 来将操作转发给原始对象。

## 代理一个 getter

我们先看一个原型链的例子：

```js
const person = {
  _name: 'person',
  get name() {
    return this._name
  },
}

const keqing = {
  _name: 'keqing',
  __proto__: person,
}

keqing.name // keqing
```

在上面的代码中，`keqing` 对象上并没有 `name` 属性，但是我们可以通过原型链访问到 `person` 对象上的 `name` getter。这时候，这个 `getter` 中的 `this` 指向的是 `keqing` 对象！

来看使用 `Proxy` 代理后的例子：

```js{10,11}
const person = {
  _name: 'person',
  get name() {
    return this._name
  },
}

const proxy = new Proxy(person, {
  get(target, key, receiver) {
    console.log(receiver === keqing) // true
    return target[key]
  },
})

const keqing = {
  _name: 'keqing',
  __proto__: proxy,
}

keqing.name // person
```

我们发现，此时 `this` 指向了 `person`！这其实是理所当然的，虽然 `keqing` 对象通过原型链访问其原型对象的 `name` 属性，但是被 Proxy 代理之后，直接返回 `target[key]`，那么 `this` 当然就是 `target` 代表的对象 `person` 了。

怎么解决这个问题呢？关键在于如何获取正确的 `this`。幸运地是，`get` 捕捉器的第三个参数 `receiver` 就是正确的 `this`。

我们可以使用 `Reflect` 对象的 `get` 方法将正确的 `this` 传递给 getter：

```js{10}
const person = {
  _name: 'person',
  get name() {
    return this._name
  },
}

const proxy = new Proxy(person, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
})

const keqing = {
  _name: 'keqing',
  __proto__: proxy,
}

keqing.name // keqing
```

我们可以写得更短：

```js{2}
get(target, prop, receiver) {
  return Reflect.get(...arguments);
}
```

## 总结

`Reflect` 调用的命名与捕捉器的命名完全相同，并且接受相同的参数。它提供了一个安全的方式，可以轻松地转发操作，并确保我们不会忘记与此相关的任何内容。

## 参考

- [MDN Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [阮一峰 ES6 入门教程](https://es6.ruanyifeng.com/#docs/reflect)
- [现代 JavaScript 教程](https://zh.javascript.info/proxy#reflect)
