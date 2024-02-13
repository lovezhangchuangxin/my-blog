# EyeDropper

利用 `EyeDropper` 可以实现一个简单的拾色器。目前兼容性不是很好（2024/2/10，仅 Chrome 和 Edge 支持）

## EyeDropper 示例

```html
<button id="start-button">打开拾色器</button> <span id="result"></span>
```

```js
document.getElementById('start-button').addEventListener('click', () => {
  const resultElement = document.getElementById('result')

  if (!window.EyeDropper) {
    resultElement.textContent = '你的浏览器不支持 EyeDropper API'
    return
  }

  const eyeDropper = new EyeDropper()

  // eyeDropper
  //   .open()
  //   .then((result) => {
  //     resultElement.textContent = result.sRGBHex
  //     resultElement.style.backgroundColor = result.sRGBHex
  //   })
  //   .catch((e) => {
  //     resultElement.textContent = e
  //   })

  try {
    const result = await eyeDropper.open()
    resultElement.textContent = result.sRGBHex
    resultElement.style.backgroundColor = result.sRGBHex
  } catch (e) {
    resultElement.textContent = e
  }
})
```

<button id="start-button">打开拾色器</button> <span id="result"></span>

## input[type="color"] 实现拾色器

```html
<input type="color" id="color" value="#ff0000" /> <span id="test1"></span>
```

```js
const input = document.getElementById('color')
input.addEventListener('input', function () {
  const color = input.value
  const span = document.getElementById('test1')
  span.style.backgroundColor = color
  span.innerText = color
})
```

<input type="color" id="color" value="#ff0000" /> <span id="test1"></span>

<script setup>
  import { onMounted } from 'vue'
  onMounted(() => {
    // EyeDropper 实现拾色器
    document.getElementById('start-button').addEventListener('click', async () => {
      const resultElement = document.getElementById('result')

      if (!window.EyeDropper) {
        resultElement.textContent = '你的浏览器不支持 EyeDropper API'
        return
      }

      const eyeDropper = new EyeDropper()

      eyeDropper
        .open()
        .then((result) => {
          resultElement.textContent = result.sRGBHex
          resultElement.style.backgroundColor = result.sRGBHex
        })
        .catch((e) => {
          resultElement.textContent = e
        })

      // 使用 async/await 时注意加上 try/catch 以便捕获异常
      // try {
      //   const result = await eyeDropper.open()
      //   resultElement.textContent = result.sRGBHex
      //   resultElement.style.backgroundColor = result.sRGBHex
      // } catch (e) {
      //   resultElement.textContent = e
      // }
    })

    // input[type="color"] 实现拾色器
    const input = document.getElementById('color')
    input.addEventListener('input', function () {
      const color = input.value
      const span = document.getElementById('test1')
      span.style.backgroundColor = color
      span.innerText = color
    })
  })
</script>

## 参考

- [MDN - EyeDropper API](https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper)
