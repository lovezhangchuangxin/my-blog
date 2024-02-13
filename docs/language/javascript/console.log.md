# console.log 会导致内存泄漏吗

经常看到一些文章说 `console.log` 会导致内存泄漏，这是真的吗？那以后是不是不能用 `console.log` 了？

这些说法多少有些以偏概全。先说结论：

1. nodejs 中 `console.log` 不会导致内存泄漏
2. 浏览器中使用 `console.log` 打印对象时，会导致内存泄漏（无论打不打开开发者工具）
3. 少量的内存泄漏根本就不在乎，如果是循环中打印大量的对象，就要注意了

打印基本类型的数据时肯定不会造成内存泄漏。而在浏览器控制台打印对象时，由于需要保存对象的引用（以便随时查看对象的详细信息），因此表面上我们在程序中不再使用这个对象，但是控制台中还有这个对象的引用，导致对象无法被回收，从而造成内存泄漏。

```html
<body>
  <button>打印</button>

  <script>
    const btn = document.querySelector('button')
    btn.addEventListener('click', () => {
      // 大概 4MB 大小的数组
      console.log(new Array(1024 * 1024).fill(0))
    })
  </script>
</body>
```

上面代码中，每次点击按钮都会打印一个 4MB 大小的数组，打开浏览器任务管理器（`shift + Esc`），观察网页所占用的内存，
可以看到，不管打不打开浏览器开发者工具，内存都会持续增长，这就是内存泄漏。

那以后到底用不用 `console.log` 呢？其实很简单，**开发环境用无所谓，生产环境借助打包工具自动帮助我们删除代码中的 `console.log` 即可。**

以 vite 为例，只需要安装 `terser`，并在 `vite.config.js` 中配置 `build` 选项即可：

```javascript
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 删除 console 语句
        drop_console: true,
      },
    },
  },
}
```

::: tip

不要轻视内存泄漏，但也不要害怕内存泄漏！全局变量不会被 gc 回收，某种意义上也相当于内存泄漏，那会有人因此不用全局变量吗？
所以说 `console.log` 导致的内存泄漏压根就不是事儿！

:::

## 参考

- [R·ex / Zeng - 追根究底：不打开 DevTools 时，console.log 会不会内存泄漏？](https://blog.rexskz.info/getting-to-bottom-will-console-log-cause-memory-leak-when-devtools-is-off.html)
