# docker

## 安装

见[官方文档](https://docs.docker.com/engine/install/centos/)

## 镜像和容器

当我们利用 Docker 安装应用时，Docker 会自动搜索并下载应用镜像（image）。镜像不仅包含应用本身，还包含应用运行所需要的环境、配置、系统函数库。Docker 会在运行镜像时创建一个隔离环境，称为容器（container）。

镜像仓库：存储和管理镜像的平台，Docker 官方维护了一个公共仓库：DockerHub。

## 快速开始

以部署 `mysql` 为例：

```bash
docker run -d --name mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

- docker run：创建并运行一个容器，`-d` 参数表示在后台运行。
- `--name mysql`：给容器命名为 `mysql`。
- `-p 3307:3306`：设置端口映射：`宿主机端口：容器内端口`，将容器的 3306 端口映射到宿主机的 3307 端口。
- `-e MYSQL_ROOT_PASSWORD=123456`：设置环境变量，`-e key=value`。
- `mysql`：镜像名称

镜像命名规范：`repository:tag`，`tag` 默认为 `latest`。

## 常用命令

见名知意，实在不知道使用 `docker --help` 命令查看帮助。

- docker pull

- docker push

- docker save

- docker load

- docker build

- docker images

- docker rmi

- docker run

- docker logs [-f]

- docker ps [-a]

- docker rm

- docker stop

- docker start

- docker exec [-it]

## 数据卷

数据卷（volume）是一个虚拟目录，是容器内目录与宿主机目录之间的映射的桥梁。

`docker volume --help` 查看数据卷命令帮助。

执行 `docker run` 命令时，使用 `-v 数据卷:容器内目录`可以完成数据卷的挂载。
当创建容器时，如果挂载了数据卷而数据卷不存在，则会自动创建数据卷。

- create: Create a volume
- inspect: Display detailed information on one or more volumes
- ls: List volumes
- prune: Remove unused local volumes
- rm: Remove one or more volumes

`docker -v 本地目录:容器内目录` 可以完成本地目录挂载。其中本地目录必须以 / 或者 ./ 开头，否则会被识别为数据卷而非本地目录。

## Dockerfile

Dockerfile 是一个文本文件，用来配置镜像的构建过程。相关命令见[官方文档](https://docs.docker.com/reference/dockerfile/)。

```Dockerfile
# 设置基础镜像
FROM 镜像名:版本号

# 复制文件
COPY 源文件 目标文件

# 添加文件，会自动解压 tar 等文件（zip不会）
ADD 源文件 目标文件

# 运行命令
RUN 命令

# 指定工作目录
WORKDIR /usr/src/app

# 暴露端口
EXPOSE 80

# 设置环境变量
ENV NODE_ENV production

# 设置启动命令
ENTRYPOINT ["executable", "param1", "param2"]

# 设置默认参数
CMD [ "param1", "param2"]
```

根据 Dockerfile 文件构建镜像：`docker build -t 镜像名 Dockerfile所在目录`

**ENTRYPOINT 和 CMD**

- 有多个 ENTRYPOINT 或有多个 CMD 时，只有最后一个生效
- 如果使用了 ENTRYPOINT，CMD 会作为参数传递给 ENTRYPOINT
- 如果没有使用 ENTRYPOINT，CMD 会作为启动命令，但是可以被覆盖

## 网络

加入自定义网络的容器才可以通过容器名互相访问，Docker 的网络操作命令如下：

| 命令                      | 说明             |
| ------------------------- | ---------------- |
| docker network create     | 创建网络         |
| docker network connect    | 将容器连接到网络 |
| docker network disconnect | 将容器从网络断开 |
| docker network ls         | 列出网络         |
| docker network inspect    | 显示网络详细信息 |
| docker network rm         | 删除网络         |
| docker network prune      | 删除未使用的网络 |
