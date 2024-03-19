# AbortController

`AbortController` 是一个可用于中止异步操作的 API。

## 语法

创建 `AbortController` 对象：

```javascript
const controller = new AbortController()
```

`AbortController` 对象有两个属性：

- `AbortController.signal`：一个 `AbortSignal` 对象，它可以用来注册事件处理程序，以便在中止时通知。
- `AbortController.abort(reason)`：一个方法，用于中止异步操作，可以传递中止原因。

## AbortSignal

`AbortSignal` 表示一个信号对象。

属性：

- `AbortSignal.aborted`：一个布尔值，表示是否已经中止。
- `AbortSignal.reason`：表示中止的原因。
- `AbortSignal.throwIfAborted()`：如果已经中止则抛出异常，否则不做任何事情。

静态方法：

- `AbortSignal.abort()`：返回一个已经中止的 `AbortSignal` 对象。
- `AbortSignal.timeout(time)`：返回一个 `AbortSignal` 对象，它在指定的时间后中止。

事件：

- `abort`：当中止时触发。

例如：

```javascript
abortSignal.addEventListener('abort', (event) => {
  console.log('aborted', event.target.reason)
})
```

## AbortController 示例

上面说到 `AbortController` 对象有一个 signal 属性，表示一个 `AbortSignal` 对象。我们可以通过这个对象来**监听**中止事件。
而 `AbortController.abort()` 方法用于**触发**中止事件。

```javascript
const controller = new AbortController()
const signal = controller.signal

signal.addEventListener('abort', (event) => {
  console.log('aborted', event.target.reason) // aborted some reason
})

controller.abort('some reason')
```

## 参考

- [MDN - AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)
- [MDN - AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)
