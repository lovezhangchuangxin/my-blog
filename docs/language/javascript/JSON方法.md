# JSON 方法

JSON（JavaScript Object Notation）是表示值和对象的通用格式，是一种轻量级的数据交换格式。在 JavaScript 中，有个名为 `JSON` 的全局对象用来处理 JSON 数据，其中有两个方法：

- `JSON.stringify()`：将对象转换为 JSON 字符串
- `JSON.parse()`：将 JSON 字符串转换为对象

## JSON 数据格式规范

- JSON 中没有单引号，反引号和注释。
- 对象的属性名必须带有双引号。

## JSON.stringify

语法：`let json = JSON.stringify(value[, replacer, space])`

- `value`：要编码的值。
- `replacer`：要编码的属性数组或映射函数 function(key, value)。
- `space`：用于格式化的空格数量。

`JSON.stringify` 支持以下数据类型：

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives：
  - strings，
  - numbers，
  - boolean values `true/false`，
  - `null`

```js
// 数字在 JSON 还是数字
alert(JSON.stringify(1)) // 1

// 字符串在 JSON 中还是字符串，只是被双引号扩起来
alert(JSON.stringify('test')) // "test"

alert(JSON.stringify(true)) // true

alert(JSON.stringify([1, 2, 3])) // [1,2,3]
```

JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 `JSON.stringify` 跳过：

- 函数属性（方法）。
- Symbol 类型的键和值。
- 存储 undefined 的属性。

```js
let user = {
  sayHi() {
    // 被忽略
    alert('Hello')
  },
  [Symbol('id')]: 123, // 被忽略
  abc: Symbol('abc'), // 被忽略
  something: undefined, // 被忽略
}

alert(JSON.stringify(user)) // {}（空对象）
```

### 使用 replacer

如果对象循环引用或者我们不想编码某些属性怎么办？这时候可以用到第二个参数 `replacer`。

`replacer` 如果是数组，则仅有数组中的属性被编码。

```js
const father = {
  name: 'father',
}

const son = {
  name: 'son',
  father,
}

father.son = son

// JSON.stringify(father) // TypeError: Converting circular structure to JSON
JSON.stringify(father, ['name', 'son']) // '{"name":"father","son":{"name":"son"}}'
```

`replacer` 如果是函数，则会获取每个键/值对，包括嵌套对象和数组项，然后自行控制该替换的值。

```js
const father = {
  name: 'father',
}

const son = {
  name: 'son',
  father,
}

father.son = son

JSON.stringify(father, (key, value) => {
  if (key === 'father') {
    return undefined
  }
  return value
}) // '{"name":"father","son":{"name":"son"}}'
```

`replacer` 普通函数（非箭头函数）中的 `this` 的值是包含当前属性的对象。

```js
const obj = {
  a: 1,
  b: {
    c: 2,
  },
}

JSON.stringify(obj, function (key, value) {
  console.log(this[key] === value) // true
  return value
})
```

### 格式化：space

`JSON.stringify(value, replacer, spaces)` 的第三个参数是用于优化格式的空格数量，一般用于调试时输出更美观的 JSON 字符串。

```js
let user = {
  name: 'John',
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
}

alert(JSON.stringify(user, null, 2))
/* 两个空格的缩进：
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/
```

### 自定义 `toJSON`

像 `toString` 进行字符串转换，对象也可以提供 `toJSON` 方法来进行 JSON 转换。如果可用，`JSON.stringify` 会自动调用它。

```js
const obj = {
  a: 1,
  toJSON() {
    return 'Hello'
  },
}

JSON.stringify(obj) // "Hello"
```

## JSON.parse

语法：`let value = JSON.parse(str, [reviver]);`

- `str`：要解析的 JSON 字符串。
- `reviver`：可选的函数 function(key,value)，该函数将为每个 (key, value) 对调用，并可以对值进行转换。

```js
// 字符串化数组
let numbers = '[0, 1, 2, 3]'

numbers = JSON.parse(numbers)

alert(numbers[1]) // 1
```

### 使用 reviver

当我们想要对解析出的值进行转换时，可以使用第二个参数 `reviver`。

```js
const str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

const meetup = JSON.parse(str, function (key, value) {
  if (key === 'date') return new Date(value)
  return value
})

meetup.date.getDate() // 30
```

## 手写一个简易的 JSON.stringify

```js
function myJsonStringify(obj) {
  const type = typeof obj
  if (type === 'undefined' || type === 'symbol' || type === 'function') return
  if (type === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt')
  }
  if (type !== 'object') return '' + obj
  if (obj === null) return 'null'
  if (typeof obj.toJSON === 'function') return myJsonStringify(obj.toJSON())
  if (obj instanceof Array) {
    return `[${obj.map((val) => myJsonStringify(val) || null).join(',')}]`
  }
  return `{${Object.keys(obj)
    .map((key) => {
      let val = obj[key]
      if (['function', 'symbol', 'undefined'].includes(typeof val)) return
      return `"${key}":${myJsonStringify(val)}`
    })
    .filter(Boolean)
    .join(',')}}`
}
```

## eval 实现 JSON.parse

在不支持 `JSON` 的旧浏览器中，可以考虑使用 `eval` 来解析 JSON。

```js
let numbers = '[0, 1, 2, 3]'

function parseJson(str) {
  return eval(`(${str})`)
}

numbers = parseJson(numbers) // [0, 1, 2, 3]
```

需要在 json 字符串前后加上括号，否则 `{...}` 会被当作代码块而不是对象。

## 总结

- JSON 是一种数据格式，具有自己的独立标准和大多数编程语言的库。
- JSON 支持 object，array，string，number，boolean 和 `null`。
- JavaScript 提供序列化（serialize）成 JSON 的方法 `JSON.stringify` 和解析 JSON 的方法 `JSON.parse`。
- 这两种方法都支持用于智能读/写的转换函数。
- 如果一个对象具有 toJSON，那么它会被 `JSON.stringify` 调用。

## 参考

- [现代 JavaScript 教程](https://zh.javascript.info/json)
