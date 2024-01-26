# EditorConfig

我们经常在开源项目中看到一个名为 `.editorconfig` 的文件，它的作用是什么呢？我们先看 EditorConfig 的[官方介绍](https://editorconfig.org/)：

> EditorConfig 可帮助多个开发人员在不同的编辑器和集成开发环境中为同一项目保持一致的编码风格。EditorConfig 项目包括一个用于定义编码风格的文件格式和一系列文本编辑器插件，这些插件可使编辑器读取文件格式并遵循定义的风格。EditorConfig 文件易于读取，并可与版本控制系统完美配合。

也就是说，EditorConfig 可以帮助我们在不同的编辑器和 IDE 之间定义和维护一致的代码风格。它由两部分组成：

- .editorconfig 文件，它规定了项目的代码风格
- EditorConfig 插件，它使得编辑器可以读取 .editorconfig 文件，并且遵循其中定义的代码风格

一些编辑器和 IDE 默认支持 EditorConfig，比如 IntelliJ IDEA、WebStorm、VisualStudio、Pycharm 等等。

对于不支持 EditorConfig 的编辑器（Vs Code 等等），安装对应的插件即可。（比如 Vs Code 的扩展商店中搜索 EditorConfig，选安装次数最多的安装即可）

## 例子

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

## 文件读取规则

打开文件时，EditorConfig 插件会在打开文件的目录和每个父目录中查找名为 .editorconfig 的文件。如果到达根文件路径或找到 `root=true` 的 `.editorconfig` 文件，才会停止搜索。

然后，`.editorconfig` 文件自上而下读取，最新发现的规则优先。匹配的 EditorConfig 部分中的属性会按读取顺序应用，因此较近文件中的属性优先。

## 文件格式

> - `.editorconfig` 文件使用的 INI 格式与 Python ConfigParser Library 使用的格式兼容，但部分名称中允许使用 [ 和 ]。部分名称是文件路径全局（区分大小写），与 gitignore 接受的格式类似。
> - 路径分隔符只能使用正斜杠（/，不能使用反斜杠）。
> - 注释使用八分音符（#）或分号（;）。注释应独立成行。
> - `.editorconfig` 文件应采用 UTF-8 编码，并使用 CRLF 或 LF 作为行分隔符。

## 通配符

| 特殊字符       | 匹配                                                      |
| -------------- | --------------------------------------------------------- |
| \*             | 任意字符串，路径分割符 `/` 除外                           |
| \*\*           | 任意字符串                                                |
| ?              | 任意单个字符                                              |
| [name]         | 匹配 `name` 中的任意单个字符                              |
| [!name]        | 匹配不在 `name` 中的任意单个字符                          |
| \{s1,s2,s3\}   | 匹配给定的字符串（以逗号分隔）                            |
| \{num1..num2\} | 匹配给定范围内的数字，num1 和 num2 可以是正数也可以是负数 |

特殊字符可以用反斜杠转义，这样就不会被解释为通配符。

## 属性

- root: 特殊属性，应在文件顶部指定。设置为 true 时，将停止在当前文件搜索 .editorconfig 文件。
- indent_style: 设置缩进风格，可选值为 tab 或 space。
- indent_size: 设置缩进大小，整数值。
- tab_width: 一个整数，用于定义表示制表符的列数。默认值为 indent_size 的值，通常无需指定。
- end_of_line: 设置换行符，可选值为 lf、cr 和 crlf。
- charset: 设置编码，可选值为 latin1、utf-8、utf-8-bom、utf-16be 和 utf-16le。
- trim_trailing_whitespace: 设置为 "true "可移除换行符前的空白字符，设置为 "false "可确保不移除换行符前的空白字符。
- insert_final_newline: 设置为 "true "可确保文件以换行符结束，设置为 "false "可确保文件不以换行符结束。

> 目前，所有属性和值都不区分大小写。它们在解析时都是小写。一般来说，如果未指定属性，将使用编辑器设置，即 EditorConfig 对该部分无效。
>
> 对于任何属性，如果值为 unset，则会删除该属性的效果，即使之前已经设置过。例如，添加 `indent_size = unset` 可取消对 indent_size 属性的定义（并使用编辑器默认值）。
