# SpringBoot 基础

## 请求数据

注解速览：

- `@RequestMapping`
- `@RequestParam`
- `@RequestBody`
- `@PathVariable`
- `@DateTimeFormat`

### RequestMapping

`@RequestMapping` 注解是一个用来处理请求地址映射的注解，可用于类或方法上。用在类上可以表示类中的所有响应请求的方法都是以该地址作为父路径。

- `value`：指定请求的实际地址，指定的地址可以是 URI Template 模式。
- `method`：指定请求的类型，GET、POST、PUT、DELETE 等。

```java
@RequestMapping(value = "/simple", method = RequestMethod.GET)
```

`@RequestMapping` 的衍生注解：

- `@GetMapping`：GET 请求
- `@PostMapping`：POST 请求
- `@PutMapping`：PUT 请求
- `@DeleteMapping`：DELETE 请求

### 简单参数

原始方式：通过 `HttpServletRequest` 获取参数，需要手动转换类型。

```java
@RequestMapping("/simple")
public String simple(HttpServletRequest request) {
    // 拿到的请求参数全是字符串，需要自己转换
    String name = request.getParameter("name");
    return "Hello " + name;
}
```

SpringBoot 方式：参数名和形参变量名一致，定义形参即可接收参数，会自动转换类型。

```java
@RequestMapping("/simple")
public String simple(String name) {
    return "Hello " + name;
}
```

如果方法形参和请求参数名称不匹配，默认得到的是 `null`。这时候可以使用 `@RequestParam` 注解来完成映射。

```java
@RequestMapping("/simple")
public String simple(@RequestParam(name = "name") String username) {
    return "Hello " + username;
}
```

注意：`@RequestParam` 注解中的 name 属性是请求参数名称，value 属性也是请求参数名称，required 属性表示是否必须，默认为 true，defaultValue 属性表示默认值。

### 实体参数

简单实体对象：请求参数名与形参对象属性名相同，定义 POJO 接收即可

```java
@RequestMapping("/entity")
public String entity(User user) {
    return "Hello " + user.getName();
}

class User {
    private String name;
    private Integer age;
    // getter and setter
}
```

复杂实体对象：请求参数名与形参对象属性名相同，按照对象层次结构关系即可接收嵌套 POJO 属性参数

```java
@RequestMapping("/entity")
public String entity(User user) {
    return "Hello " + user.getName() + ", " + user.getPet().getName();
}

class User {
    private String name;
    private Integer age;
    private Pet pet;
    // getter and setter
}

class Pet {
    private String name;
    private Integer age;
    // getter and setter
}
```

传的时候这样传：

```json
{
  "name": "Tom",
  "age": 18,
  "pet.name": "Kitty",
  "pet.age": 3
}
```

### 数组集合参数

数组参数：请求参数名与形参数组名称相同且请求参数为多个，定义数组类型形参即可接收参数

```java
@RequestMapping("/array")
public String array(String[] names) {
    return "Hello " + Arrays.toString(names);
}
```

集合参数：请求参数名与形参集合名称相同且请求参数为多个，`@RequestParam` 绑定参数关系

```java
@RequestMapping("/list")
public String list(@RequestParam List<String> names) {
    return "Hello " + names;
}
```

### 日期参数

日期参数：使用 `@DateTimeFormat` 注解完成日期参数格式转换

```java
@RequestMapping("/date")
public String date(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updateTime) {
    return "Hello " + updateTime.format(DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH时mm分ss秒"));
}
```

### json 参数

JSON 参数：JSON 数据键名与形参对象属性名相同，定义 POJO 类型形参即可接收参数，需要使用 `@RequestBody` 标识

```java
@RequestMapping("/json")
public String json(@RequestBody User user) {
    return "Hello " + user.getName();
}

class User {
    private String name;
    private Integer age;
    private Pet pet;
}

class Pet {
    private String name;
    private Integer age;
}
```

传的时候这样传：

```json
{
  "name": "Tom",
  "age": 18,
  "pet": {
    "name": "Kitty",
    "age": 3
  }
}
```

### 路径参数

路径参数：通过请求 URL 直接传递参数，使用 {...} 来标识该路径参数，需要使用 `@PathVariable` 获取路径参数

```java
@RequestMapping("/path/{name}/{id}")
public String path(@PathVariable String name, @PathVariable Integer id) {
    return "Hello " + name + ", " + id;
}
```

## 响应数据

