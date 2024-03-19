# Typescript 相关面试题

## 1. type 和 interface 的区别

- interface 只能用于声明对象类型，而 type 还可以声明基本类型、联合类型、交叉类型等
- interface 声明会合并，而 type 不行
- interface 可以通过 `extends` 关键字继承，而 type 则是通过 `&` 运算符实现交叉类型
- type 可以通过 `typeof` 获取实例的类型，而 interface 不行

## 2. 什么是键重映射

在 TypeScript 4.1 及以后版本中，您可以使用映射类型中的 as 子句重新映射映射类型中的键：

```typescript
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties]
}
```
