# WeakSet

`WeakSet` 和 [`WeakMap`](./WeakMap.md) 的原理类似，它和 `Set` 的区别在于：

- `WeakSet` 中只能添加对象，不能添加原始值。
- `WeakSet` 并不会阻止垃圾回收机制回收其中的对象。当对象在其他地方不可访问时，它会被垃圾回收机制回收，此时 `WeakSet` 中也会自动删除对应的对象。
- `WeakSet` 没有 `size` 属性和 `keys()` 方法，因此无法遍历它的成员。

## 示例

将用户添加到 WeakSet 中，以追踪访问过我们网站的用户：

```js
let visitedSet = new WeakSet()

let john = { name: 'John' }
let pete = { name: 'Pete' }
let mary = { name: 'Mary' }

visitedSet.add(john) // John 访问了我们
visitedSet.add(pete) // 然后是 Pete
visitedSet.add(john) // John 再次访问

// visitedSet 现在有两个用户了

// 检查 John 是否来访过？
alert(visitedSet.has(john)) // true

// 检查 Mary 是否来访过？
alert(visitedSet.has(mary)) // false

john = null

// visitedSet 将被自动清理(即自动清除其中已失效的值 john)
```

## 参考

[现代 JavaScript 教程](https://zh.javascript.info/weakmap-weakset)
