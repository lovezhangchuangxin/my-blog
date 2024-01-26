# husky（哈士奇 🐶）

[huksy](https://typicode.github.io/husky/) 是一个 git hook 工具，可以让我们很方便地在 git 提交的某些特定时机执行一些脚本，从而实现一些自动化的操作。[点我快速开始](#快速开始)

::: tip 官方原话

Husky enhances your commits and more 🐶 woof!

Automatically lint your commit messages, code, and run tests upon committing or pushing.

:::

比如，我们可以在代码提交之前执行 **单元测试**，**代码风格检查**，**规范提交消息**等等。

## 官网

[huksy](https://typicode.github.io/husky/)

有意思的是，在本文编写的前一天（2024/1/25），huksy 的版本从 v8 升到了 v9。

> 现在，将哈士奇添加到项目中比以往任何时候都要容易。不过虽然安装过程简单明了，但经常需要查阅文档。
>
> v8 版本只有 _6kB_，而 v9 版本只有 _3kB_，这可能是你项目中最小的开发依赖，huksy 项目中的最大的文件居然是 MIT 许可证！

本文介绍 v9 版本的安装和使用。

## 快速开始

第一步，先确保项目中使用了 git（版本大于 2.9）

```shell
git init
```

第二步，先在项目中安装依赖（建议使用 npm / pnpm）

> Git hooks might fail with Yarn on Windows using Git Bash

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# Add pinst ONLY if your package is not private
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

第三步，初始化 husky

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Due to specific caveats and differences with other package managers,
# refer to the How To section：https://typicode.github.io/husky/how-to.html
```

```shell [bun]
bunx husky init
```

:::

`husky init` 做了什么：

- 在 `package.json` 中添加了 prepare 脚本，每次安装依赖时都会执行 husky 命令，这样别人 clone 你的项目后就不需要再手动执行 `husky init` 了。
- 在 `./husky` 目录下添加了 `pre-commit` 文件，这是一个 git hook，每次提交代码时都会执行这个文件中的命令。

## 配置 git 钩子

常见的做法是在 `./husky` 目录中添加两个文件，`pre-commit` 和 `commit-msg`。

- `pre-commit` 钩子在 git commit 之前执行，可以用来检查代码风格、单元测试等等。

- `commit-msg` 钩子在保存提交消息时触发，可以用来检查提交消息是否符合规范。

比如：

```shell
# 注意，下面这些命令需要额外配置才能执行，此处仅作示例
# 创建 pre-commit 钩子
echo "pnpm lint" > .husky/pre-commit
echo "pnpm test" >> .husky/pre-commit

# 创建 commit-msg 钩子
echo 'pnpm exec commitlint --config commitlint.config.js --edit "${1}"' > .husky/commit-msg

```

看有的项目在 `package.json`中配置 git 钩子，但是**不知道是因为版本问题还是什么，我并没有实验成功**，如：

:::details package.json 中配置 husky

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "...",
      "commit-msg": "..."
    }
  }
}
```

:::

## 跳过 git 钩子

有时候，我们可能需要跳过 git 钩子，比如在使用 `git commit --amend` 时，我们不希望执行 `pre-commit` 钩子。

```shell
# -n 即 --no-verify
git commit --amend -n
```

跳过 git 钩子的方法还有很多，详情见 [https://typicode.github.io/husky/how-to.html#skipping-git-hooks](https://typicode.github.io/husky/how-to.html#skipping-git-hooks)
