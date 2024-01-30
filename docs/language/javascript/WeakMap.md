# WeakMap

`WeakMap` 类似于 `Map`，但不同之处在于：

- `WeakMap` 只接受对象作为键，不接受其他类型的值作为键。
- `WeakMap` 只会弱引用对象，这意味着只要对象不在其他地方使用，垃圾回收机制就可以回收该对象占用的内存。
- `WeakMap` 不可遍历，没有 `size` 属性和 `keys`，`values`，`entries`，`clear` 等方法。

实际上，`WeakMap` 只支持如下方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.has(key)`
- `weakMap.delete(key)`

## WeakMap 简要理解

先看一下 `Map`：

```js
const map = new Map()
let obj = { a: 1 }

map.set(obj, true)
console.log(map.get(obj)) // true

obj = null
console.log(map.size) // 1
```

虽然 obj 被赋值为 `null`，但是 `map` 仍然保留了对 `obj` 的引用，这是因为 `map` 会对键进行强引用，所以 `obj` 不会被垃圾回收机制回收。

而 `WeakMap` 则不同：

```js
const weakMap = new WeakMap()
let obj = { a: 1 }

weakMap.set(obj, true)

obj = null
// obj 被赋值为 null 后，它会从 weakMap 和内存中移除
```

由于 `weakMap` 没有 `size` 属性，因此无法直接验证 `obj` 是否被移除。

## 应用场景之一：缓存

我们有这样一个需求，如果根据对象计算一个值，对象相同则直接返回缓存的值。

```js
const cache = new WeakMap()

// 计算并记住结果
function process() {
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  const result = 'xxx' // 计算结果
  cache.set(obj, result)
  return result
}

let obj = { a: 1 }
process(obj) // xxx
process(obj) // xxx
```

## 总结

`WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除。

## 参考

[现代 JavaScript 教程](https://zh.javascript.info/weakmap-weakset)
