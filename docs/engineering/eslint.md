# ESlint

[官方文档](https://eslint.org/)，[中文文档](https://eslint.nodejs.cn/)

> ESLint 是一个可配置的 JavaScript 检查器。它可以帮助你发现并修复 JavaScript 代码中的问题。问题可以是任何东西，从潜在的运行时错误，到未遵循最佳实践，再到代码风格问题。

## 核心概念

### 规则

规则是 ESLint 的核心构件。一条规则可以验证代码是否符合特定要求，以及如果代码不符合该要求该如何处理。规则还可以包含特定于该规则的附加配置选项。

### 规则修复 🔧

规则可以有选择地为其发现的违规行为提供修正。修复程序要安全地纠正违规行为，而无需更改应用程序逻辑。可使用 --fix 命令行选项或通过编辑器扩展自动应用修复。

### 规则建议 💡

除提供修复外，规则还可选择提供建议。建议与修复有两点不同：

- 建议可能会改变应用逻辑，因此无法自动应用。
- 建议不能通过 ESLint CLI 应用，只能通过编辑器集成使用。

### 配置文件

ESLint 配置文件是您在项目中放置 ESLint 配置的地方。您可以在其中加入内置规则、执行规则的方式、带有自定义规则的插件、可共享的配置、希望规则应用于哪些文件等。

### 可共享的配置

可共享配置是通过 npm 共享的 ESLint 配置。例如，可共享配置 eslint-config-airbnb-base 实现了流行的 Airbnb JavaScript 风格指南。

### 插件

ESLint 插件是一个 npm 模块，可以包含一组 ESLint 规则、配置、处理器和环境。插件通常包含自定义规则。插件可用于执行样式指南，并支持 JavaScript 扩展（如 TypeScript）、库（如 React）和框架（Angular）。

### 解析器

ESLint 解析器将代码转换为 ESLint 可以评估的抽象语法树。默认情况下，ESLint 使用内置的 Espree 解析器，它与标准的 JavaScript 运行时和版本兼容。

自定义解析器让 ESLint 解析非标准的 JavaScript 语法。自定义解析器通常包含在可共享配置或插件中，因此你不必直接使用它们。

例如，[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 是一个包含在 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 项目中的自定义解析器，它可以让 ESLint 解析 TypeScript 代码。

### 自定义处理器

ESLint 处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对 JavaScript 代码进行校验。或者，在使用 ESLint 解析 JavaScript 代码之前，也可以使用处理器对其进行处理。

例如，[eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) 包含一个自定义处理器，可以让你检查 Markdown 代码块中的 JavaScript 代码。
