# 第 1 天 Rust 初体验

> Rust 是可以让每个人构建可靠和高效的软件的编程语言。

## 为什么使用 Rust

- Rust 速度很快并且内存高效：没有运行时或垃圾收集器，它可以支持性能关键的服务，运行在嵌入式设备上，并且容易与其他语言集成。
- Rust 的丰富类型系统和所有权模型确保内存安全和线程安全 —— 让您能在编译时消除许多类型的错误。
- Rust 拥有出色的文档，友好的编译器以及有用的错误消息，并且顶尖的工具支持 —— 集成的包管理器和构建工具，智能的多编辑器支持，具有自动完成和类型检查，自动格式化等功能。

## 安装 Rust

在官网安装 rustup。rustup 是 Rust 的安装器和版本管理器。如果 Rust 的版本过时了，可以使用 rustup 更新。

```bash
rustup update

# 查看离线文档
rustup docs --book
```

rustup 安装后自带 Cargo，Cargo 是 Rust 的构建工具和包管理器。

通过 `cargo --version` 和 `rustc --version` 查看 Cargo 和 Rust 的版本。

```bash
cargo --version
rustc --version
```

如何在 VSCode 中写 Rust？安装 Rust 插件 `rust-analyzer`。

## 第一个 Rust 程序

1. 创建一个新的 Rust 项目。

```bash
cargo new hello-rust
```

2. 进入项目目录。

```bash
cd hello-rust
```

3. 打开 `src/main.rs` 文件，编写 Rust 代码。

```rust
fn main() {
    println!("Hello, Rust!");
}
```

4. 构建并运行项目。

```bash
cargo run
```

可以看到控制台输出了 `Hello, Rust!`。

## 安装依赖

可以通过 `cargo add` 命令添加依赖。

```bash
cargo add ferris-says
```

也可以先在 `Cargo.toml` 文件中添加依赖。

```toml
[dependencies]
ferris-says = "0.3.1"
```

然后通过 `cargo build` 构建项目，Cargo 会自动下载依赖。

```bash
cargo build
```

在 `src/main.rs` 文件中使用依赖。

```rust
use ferris_says::say; // from the previous step
use std::io::{stdout, BufWriter};

fn main() {
    let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();

    let mut writer = BufWriter::new(stdout.lock());
    say(&message, width, &mut writer).unwrap();
}
```

运行项目。

```bash
cargo run
```

控制台输出：

```
  ______________________
< Hello fellow Rustaceans! >
  ----------------------
          \
          \
              _~^~^~_
          \) /  o o  \ (/
            '_   -   _'
            / '-----' \
```

## Cargo 基础命令

通过 `cargo --help` 可以查看 Cargo 的帮助信息。

- `cargo new hello_cargo`：创建一个新的 Rust 项目。
- `cargo build`：构建项目。
- `cargo build --release`：构建项目并优化。
- `cargo run`：构建并运行项目。
- `cargo check`：检查项目是否可以编译。
- `cargo test`：测试项目。
- `cargo doc`：生成项目文档。
- `cargo publish`：发布项目到 crates.io。
- `cargo add`：添加依赖。
- `cargo remove`：移除依赖。
- `cargo update`：更新依赖。

## 参考

- [Rust 官网](https://www.rust-lang.org/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Rust 中文书](https://kaisery.github.io/trpl-zh-cn/)
- [Rust 社区仓库](https://crates.io/)
