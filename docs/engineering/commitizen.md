# Commitizen 和 Commitlint

[Commitizen](https://github.com/commitizen/cz-cli) 是一个帮助我们编写规范的提交信息（git message）的工具。

> 当我们通过 Commitizen 提交代码时，系统会提示您在提交时填写所有必要的提交字段。您无需再等待 git 提交钩子运行并拒绝您的提交（尽管这仍然有用），也不必再翻阅 CONTRIBUTING.md 来查找首选格式。

规范的提交信息要遵循一定的规范，Commitizen 正是帮助我们按规范编写提交信息的工具。至于具体用什么规范，这就是适配器（adapter）要做的什么。

使用 Commitizen，我们要同时安装 Commitizen 命令行工具和适配器。

## 安装

1. 安装 Commitizen 命令行工具：

```shell
npm install commitizen -D
```

2. 选择一个适配器安装：

```shell
npm install cz-conventional-changelog -D
```

3. 在 `package.json` 中添加配置：

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

接下来我们就可以使用 `npm run commit` 命令来代替 `git commit` 命令了。

如果全局安装了 `commitizen`，则可以直接使用 `git cz` 命令。否则需要借助 npx 或者像上面那样在 `package.json` 中配置 `commit` 命令。

## 使用

![commitizen的使用](/images/commitizen-use.png)

- 使用上下键选择提交类型，然后按回车键确认。
- 填写 `scope`，如果不需要，直接按回车键跳过。
- 填写 `subject`，这是必填项，否则无法提交。
- 填写 `body`，如果不需要，直接按回车键跳过。
- 是否有 `breaking change`，如果不需要，直接按回车键跳过。
- 是否有关 `issues`，如果不需要，直接按回车键跳过。
- 如果想要中止提交，可以按 `ctrl + c`。

## 进阶

根据上述步骤配置后，我们使用了 `npm run commit` 或者 `git cz` 来代替了 `git commit`，这可能让不熟悉 Commitizen 的人感觉困惑和不适，他们可能更习惯直接使用 `git commit`。幸运的是，借助于 git 钩子，我们可以在 `git commit`之前执行 Commitizen 命令行工具。

下面借助了 husky 来配置 git 钩子，如果还没有配置 husky，可以参考[这里](/engineering/husky)。

```shell
echo "exec < /dev/tty && npx cz --hook || true" > .husky/prepare-commit-msg
```

然后直接使用 `git commit` 命令即可。但是笔者在实验时发现这种方式的交互式界面可能会有点问题（Windows），因此建议还是用 `npm run commit` 或者 `git cz`。

## 更多适配器

- [cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog)

更多见[官网](https://github.com/commitizen/cz-cli?tab=readme-ov-file#adapters)