`@ResponseBody`：将方法返回值直接响应，如果返回值类型是实体对象/集合，将会转换为 JSON 格式响应

`@ResponseBody` 是方法注解、类注解，用在 Controller 方法、类上。

`@RestController` = `@Controller` + `@ResponseBody` + ...

## 统一响应结果

统一响应结果，可以定义一个 `Result` 类封装响应结果，包括状态码、消息、数据。

```java
package edu.hust.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private int code;
    private String msg;
    private Object data;

    public static Result success() {
        return new Result(0, "success", null);
    }

    public static Result success(Object data) {
        return new Result(0, "success", data);
    }

    public static Result success(String msg, Object data) {
        return new Result(0, msg, data);
    }

    public static Result fail(Integer code, String msg) {
        return new Result(code, msg, null);
    }

    public static Result fail(Integer code) {
        return new Result(code, "", null);
    }

    @Override
    public String toString() {
        return "Result{" +
                "code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }
}
```

## 三层架构

- controller: 控制层，接收前端发送的请求，对请求进行处理，并响应数据。
- service：业务逻辑层，处理具体的业务逻辑。
- dao：数据访问层（Data Access Object）（持久层），负责数据访问操作，包括数据的增、删、改、查。

分层解耦

- 内聚：软件中各个功能模块内部的功能联系。
- 耦合：衡量软件中各个层/模块之间的依赖、关联的程度。

软件设计原则：高内聚、低耦合。

- 控制反转：Inversion Of Control，简称 IOC。对象的创建控制权由程序自身转移到外部（容器），这种思想称为控制反转。
- 依赖注入：Dependency Injection，简称 DI。容器为应用程序提供运行时，所依赖的资源，称之为依赖注入。
- Bean 对象：IOC 容器中创建、管理的对象，称之为 bean。

使用 `@Component` 将 Service 层和 DAO 层的实现类交给 IOC 容器管理。
使用 `@Autowired` 为 Controller 层和 Service 层注入以来的对象。

**Bean 的声明**

要把某个对象交给 IOC 容器管理，需要在对应的类上加上如下注解之一:

| 注解        | 说明                  | 位置                                             |
| ----------- | --------------------- | ------------------------------------------------ |
| @Component  | 声明 bean 的基础注解  | 不属于以下三类时，用此注解                       |
| @Controller | @Component 的衍生注解 | 标注在控制器类上                                 |
| @Service    | @Component 的衍生注解 | 标注在业务类上                                   |
| @Repository | @Component 的衍生注解 | 标注在数据访问类上 (由于与 mybatis 整合，用的少) |

Controller 的注解 `@RestController` = `@Controller` + `@ResponseBody` 已经包含了 `@Controller`。

上面这四个注解都可以通过value 属性指定 bean 的名字，如果不指定，默认为类名首字母小写。

可以在 IDEA 的 Endpoints 选项卡中的 Beans 选项中查看所有的 bean。

**Bean 组件扫描**

- 前面声明 bean 的四大注解，要想生效，还需要被组件扫描注解` @ComponentScan` 扫描。
- `@ComponentScan` 注解虽然没有显式配置，但是实际上已经包含在了启动类声明注解 `@SpringBootApplication` 中，默认扫描的范围是启动类所在包及其子包。

`@Autowired` 注解默认安装类型自动装配，如果同类型的 bean 存在多个，使用如下方案解决：

- 加上 `@Primary` 注解标注首选 bean。
- 加上 `@Qualifier` 注解指定 bean 名称：`@Qualifier("beanName")`。
- 不用 `@Autowired` 注解，使用 `@Resource` 注解指定 bean 名称：`@Resource(name = "beanName")`。

`Autowired` 和 `@Resource` 区别：

- `@Autowired` 是 spring 框架提供的注解，而 `@Resource` 是 JDK 提供的注解。
- `@Autowired` 默认是按照类型注入，而 `@Resource` 默认是按照名称注入。

## Lombok

Lombok是一个实用的 Java 类库，能通过注解的形式自动生成构造器、getter/setter、equals、hashcode、toString 等方法，并可以自动化生成日志变量，简化 java 开发、提高效率。

| 注解                | 作用                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| @Getter/@Setter     | 为所有的属性提供 get/set 方法                                                    |
| @ToString           | 会给类自动生成易阅读的 toString 方法                                             |
| @EqualsAndHashCode  | 根据类所拥有的非静态字段自动重写 equals 方法和 hashCode 方法                     |
| @Data               | 提供了更综合的生成代码功能（@Getter + @Setter + @ToString + @EqualsAndHashCode） |
| @NoArgsConstructor  | 为实体类生成无参的构造器方法                                                     |
| @AllArgsConstructor | 为实体类生成除了static修饰的字段之外带有各参数的构造器方法。                     |

