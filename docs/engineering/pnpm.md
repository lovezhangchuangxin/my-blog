# pnpm

[pnpm](https://pnpm.io/zh) 即 performant npm（高性能 npm），它是一个**快速的，节省磁盘空间**的包管理工具。

官网原话：

> 使用 npm 时，依赖每次被不同的项目使用，都会重复安装一次。 而在使用 pnpm 时，依赖会被存储在内容可寻址的存储中，所以：
>
> - 如果你用到了某依赖项的不同版本，只会将不同版本间有差异的文件添加到仓库。 例如，如果某个包有100个文件，而它的新版本只改变了其中1个文件。那么 pnpm update 时只会向存储中心额外添加1个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。
> - 所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。 这允许你跨项目地>共享同一版本的依赖。
>
> 因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

总结起来就是：pnpm 可以**复用依赖，增量更新**。

## 安装

```bash
npm install -g pnpm
```

安装好后使用 `pnpm -v` 查看 pnpm 版本号。

在 Powershell (Windows) 中添加永久别名：

```powershell
echo "set-alias -name pn -value pnpm" > $profile.AllUsersAllHosts
```

重启 powershell，即可使用 `pn` 命令。注意：配置的是 powershell， cmd 中是无法使用 `pn` 命令。

## 基础

默认情况下，pnpm 使用符号链接（symbolic link，也叫软链接）将项目的直接依赖项添加到模块目录的根目录中。直接依赖的实际位置在
`.pnpm/<name>@<version>/node_modules/<name>`，依赖包中的每个文件再硬链接（hard link）到.pnpm-store ( pnpm 资源在磁盘上的存储位置 )

![基于pnpm的node_modules结构](/images/pnpm/node_modules.svg)

`pnpm store path` 查看 pnpm store 的位置。

## 简单命令

| npm 命令        | pnpm 等效          |
| --------------- | ------------------ |
| npm install     | pnpm install       |
| npm i \<pkg\>   | [pnpm add \<pkg\>] |
| npm run \<cmd\> | [pnpm \<cmd\>]     |

## 配置

pnpm 使用 npm 的配置 格式。 因此，您设置配置的方式应该与 npm 相同。 例如，

```
pnpm config set store-dir /path/to/.pnpm-store
```

如果没有配置 store ，那么pnpm 将自动在同一磁盘上创建 store。

pnpm 使用与 npm 相同的配置进行安装。 如果您有一个私有源并且 npm 被配置使用它， pnpm 应该不需要额外的配置也能够授权请求。

## 依赖管理

- `pnpm add \<pkg\>`

  | Command            | Meaning                     |
  | ------------------ | --------------------------- |
  | pnpm add sax       | 保存到 dependencies         |
  | pnpm add -D sax    | 保存到 devDependencies      |
  | pnpm add -O sax    | 保存到 optionalDependencies |
  | pnpm add -g sax    | Install package globally    |
  | pnpm add sax@next  | 从 next 标签下安装          |
  | pnpm add sax@3.0.0 | 安装指定版本 3.0.0          |

- `pnpm install（i）`

  用于安装项目所有依赖。在CI环境中, 如果存在需要更新的 lockfile 会安装失败。

- `pnpm update（up）`

  根据指定的范围更新软件包的最新版本。在不带参数的情况下使用时，将更新所有依赖关系。可以使用 Pattern 来更新特定的依赖项。

- `pnpm remove（rm，uninstall，un）`

  从 node_modules 和项目的 package.json 中删除相关 packages。

- `pnpm import`

  pnpm import 从另一个软件包管理器的 lock 文件生成 pnpm-lock.yaml。 支持的源文件：

  - package-lock.json
  - npm-shrinkwrap.json
  - yarn.lock

- `pnpm prune`

  移除不需要的 packages。

## 查看依赖

- `pnpm list(ls)`

  以一个树形结构输出所有的已安装package的版本及其依赖。加 `-g` 则列出在全局安装目录的package。

- `pnpm outdated`

  检查过期的 packages。

## 发布包

`pnpm publish`

## 管理 node 版本

可实现 nvm、n 等 node 版本管理工具，安装并切换 node.js 版本的功能。

- 本地安装并使用：`pnpm env use <node版本号>`

- 全局安装并使用：`pnpm env use --global <node版本号>`
