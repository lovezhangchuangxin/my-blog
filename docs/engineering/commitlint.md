# Commitlint

[Commitlint](https://commitlint.js.org/) 是一个帮助我们检查提交信息（git message）是否符合规范的工具。

回顾一下 [Commitizen](/engineering/commitizen)，Commitizen 只是帮助我们编写规范的提交信息，我们可以不按 Commitizen 的标准来，强行提交不规范的消息。Commitlint 则负责检查提交信息，并拒绝不规范的提交。

一般 Commitlint 和 Commitizen 一起配合使用。

## 安装

如果没有配置 huksy，请先到[这里](/engineering/husky)。

```shell
# 安装 commitlint 和 常规配置
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# 创建 commitlint 配置文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# 添加钩子
echo 'npx --no -- commitlint --edit "${1}"' > .husky/commit-msg
```

## 测试

如果有过提交，执行下面命令测试最近一次提交是否符合规范：

```shell
npx commitlint --from HEAD~1 --to HEAD --verbose
```

> Since v8.0.0 commitlint won't output anything if there are no problems with your commit.
> (You can use the `--verbose` flag to get positive output)

## 自定义规则

一般情况下，没有必要自定义。如果需要，可以参考[https://commitlint.js.org/#/reference-configuration](https://commitlint.js.org/#/reference-configuration)