注意：Lombok 会在编译时，自动生成对应的 java 代码。我们使用 lombok 时，还需要安装一个 lombok 的插件（idea自带）。

## 文件上传

文件上传需要使用 `MultipartFile` 类型接收文件，使用 `transferTo` 方法保存文件。

`MultipartFile` 常用方法：

- `isEmpty`：判断文件是否为空
- `getOriginalFilename`：获取文件名
- `transferTo`：保存文件
- `getBytes`：获取文件字节数组
- `getInputStream`：获取文件输入流

```java
@RequestMapping("/upload")
public String upload(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
        return "上传失败，请选择文件";
    }
    String fileName = file.getOriginalFilename();
    String filePath = "D:/";
    File dest = new File(filePath + fileName);
    try {
        file.transferTo(dest);
        return "上传成功";
    } catch (IOException e) {
        e.printStackTrace();
    }
    return "上传失败！";
}
```

配置文件上传大小限制：

```properties
# 单个文件大小限制
spring.servlet.multipart.max-file-size=10MB
# 总文件大小限制
spring.servlet.multipart.max-request-size=100MB
```

## 阿里云OSS

阿里云对象存储OsS（Object Storage Service），是一款海量、安全、低成本、高可靠的云存储服务。使用OSS，您可以通过网络随时存储和调用包括文本、图片、音频和视频等在内的各种文件。

SDK：Software Development Kit 的缩写，软件开发工具包，包括辅助软件开发的依赖（jar包）、代码示例等，都可以叫做SDK。

Bucket：存储空间是用户用于存储对象（Object，就是文件）的容器，所有的对象都必须隶属于某个存储空间。

```java
package edu.hust.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Data
@Component
@ConfigurationProperties(prefix = "aliyun.oss")
public class AliOSSUtils {
    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

    /**
     * 上传图片到OSS
     */
    public String upload(MultipartFile file) throws Exception {
        // 获取上传的文件的输入流
        InputStream inputStream = file.getInputStream();

        // 避免文件覆盖
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String fileName = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));

        // 上传文件到 OSS
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName, fileName, inputStream);

        // 文件访问路径
        String url = endpoint.split("//")[0] + "//" + bucketName + "." + endpoint.split("//")[1] + "/" + fileName;
        // 关闭ossClient
        ossClient.shutdown();
        return url;
    }
}
```

## 配置文件

```properties
# 阿里云OSS配置
aliyun.oss.endpoint=oss-cn-shanghai.aliyuncs.com
aliyun.oss.accessKeyId=xxx
aliyun.oss.accessKeySecret=xxx
aliyun.oss.bucketName=xxx
```

`@Value` 注解通常用于外部配置的属性注入，具体用法为：`@Value("${配置文件中的key}")`

```java
@Component
public class AliOssUtils {
    @Value("${aliyun.oss.endpoint}")
    private String endpoint;
    @Value("${aliyun.oss.accessKeyId}")
    private String accessKeyId;
    @Value("${aliyun.oss.accessKeySecret}")
    private String accessKeySecret;
    @Value("${aliyun.oss.bucketName}")
    private String bucketName;
}
```

### yml

基本语法：

- 大小写敏感
- 数值前边必须有空格，作为分隔符
- 使用缩进表示层级关系，缩进时，不允许使用 Tab 键，只能用空格（idea 中会自动将 Tab 转换为空格）
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
- \# 表示注释，从这个字符一直到行尾，都会被解析器忽略

对象、Map：

```yaml
server:
  port: 8080
  servlet:
    context-path: /springboot
```

数组、List、Set：

```yaml
pets:
  - cat
  - dog
  - pig
```

### @ConfigurationProperties

`@ConfigurationProperties` 可以批量的将外部的属性配置注入到 bean 对象的属性中。

## 会话技术

会话：用户打开浏览器，访问 web 服务器的资源，会话建立，直到有一方断开连接，会话结束。在一次会话中可以包含多次请求和响应。

会话跟踪：一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求间共享数据。

会话跟踪方案：

- 客户端会话跟踪技术：Cookie
- 服务端会话跟踪技术：Session
- 令牌技术

