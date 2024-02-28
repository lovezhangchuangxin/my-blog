# Maven

Maven 是 Apache 旗下的一个开源项目，是一款用于管理和构建 Java 项目的工具。基于项目对象模型（POM），通过一小段描述信息来管理项目的构建。

Maven 的作用：

- 依赖管理
- 统一项目结构
- 项目构建

## 坐标

Maven 通过坐标来唯一标识一个项目，坐标由三部分组成：groupId、artifactId、version。

- groupId：项目组织标识
- artifactId：项目唯一标识
- version：项目版本

```xml
<groupId>com.example</groupId>
<artifactId>demo</artifactId>
<version>1.0.0</version>
```

## 依赖管理

排除依赖

```xml{5-10}
<dependency>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>1.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

依赖范围

依赖的 jar 包默认情况下可以在任何地方使用，可以通过 `<scope>...</scope>` 设置其作用范围。

- compile：默认范围，适用于所有阶段
- test：测试范围，只在测试程序有效
- provided：主程序有效，测试程序有效，不参与打包
- runtime：主程序无效，测试程序有效，参与打包

## 生命周期

Maven 有三套相互独立的生命周期：clean、default、site。

- clean：清理项目
- default：核心工作，如：编译、测试、打包、安装、部署等
- site：生成报告，发布站点

每套生命周期包含一些阶段，阶段是有顺序的，后面的阶段依赖前面的阶段。

常见的生命周期阶段：

- clean：移除上一次构建生成的文件
- compile：编译项目的源代码
- test：测试项目的编译代码
- package：将编译的文件打包，如：jar、war
- install：安装项目到本地仓库

在 idea 中，右侧的 maven 工具栏，选中对应的生命周期，双击执行。
