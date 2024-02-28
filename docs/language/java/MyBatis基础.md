# MyBatis

MyBatis 是一款优秀的持久层框架，用于简化 JDBC 的开发。

MyBatis 本是 Apache 的一个开源项目 iBatis，2010 年这个项目由 apache 迁移到了 google code，并且改名为 MyBatis。2013 年 11 月迁移到 Github。

## 快速入门

使用 Mybatis 查询所有用户数据：

1. 准备工作（创建 springboot 工程、数据库表 user、实体类 User）

   创建 springboot 工程时选上 mybatis 框架和 mysql 驱动。

   ```java
   @Data
   public class User {
       private Integer id;
       private String username;
       private String password;
       private String name;
       private Integer age;
   }
   ```

2. 引入 Mybatis 的相关依赖，配置 Mybatis（数据库连接信息）

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/test
   spring.datasource.username=root
   spring.datasource.password=root
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   ```

3. 编写 SQL 语句（注解/XML）

   ```java
   public interface UserMapper {
       @Select("select * from user")
       public List<User> findAll();
   }
   ```

## 配置输出日志

```properties
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

## JDBC

JDBC：（Java Data Base Connectivity），就是使用 Java 语言操作关系型数据库的一套 APl。

JDBC 本质是一套接口，由各个数据库厂商去实现（数据库驱动），提供给 Java 程序员使用。

## 数据库连接池

- 数据库连接池是个容器，负责分配、管理数据库连接(Connection)
- 它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个
- 释放空闲时间超过最大空闲时间的连接，来避免因为没有释放连接而引起的数据库连接遗漏

优势：

- 资源重用
- 提升系统响应速度
- 避免数据库连接遗漏

标准接口：DataSource

- 获取连接：getConnection()

常见的数据库连接池：C3P0、Druid、DBCP、Hikari（SpringBoot 默认）

Druid（德鲁伊）是阿里巴巴开源的一个数据库连接池，功能强大，性能优秀，是 Java 语言最好的数据库连接池之一。

## 基础操作

### 查询

查询所有：

```java
public interface UserMapper {
    @Select("select * from user")
    public List<User> findAll();
}
```

指定条件查询：

```java
public interface UserMapper {
    @Select("select * from user where id = #{id}")
    public User findById(Integer id);
}
```

条件查询：

```java
public interface UserMapper {
    @Select("select * from emp where name like concat('%', #{name}, '%') and gender = #{gender} and "
            + "age between #{minAge} and #{maxAge} order by update_time desc")
    public User list(String name, Short gender, Integer minAge, Integer maxAge);
}
```

### 删除

```java
public interface UserMapper {
    @Delete("delete from user where id = #{id}")
    public void delete(Integer id);
}
```

`#{}` 底层使用预编译的 SQL 语句，防止 SQL 注入。使用时机：如果对参数进行动态设置时使用。
`${}` 底层使用拼接 SQL 语句，不安全。使用时机：果对表名、列表进行动态设置时使用。

### 插入

```java
public interface UserMapper {
    @Insert("insert into user(username, password, name, age) values(#{username}, #{password}, #{name}, #{age})")
    public void insert(User user);
}
```

主键返回：

```java
@Options(useGeneratedKeys = true, keyProperty = "id")
@Insert("insert into user(username, password, name, age) values(#{username}, #{password}, #{name}, #{age})")
public void insert(User user);
```

自动将生成的主键值赋值给实体类的 id 属性。

### 更新

```java
public interface UserMapper {
    @Update("update user set username = #{username}, password = #{password}, name = #{name}, age = #{age} where id = #{id}")
    public void update(User user);
}
```

### 数据封装

- 实体类属性名和数据库表查询返回的字段名一致，mybatis 会自动封装。
- 如果实体类属性名和数据库表查询返回的字段名不一致，不能自动封装。

解决方案：

1. 起别名：在SQL语句中，对不一样的列名起别名，别名和实体类属性名一样。

   ```java
   @Select("select update_time updateTime, create_time createTime from user")
   public List<User> findAll();
   ```

2. 手动结果映射：通过 `@Results` 及 `@Result` 进行手动结果映射。

   ```java
   @Results(id = "userMap", value = {
       @Result(column = "update_time", property = "updateTime"),
       @Result(column = "create_time", property = "createTime")
   })
   @Select("select * from user")
   public List<User> findAll();
   ```

3. 开启驼峰命名：如果字段名与属性名符合驼峰命名规则，mybatis 会自动通过驼峰命名规则映射。

   ```properties
   mybatis.configuration.map-underscore-to-camel-case=true
   ```

## XML 映射文件

- XML映射文件的名称与 Mapper 接口名称一致，并且将XML映射文件和 Mapper 接口放置在相同包下（同包同名）。
- XML映射文件的 namespace 属性为 Mapper 接口全限定名一致。
- XML映射文件中 sql 语句的 id 与 Mapper 接口中的方法名一致，并保持返回类型（单条记录的类型）一致。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.mapper.UserMapper">
    <select id="findAll" resultType="com.example.demo.entity.User">
        select * from user
    </select>
</mapper>
```

```java
package com.example.demo.mapper;

public interface UserMapper {
    public List<User> findAll();
}
```

## 动态 SQL

### if

`<if>`：用于判断条件是否成立。使用 test 属性进行条件判断，如果条件为 true，则拼接 SQL。
`<where>`：where 元素只会在子元素有内容的情况下才插入 where 子句。而且会自动去除子句的开头的 AND 或 OR。

```xml
<select id="list" resultType="com.example.demo.entity.User">
    select * from user
    <where>
        <if test="name != null and name != ''">
            name like concat('%', #{name}, '%')
        </if>
        <if test="gender != null">
            and gender = #{gender}
        </if>
    </where>
</select>
```

### set

`<set>`：动态地在行首插入 SET 关键字，并会删掉额外的逗号。（用在 update 语句中）

```xml
<update id="update" parameterType="com.example.demo.entity.User">
    update user
    <set>
        <if test="username != null">
            username = #{username},
        </if>
        <if test="password != null">
            password = #{password},
        </if>
        <if test="name != null">
            name = #{name},
        </if>
        <if test="age != null">
            age = #{age},
        </if>
    </set>
    where id = #{id}
</update>
```

### foreach

`<foreach>`：用于遍历集合或数组，生成对应的 SQL 语句。

```xml
<select id="findByIds" resultType="com.example.demo.entity.User">
    select * from user
    <where>
        <foreach collection="ids" item="id" separator="or" open="(" close=")">
            id = #{id}
        </foreach>
    </where>
</select>

<select id="deleteByIds">
    delete from user where id in
    <foreach collection="ids" item="id" separator="," open="(" close=")">
        #{id}
    </foreach>
</select>
```

### sql 和 include

`<sql>`：定义可重用的 SQL 片段。
`<include>`：通过属性 refid，指定包含的 sql 片段。

```xml
<sql id="columns">
    select id, username, password, name, age from user
</sql>

<select id="findAll" resultType="com.example.demo.entity.User">
    <include refid="columns"/>
</select>
```