### Cookie

优点：HTTP协议中支持的技术

缺点：

- 移动端 APP 无法使用 Cookie
- 不安全，用户可以自己禁用 Cookie
- Cookie 不能跨域

### Session

优点：存储在服务端，安全

缺点：

- 服务器集群环境下无法直接使用 Session
- Cookie 的缺点

### 令牌技术

优点：

- 支持 PC 端、移动端
- 解决集群环境下的认证问题
- 减轻服务器端存储压力

缺点：需要自己实现

## JWT

全称：JSON Web Token(https://jwt.io/)

定义了一种简洁的、自包含的格式，用于在通信双方以 json 数据格式安全的传输信息。由于数字签名的存在，这些信息是可靠的。

组成：

- 第一部分：Header（头），记录令牌类型、签名算法等。例如：`{"alg":"HS256","type":"JWT"}`
- 第二部分：Payload（有效载荷），携带一些自定义信息、默认信息等。例如：`{"id":"1""username":"Tom"}`
- 第三部分：Signature（签名），防止 Token 被篡改、确保安全性。将 header、payload，并加入指定秘钥，通过指定签名算法计算而来。

Base64：是一种基于 64 个可打印字符（A-Za-z0-9+/）来表示二进制数据的编码方式。

使用 JWT 登录认证：

1. 登录成功后，生成令牌
2. 后续每个请求，都要携带 JWT 令牌，系统在每次请求处理之前，先校验令牌，通过后，再处理

注意：

- JWT 校验时使用的签名秘钥，必须和生成 JWT 令牌时使用的秘钥是配套的。
- 如果 JWT 令牌解析校验时报错，则说明 JWT 令牌被篡改或失效了，令牌非法。

## Filter 过滤器

- 概念：Filter 过滤器，是 JavaWeb 三大组件(Servlet、Filter、Listener)之一。
- 过滤器可以把对资源的请求拦截下来，从而实现一些特殊的功能。
- 过滤器一般完成一些通用的操作，比如：登录校验、统一编码处理、敏感字符处理等。

### Filter 快速入门

1. 定义 Filter: 定义一个类，实现 Filter 接口，并重写其所有方法。
2. 配置 Filter：Filter 类上加 `@WebFilter`注解，配置拦截资源的路径。引导类（启动类）上加 `@ServletComponentScan` 开启 Servlet 组件支持。

```java
@WebFilter(urlPatterns = "/*")
public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("Filter 初始化");
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("Filter 执行");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        System.out.println("Filter 销毁");
        Filter.super.destroy();
    }
}
```

### Filter 拦截路径

Filter 可以根据需求，配置不同的拦截资源路径:

- `@WebFilter(urlPatterns = "/xxx")`：拦截指定资源路径
- `@WebFilter(urlPatterns = "/*")`：拦截所有资源路径
- `@WebFilter(urlPatterns = "/xxx/*")`：拦截指定目录下的资源路径

### 过滤器链

一个 web 应用中，可以配置多个过滤器，这多个过滤器就形成了一个过滤器链。

顺序：注解配置的 Filter，优先级是按照过滤器类名（字符串）的自然排序。

## Interceptor 拦截器

概念：是一种动态拦截方法调用的机制，类似于过滤器。Spring 框架中提供的，用来动态拦截控制器方法的执行。

作用：拦截请求，在指定的方法调用前后，根据业务需要执行预先设定的代码。

### Interceptor 快速入门

1. 定义 Interceptor：定义一个类，实现 HandlerInterceptor 接口，并重写其所有方法。
2. 注册拦截器

```java
@Component
public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("Interceptor preHandle");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("Interceptor postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("Interceptor afterCompletion");
    }
}
```

```java
@Configuration
public class MyInterceptorConfig implements WebMvcConfigurer {
    @Autowired
    private MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns("/**");
    }
}
```

## 异常

全局异常处理器

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public Result error(Exception e) {
        e.printStackTrace();
        return Result.fail(500, "系统异常");
    }
}
```

`@RestControllerAdvice` = `@ControllerAdvice` + `@ResponseBody`

`@ControllerAdvice`：是一个增强的 Controller，全局处理 Controller 层异常的注解。

`@ExceptionHandler`：用来定义函数针对的异常类型，最终被捕获。

## Spring 事物管理

`@Transactional` 注解：用在业务（Service）层的方法上、类上、接口上，将当前方法交给 spring 进行事务管理，方法执行前，开启事务；成功执行完毕，提交事务；出现异常，回滚事务

```java
@Service
@Transactional
public class UserService {
    @Autowired
    private UserDao userDao;

