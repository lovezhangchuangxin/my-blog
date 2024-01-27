# BFC（区块格式化上下文）

> 区块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

简单来说，**BFC 是一个独立的渲染区域**，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

## 如何创建 BFC

见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)。

## BFC 特性

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（合并）。
3. 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触（对于从左往右的格式化，否则相反）。
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
6. 计算 BFC 的高度时，浮动元素也参与计算。

举例说明上述特性：

### 垂直方向的元素排列

<style>
  .box1 {
    width: 100px;
    height: 100px;
    background-color: #f00;
    margin-bottom: 10px;
  }
</style>
<div style="backgroundColor: pink">
  <div class="box1"></div>
  <div class="box1"></div>
</div>

```html
<style>
  .box1 {
    width: 100px;
    height: 100px;
    background-color: #f00;
    margin-bottom: 10px;
  }
</style>
<div style="backgroundColor: pink">
  <div class="box1"></div>
  <div class="box1"></div>
</div>
```

上述代码中，两个 `div` 元素都处于同一个 BFC 容器中，因此会垂直排列。

### 相邻的 margin 重叠

<style>
  .box2 {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
  .box2:first-child {
    background-color: green;
    margin-bottom: 10px;
  }
  .box2:last-child {
    margin-top: 30px;
  }
</style>
<div style="backgroundColor: pink">
  <div class="box2"></div>
  <div class="box2"></div>
</div>

```html
<style>
  .box2 {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
  .box2:first-child {
    background-color: green;
    margin-bottom: 10px;
  }
  .box2:last-child {
    margin-top: 30px;
  }
</style>
<div style="backgroundColor: pink">
  <div class="box2"></div>
  <div class="box2"></div>
</div>
```

上述代码中，两个 `div` 元素都处于同一个 BFC 容器中，因此会发生 margin 重叠。上面的 `div` 元素的 margin-bottom 为 10px，下面的 `div` 元素的 margin-top 为 30px，因此最终两个 `div` 元素的 margin 为两者中最大的值，即 30px。

## 解决外边距塌陷问题

外边距塌陷是指两个块级元素垂直方向的外边距重叠，使得外边距的表现与预期不符。

1. 两个相邻元素的 margin 重叠，见上例。这时候可以只给其中一个元素设置 margin。

2. 父元素和第一个子元素，或者最后一个子元素的 margin 重叠。这时候可以给父元素设置 `padding` 或 `border`，或者让父元素变成 BFC。

<style>
  .box3 {
    width: 300px;
    height: 200px;
    background-color: #f00;
    margin-top: 10px;
  }
  .box3-child {
    width: 200px;
    height: 100px;
    background-color: green;
    margin-top: 20px;
  }
</style>
<div style="backgroundColor: pink">
我想与下面的盒子相距 10px，却因为下面的位置外边距塌陷导致距离 20px
</div>
<div class="box3">
  <div class="box3-child">
    我想要和父盒子距离 20px，但是我的 margin-top 却被父盒子的 margin-top 吸收了
  </div>
</div>

```html
<style>
  .box3 {
    width: 300px;
    height: 200px;
    background-color: #f00;
    margin-top: 10px;
  }
  .box3-child {
    width: 200px;
    height: 100px;
    background-color: green;
    margin-top: 20px;
  }
</style>
<div style="backgroundColor: pink">
  我想与下面的盒子相距 10px，却因为下面的位置外边距塌陷导致距离 20px
</div>
<div class="box3">
  <div class="box3-child">
    我想要和父盒子距离 20px，但是我的 margin-top 却被父盒子的 margin-top 吸收了
  </div>
</div>
```

此时给父盒子设置 `padding` 或 `border`可以解决问题，或者让父盒子变成 BFC，比如给父盒子设置 `overflow: hidden`。

<style>
  .box3 {
    width: 300px;
    height: 200px;
    background-color: #f00;
    margin-top: 10px;
  }
  .box3-child {
    width: 200px;
    height: 100px;
    background-color: green;
    margin-top: 20px;
  }
</style>
<div style="backgroundColor: pink">
我想与下面的盒子相距 10px
</div>
<div class="box3" style="overflow: hidden">
  <div class="box3-child">
    我想要和父盒子距离 20px
  </div>
</div>