    public void transfer() {
        userDao.reduceMoney();
        int i = 1 / 0;
        userDao.addMoney();
    }
}
```

`@Transactional` 注解的属性：

- rollbackFor: 用于控制出现何种异常类型时回滚事务。默认情况下，只有出现 RuntimeException 才回滚异常。

  ```java
  @Transactional(rollbackFor = Exception.class)
  ```

- propagation：指的就是当一个事务方法被另一个事务方法调用时，这个事务方法应该如何进行事务控制。

  | 属性值        | 含义                                                                 |
  | ------------- | -------------------------------------------------------------------- |
  | REQUIRED      | 【默认值】需要事务，有则加入，无则创建新事务                         |
  | REQUIRES_NEW  | 需要新事务，无论有无，总是创建新事务                                 |
  | SUPPORTS      | 支持事务，有则加入，无则在无事务状态中运行                           |
  | NOT_SUPPORTED | 不支持事务，在无事务状态下运行，如果当前存在已有事务，则挂起当前事务 |
  | MANDATORY     | 必须有事务，否则抛异常                                               |
  | NEVER         | 必须没事务，否则抛异常                                               |
  | ...           | ...                                                                  |

  ```java
  @Transactional(propagation = Propagation.REQUIRED)
  ```

开启事物管理日志：

```properties
logging.level.org.springframework.jdbc.support.jdbcTransactionManager=debug
```

## AOP

AOP：Aspect Oriented Programming（面向切面编程、面向方面编程），其实就是面向特定方法编程。

### AOP 快速入门

导入依赖：在 pom.xml 文件中导入 AOP 的依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

编写 AOP 程序：针对特定方法进行增强

```java
@Aspect
@Component
public class LogAspect {
    @Around("execution(* edu.hust.service.*.*(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("环绕前");
        Object proceed = joinPoint.proceed();
        System.out.println("环绕后");
        return proceed;
    }
}
```

`@Aspect`：声明当前类是一个切面类。
`@Around`：声明当前方法是一个环绕通知，参数是切入点表达式。

### AOP 核心概念

- 连接点：JoinPoint，可以被 AOP 控制的方法（暗含方法执行时的相关信息）
- 通知：Advice，指哪些重复的逻辑，也就是共性功能（最终体现为一个方法）
- 切入点：PointCut，匹配连接点的条件，通知仅会在切入点方法执行时被应用
- 切面：Aspect，描述通知与切入点的对应关系（通知+切入点）
- 目标对象：Target，通知所应用的对象

### 通知类型

- @Around：环绕通知，此注解标注的通知方法在目标方法前、后都被执行
- @Before：前置通知，此注解标注的通知方法在目标方法前被执行
- @After：后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行
- AfterReturning：返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行
- AfterThrowing ：异常后通知，此注解标注的通知方法发生异常后执行

### 通知顺序

当有多个切面的切入点都匹配到了目标方法，目标方法运行时，多个通知方法都会被执行。

1. 不同切面类中，默认按照切面类的类名字母排序：

   - 目标方法前的通知方法：字母排名靠前的先执行
   - 目标方法后的通知方法：字母排名靠前的后执行

2. 用 `@Order(数字)` 加在切面类上来控制顺序

   - 目标方法前的通知方法：数字小的先执行
   - 目标方法后的通知方法：数字小的后执行

### 切入点表达式 execution

execution 主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

`execution（访问修饰符？返回值包名.类名.?方法名（方法参数）throws 异常？）`

可以使用通配符描述切入点：

- \*：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分

  `execution(* edu.hust.service.*.*(..))`

- ..：多个连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数

  `execution(* edu.hust..service.*.*(..))`

注意：根据业务需要，可以使用且（&&）、或（）、非（！）来组合比较复杂的切入点表达式。

### 切入点表达式 @annotation

`@annotation` 切入点表达式，用于匹配标识有特定注解的方法。

```java
@Around("@annotation(edu.hust.annotation.MyAnnotation)")
```

### 连接点

在 Spring 中用 JoinPoint 抽象了连接点，用它可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等。

- 对于 `@Around` 通知，获取连接点信息只能使用 ProceedingJoinPoint
- 对于其他四种通知，获取连接点信息只能使用 JoinPoint，它是 ProceedingJoinPoint 的父类型
