# Java基础

::: tip

观看[黑马程序员Java入门视频](https://www.bilibili.com/video/BV1Cv411372m/)后的一点点总结，请勿阅读。

:::

- Java是美国 sun 公司（Stanford University Network）于 1995 年推出的一种高级程序设计语言。

- 早期被称为 Oak，后来更名为 Java。

- Java 之父：詹姆斯·高斯林（James Gosling）。

- 2009 年 sun 公司被 Oracle（甲骨文） 公司收购。

## Java 能做什么

- **桌面应用开发**

  各种税务管理软件，IDEA

- **企业级应用开发**

  微服务，大型互联网应用

- **移动应用开发**

  Android，医疗设备

- **服务器系统**

  应用得后台

- **大数据开发**

  Hadoop

- **游戏开发**

  我的世界《Minecraft》

## Java 技术体系

| 技术系统                         | 说明                                      |
| -------------------------------- | ----------------------------------------- |
| Java SE(Java Standard Edition)   | Java 标准版，Java 技术的核心和基础        |
| Java EE(Java Enterprise Edition) | Java 企业版，企业级应用开发的一套解决方案 |
| Java ME(Java Micro Edition)      | Java 微型版，针对移动设备应用的解决方案   |

## JDK 简介

JDK（Java Development Kit）是 Java 开发工具包，必须安装 JDK 才能进行 Java 开发。

2014 年推出了 JDK8，2018 年推出了 JDK 11，2021 年推出了 JDK 17。这三个版本都是 LTS（Long Term Support）长期支持版本。

在 [Oracle 官网](https://www.oracle.com)下载 JDK，安装在无中文路径的地方。目前较新版本的 JDK 会自动配置环境变量，没有的话手动配置到 Path 环境变量即可。

安装好后使用 `java -version` 以及 `javac --version` 命令查看 `java` 和 `javac` 命令版本。

`java` 命令用于运行 Java 程序，`javac` 命令用于编译 Java 程序。

## 第一个 Java 程序

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

使用 `javac HelloWorld.java` 编译，使用 `java HelloWorld` 运行。

从 JDK 11 开始，可以使用 `java HelloWorld.java` 直接运行源代码文件。

## JDK，JRE，JVM 之间的关系

- JVM（Java Virtual Machine）：Java 虚拟机，负责运行 Java 程序。
- JRE（Java Runtime Environment）：Java 运行环境，包含 JVM 和 Java 核心类库。
- JDK（Java Development Kit）：Java 开发工具包，包含 JRE 和开发工具（如 java、javac等）。

## 跨平台原理

Java 语言是跨平台的，即一次编写，到处运行。

跨平台的原理是 Java 语言编译成字节码文件，然后由 JVM 解释执行。由于各个平台都有对应的 JVM，所以 Java 程序可以很方便地在不同平台上运行。

## IDEA

IDEA 是 JetBrains 公司推出的一款 Java 集成开发环境，是目前最流行的 Java 开发工具之一。

IDEA 的下载地址是 [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)。

建议选择旗舰版，选择社区版缺少一些功能后期可能会很难受。~~旗舰版太贵怎么办？我也不知道~~

## 进制

- 二进制：0b 或 0B 开头，如 0b1101。
- 八进制：0 开头，如 012。
- 十进制：无需前缀，如 123。
- 十六进制：0x 或 0X 开头，如 0x1A。

## 数据类型

基本数据类型

| 类型    | 占用字节数 | 取值范围                                   |
| ------- | ---------- | ------------------------------------------ |
| byte    | 1          | -128 ~ 127                                 |
| short   | 2          | -32768 ~ 32767                             |
| int     | 4          | -2147483648 ~ 2147483647                   |
| long    | 8          | -9223372036854775808 ~ 9223372036854775807 |
| float   | 4          | 1.4E-45 ~ 3.4028235E38                     |
| double  | 8          | 4.9E-324 ~ 1.7976931348623157E308          |
| char    | 2          | 0 ~ 65535                                  |
| boolean | 1          | true 或 false                              |

其中，整形默认为 int 类型，浮点型默认为 double 类型。如果需要使用 long 类型，需要在数字后面加上 `L` 或 `l`，如 `100L`。如果需要使用 float 类型，需要在数字后面加上 `F` 或 `f`，如 `3.14F`。

大小：byte < short < int < long < float < double

小范围的数据类型可以自动转换为大范围的数据类型，大范围的数据类型需要强制转换为小范围的数据类型（可能丢失精度）。

byte、short、char 在表达式中会自动提升为 int 类型。

## 运算符

算术运算符：+、-、\*、/、%、++、--

其中 + 还可以用于字符串连接，如

```java
String str = 1 + '0' + "abc"; // 49abc
```

赋值运算符：=、+=、-=、\*=、/=、%=

关系运算符：==、!=、>、<、>=、<=

逻辑运算符：&&、||、!

&& 和 || 具有短路效果，即如果第一个条件已经能够判断结果，就不会再判断第二个条件。

位运算符：&、|、^、~、<<、>>、>>>

三元运算符：条件表达式 ? 表达式 1 : 表达式 2

## Scanner

Scanner 是 Java 的一个类，用于获取用户输入。

```java
import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个整数：");
        int num = sc.nextInt();
        System.out.println("输入的整数是：" + num);
    }
}
```

## 循环结构

for、while、do-while

知道循环次数用 for，不知道循环次数用 while 或 do-while。

## Random

Random 是 Java 的一个类，用于生成随机数。

```java
import java.util.Random;

public class RandomDemo {
    public static void main(String[] args) {
        Random r = new Random();
        int num = r.nextInt(100); // 0 ~ 99
        System.out.println(num);
    }
}
```

生成 a ~ b 之间的随机数：`int num = r.nextInt(b - a + 1) + a;`

## 数组

数组是一种数据结构，用于存储同一类型的多个元素。

静态初始化：`数据类型[] 数组名 = new 数据类型[] {元素1, 元素2, ...};` 或简写成 `数据类型[] 数组名 = {元素1, 元素2, ...};`

```java
int[] arr = new int[] {1, 2, 3};
int[] arr2 = {1, 2, 3};

System.out.println(arr); // [I@1b6d3586 数组的地址值 [代表数组，I 代表 int 类型，@ 为分隔符，后面是十六进制的地址值
```

动态初始化：`数据类型[] 数组名 = new 数据类型[长度];`

```java
int[] arr = new int[3];
```

默认值规则：基本数据类型，0、0.0、false；引用数据类型，null。

遍历数组：for 循环、增强 for 循环

```java
int[] arr = {1, 2, 3};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

for (int i : arr) {
    System.out.println(i);
}
```

## debug

在 IDEA 中，可以在代码行号处点击，添加断点。然后点击 Debug 按钮，程序会在断点处停下来，可以逐行执行代码。

- step over(f8)：逐行执行，不进入方法内部。
- step into(f7)：逐行执行，会进入方法内部。
- step out(shift+f8)：跳出方法。

## 方法

方法是一段代码的集合，用于完成特定的功能。

方法的定义格式：`修饰符 返回值类型 方法名(参数类型 参数名, ...) {方法体}`

```java
public static int sum(int a, int b) {
    return a + b;
}
```

方法重载：方法名相同，参数列表不同。

```java
public static int sum(int a, int b) {
    return a + b;
}

public static int sum(int a, int b, int c) {
    return a + b + c;
}
```

## this

this 是 Java 的一个关键字，代表当前对象的引用，可以用于区分局部变量和成员变量。

```java
public class Person {
    String name;

    public void setName(String name) {
        this.name = name;
    }
}
```

## 构造方法

构造方法是一种特殊的方法，用于创建对象。

构造方法的定义格式：`修饰符 类名(参数类型 参数名, ...) {方法体}`

```java
public class Person {
    String name;

    public Person(String name) {
        this.name = name;
    }
}
```

注意：

- 如果没有定义构造方法，系统会默认提供一个无参构造方法。
- 如果定义了构造方法，系统不会再提供无参构造方法。
- 构造方法无返回值类型，连 void 都不写。

## 封装

实体类（JavaBean）：成员变量使用 private 修饰，提供公共的 get 和 set 方法。类中必须有一个无参构造方法。

实体类只负责数据的存取，而对数据的处理交给其他类来完成，以实现数据和数据业务处理相分离。

```java
public class Student {
    private String name;
    private int age;

    public Student() {}

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

## 成员变量和局部变量区别

- 定义位置：成员变量定义在类中，方法外；局部变量定义在方法中。
- 内存位置：成员变量在堆内存中，局部变量在栈内存中。
- 默认值：成员变量有默认值，局部变量没有默认值。
- 作用范围：成员变量作用范围是整个类，局部变量作用范围是从定义处开始到所属的 \} 结束。
- 生命周期：成员变量随着对象的创建而存在，随着对象的消失而消失；局部变量随着方法的调用而存在，随着方法的调用完毕而消失。

## 包

包是一种命名空间，用于对类进行分类管理。语法格式：`package 包名;`

如何调用包中的类：

- 调用自己包中的类，直接使用类名即可。
- 调用其他包中的类，先导包再使用，如 `import 包名.类名;`
- 调用 java.lang 包中的类，不需要导包。
- 调用多个不同包下的同名类，只有一个类能省略包名，其他类需要使用全类名，如 `包名.类名`。

## String

创建字符串对象的两种方式：

1. 直接赋值：`String s = "abc";`
2. 构造方法：`String s = new String("abc");`

字符串对象的常用方法：

- `int length()`：获取字符串的长度。
- `char charAt(int index)`：获取指定索引处的字符。
- `int indexOf(String str)`：获取 str 在字符串中第一次出现的索引。
- `String substring(int beginIndex)`：获取从 beginIndex 开始到末尾的子字符串。
- `String substring(int beginIndex, int endIndex)`：获取从 beginIndex 开始到 endIndex 结束的子字符串。
- `boolean equals(Object obj)`：比较字符串内容是否相同。
- `boolean equalsIgnoreCase(String str)`：比较字符串内容是否相同，忽略大小写。
- `String toUpperCase()`：将字符串转换为大写。
- `String toLowerCase()`：将字符串转换为小写。
- `String trim()`：去除字符串两端的空格。
- `String replace(char oldChar, char newChar)`：替换字符串中的字符。
- `String[] split(String regex)`：按照给定的正则表达式分割字符串。
- `byte[] getBytes()`：将字符串转换为字节数组。
- `char[] toCharArray()`：将字符串转换为字符数组。
- `boolean startsWith(String prefix)`：判断字符串是否以指定的前缀开始。

字符串对象是不可变的，每次对字符串的操作都会生成一个新的字符串对象。

字符串常量池：JVM 为了提高效率，将字符串常量放在了一个常量池中，如果字符串常量池中已经存在该字符串，就不会再创建新的字符串对象。

如果使用 new 关键字创建字符串对象，就会在堆内存中创建一个新的字符串对象，它不在常量池中。

```java
String s1 = "abc";
String s2 = "abc";
System.out.println(s1 == s2); // true

String s3 = new String("abc");
System.out.println(s1 == s3); // false
```

注意：

- 字符串运算得到的结果会创建一个新的字符串对象。
- Java 存在编译优化机制，程序在编译时，字符串常量之间的拼接会直接合并。

```java
String s1 = "abc";
String s2 = "def";
String s3 = "abcdef";
String s4 = s1 + s2;
System.out.println(s3 == s4); // false

String s5 = "abc" + "def";
System.out.println(s3 == s5); // true
```

## ArrayList

ArrayList 是集合中的一种，用于存储一组数据。集合大小可变。

```java
import java.util.ArrayList;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("a");
        list.add("b");
        list.add("c");
        list.add("d");
        System.out.println(list); // [a, b, c, d]
        list.remove(2);
        System.out.println(list); // [a, b, d]
        list.set(2, "e");
        System.out.println(list); // [a, b, e]
        System.out.println(list.get(2)); // e
        System.out.println(list.size()); // 3
    }
}
```

ArrayList 常用方法：

- `boolean add(E e)`：将指定的元素添加到列表的末尾。
- `void add(int index, E element)`：将指定的元素插入列表中的指定位置。
- `E remove(int index)`：移除列表中指定位置的元素。
- `E remove(Object o)`：移除列表中第一次出现的指定元素。
- `E set(int index, E element)`：用指定的元素替换列表中指定位置的元素。
- `E get(int index)`：返回列表中指定位置的元素。
- `int size()`：返回列表中的元素数。

## static

static 是 Java 的一个关键字，用于修饰成员变量和成员方法。

静态成员或者静态方法是属于类的，不属于对象的。静态方法内部不能直接访问非静态成员，只能访问静态成员。

## 代码块

静态代码块：`static {}`，随着类的加载而执行，只执行一次。

实例代码块：`{}`，每次创建对象都会执行。

执行顺序：静态代码块 -> 实例代码块 -> 构造方法

```java
public class Person {
    {
        System.out.println("实例代码块");
    }

    static {
        System.out.println("静态代码块");
    }

    public Person() {
        System.out.println("构造方法");
    }
}
```

## 单例模式

单例模式是一种设计模式，保证一个类只有一个实例，并提供一个全局访问点。

```java
public class Singleton {
    private static Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

## 继承 extends

子类继承父类，子类可以直接访问父类的非私有成员。

Java 不支持多继承，但支持多层继承。

权限修饰符：

| 修饰符    | 在本类中 | 同一个包下的其他类里 | 任意包下的子类里 | 任意包下的任意类型 |
| --------- | -------- | -------------------- | ---------------- | ------------------ |
| private   | √        | ×                    | ×                | ×                  |
| 缺省      | √        | √                    | ×                | ×                  |
| protected | √        | √                    | √                | ×                  |
| public    | √        | √                    | √                | √                  |

Object 类是所有类的父类，Java 中所有类都直接或间接继承自 Object 类。

方法重写：子类继承父类后，可以对父类的方法进行重写。

重写规则：

- 子类方法的权限修饰符不能小于父类方法的权限修饰符。
- 子类方法的返回值类型和父类方法的返回值类型一样，或者是父类方法返回值类型的子类（范围更小）。
- 子类方法的方法名和参数列表必须和父类方法的方法名和参数列表一样。
- 私有、静态、final 方法不能被重写。
- 可以使用 `@Override` 注解来检查是否重写成功。

使用 super 关键字，可以访问父类的成员。

默认情况下，子类的构造方法会调用父类的无参构造方法。如果父类没有无参构造方法，子类必须使用 super 显示调用父类的构造方法。

## 多态

对象多态和行为多态。

编译看左边，运行看右边。

注意：没有变量多态。

```java
class Animal {
    public String name = "动物";

    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Cat extends Animal {
    public String name = "猫";

    public void eat() {
        System.out.println("猫吃鱼");
    }

    public void catchMouse() {
        System.out.println("猫抓老鼠");
    }
}

class Dog extends Animal {
    public String name = "狗";

    public void eat() {
        System.out.println("狗吃肉");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal cat = new Cat();
        cat.eat(); // 猫吃鱼
        Animal dog = new Dog();
        dog.eat(); // 狗吃肉

        // 成员变量没有多态，访问的是父类的成员变量
        System.out.println(cat.name); // 动物
        System.out.println(dog.name); // 动物
    }
}
```

多态的问题：无法访问子类特有的成员。

解决方法：向下转型。

```java
public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal cat = new Cat();
        cat.eat(); // 猫吃鱼
        if (cat instanceof Cat) {
            Cat c = (Cat) cat;
            c.catchMouse();
        }
    }
}
```

## final

final 是 Java 的一个关键字，可以修饰类、方法、变量。

- 修饰类：该类不能被继承。
- 修饰方法：该方法不能被重写。
- 修饰变量：该变量是一个常量，只能赋值一次。

## abstract

- 抽象类中不一定有抽象方法，有抽象方法的类一定是抽象类。
- 抽象类不能被实例化。
- 抽象方法只有方法的声明，没有方法的实现。
- 抽象类的子类要么是抽象类，要么实现全部的抽象方法。

## 接口

接口 interface 弥补了 Java 单继承的不足。

一个类可以实现多个接口。要么实现全部的抽象方法，要么是抽象类。

JDK8 开始增加了接口的功能：默认方法、静态方法、私有方法。它们默认被 public 修饰。

- 默认方法：使用 default 关键字修饰。
- 静态方法：使用 static 关键字修饰。
- 私有方法：使用 private 关键字修饰，JDK 9才有，只能在接口内部被调用。

```java
interface MyInterface {
    void show1();

    default void show2() {
        System.out.println("show2");
    }

    static void show3() {
        System.out.println("show3");
    }

    private void show4() {
        System.out.println("show4");
    }
}

class MyClass implements MyInterface {
    public void show1() {
        System.out.println("show1");
    }
}
```

一个接口可以继承多个接口。一个类可以实现多个接口。如果多个接口中存在方法签名冲突，则此时不支持多继承或者多实现。

一个类继承了父类又实现了接口，父类和接口中存在同名的默认方法，优先使用父类的方法。

没有任何抽象方法的接口，如 `Serializable`、`Cloneable`，称为标记接口。

## 内部类

当一个类的内部包含了一个完整的事物，且这个事物没有必要单独设计时，就可以把这个事物设计成内部类。

内部类的分类：

- 成员内部类：在类中方法外。
- 静态内部类：在类中方法外，使用 static 修饰。
- 局部内部类：在方法中。
- 匿名内部类：没有类名，只能使用一次。

成员内部类创建对象格式：`外部类名.内部类名 对象名 = new 外部类名().new 内部类名();`

```java
class Outer {
    private int num = 10;

    class Inner {
        public void show() {
            System.out.println(num);
        }
    }
}

public class InnerClassDemo {
    public static void main(String[] args) {
        Outer.Inner oi = new Outer().new Inner();
        oi.show();
    }
}
```

- 成员内部类中可以直接访问外部类的成员，包括私有成员。
- 可以在成员内部类的实例方法中拿到外部类的对象，如 `外部类名.this`。

静态内部类创建对象格式：`外部类名.内部类名 对象名 = new 外部类名.内部类名();`

```java
class Outer {
    private static int num = 10;

    static class Inner {
        public void show() {
            System.out.println(num);
        }
    }
}

public class InnerClassDemo {
    public static void main(String[] args) {
        Outer.Inner oi = new Outer.Inner();
        oi.show();
    }
}
```

匿名内部类格式：`new 类名或接口名(参数值...) {方法重写}`

```java
interface Inter {
    void show();
}

public class InnerClassDemo {
    public static void main(String[] args) {
        Inter i = new Inter() {
            public void show() {
                System.out.println("show");
            }
        };
        i.show();
    }
}
```

匿名内部类本质是一个继承了该类或实现了该接口的子类匿名对象。

匿名内部类通常作为参数传递给方法。

## 枚举

枚举是一种特殊的类。

格式：

```java
修饰符 enum 枚举名 {
    枚举值1, 枚举值2, ...
}
```

枚举类特点：

- 枚举类的第一行只能罗列一些名称，这些名称都是常量，并且**每个常量记住的都是枚举类的一个对象**。
- 枚举类的构造器都是私有的（写不写都只能是私有的），因此，枚举类对外不能创建对象。
- 枚举都是最终类，不可以被继承。
- 枚举类中，从第二行开始，可以定义类的其他各种成员。
- 编译器为枚举类新增了几个方法，并且枚举类都是继承：java.lang.Enum 类的，从 enum 类也会继承到一些方法。

## 泛型

定义类、接口、方法时，不指定具体的类型，而是使用类型参数。泛型提供了在编译阶段约束所能操作的数据类型，并自动进行检查的能力！这样可以避免强制类型转换，及其可能出现的异常。

- 泛型是工作在编译阶段的，，一旦程序编译成 class 文件，class 文件中就不存在泛型了，这就是泛型擦除。
- 泛型不支持基本数据类型，只能支持对象类型（引用数据类型）。

```java
public class GenericDemo {
    public static void main(String[] args) {
        Tool<String> t = new Tool<>();
        t.show("abc");
    }
}

class Tool<T> {
    public void show(T t) {
        System.out.println(t);
    }
}
```

如果不指定具体的类型，泛型默认为 Object 类型。

使用 extends 关键字限定泛型的类型范围。

? 通配符，表示任意类型。

泛型的上下限：

- ? extends E：可以接收 E 类型或 E 的子类型。
- ? super E：可以接收 E 类型或 E 的父类型。

## Objects

Objects 是 Java 的一个工具类，提供了一些静态方法，用于操作对象。

- `public static boolean equals(Object a, Object b)`：判断两个对象是否相等，避免空指针异常。

  ```java
  // 底层实现
  public static boolean equals(Object a, Object b) {
      return (a == b) || (a != null && a.equals(b));
  }
  ```

- `public static boolean isNull(Object obj)`：判断对象是否为空。

- `public static boolean nonNull(Object obj)`：判断对象是否不为空。

## 包装类

包装类就是把基本类型的数据包装成对象。

| 基本数据类型 | 对应的包装类（引用数据类型） |
| ------------ | ---------------------------- |
| byte         | Byte                         |
| short        | Short                        |
| int          | Integer                      |
| long         | Long                         |
| char         | Character                    |
| float        | Float                        |
| double       | Double                       |
| boolean      | Boolean                      |

## StringBuilder

StringBuilder 代表可变字符串对象，相当于是一个容器，它里面装的字符串是可以改变的，就是用来操作字符串的。

SringBuilder 比 String 更适合做字符串的修改操作，效率会更高，代码也会更简洁。

常用方法：

- `public StringBuilder append(任意类型)`：添加数据，并返回对象本身。
- `public StringBuilder reverse()`：反转字符串。
- `public String toString()`：将 StringBuilder 对象转换为 String 对象。
- `public int length()`：返回字符串的长度。

## StringBuffer

StringBuffer 和 StringBuilder 类似，也是代表可变字符串对象，但 StringBuffer 是线程安全的，效率稍低。

## Stringjoiner

JDK8 开始才有的，跟 StringBuilder 一样，也是用来操作字符串的，也可以看成是一个容器，创建之后里面的内容是可变的。

好处：不仅能提高字符串的操作效率，并且在有些场景下使用它操作字符串，代码会更简洁

```java
public class StringJoinerDemo {
    public static void main(String[] args) {
        StringJoiner sj = new StringJoiner(",", "[", "]");
        sj.add("a").add("b").add("c");
        System.out.println(sj); // [a,b,c]
    }
}
```

## System

System 代表程序所在的系统，也是一个工具类。

- `public static long currentTimeMillis()`：返回以毫秒为单位的当前时间。
- `public static void exit(int status)`：终止当前运行的 Java 虚拟机。

## Runtime

Runtime 类代表运行时环境，是一个单例类。

- `public static Runtime getRuntime()`：返回当前运行时环境。
- `public void exit(int status)`：终止当前运行的 Java 虚拟机。
- `public Process exec(String command)`：在单独的进程中执行指定的字符串命令，返回与该子进程对应的 Process 对象。
- `public int availableProcessors()`：返回可用处理器的数量。
- `public long totalMemory()`：返回 Java 虚拟机中的内存总量。
- `public long freeMemory()`：返回 Java 虚拟机中的空闲内存量。

## BigDecimal

用于解决浮点数运算的精度问题。

- `public static BigDecimal valueof(double val)`：转换一个 double 成 BigDecimal
- `public BigDecimal add(BigDecimal b)`：加法
- `public BigDecimal subtract(BigDecimal b)`：减法
- `public BigDecimal multiply(BigDecimal b)`：乘法
- `public BigDecimal divide(BigDecimal b)`：除法
- `public BigDecimal divide（另一个BigDecimal对象，精确几位，舍入模式）`：除法、可以控制精确到小数几位
- `public double doubleValue()`：将 BigDecimal 转换为 double

## SimpleDateFormat

代表简单日期格式化，可以用来把日期对象、时间毫秒值格式化成我们想要的形式

- `public SimpleDateFormat(String pattern)`：用给定的模式和默认语言环境的日期格式符号构造 SimpleDateFormat。
- `public String format(Date date)`：将日期格式化成日期/时间字符串。
- `public String format(Object obj)`：将时间毫秒值格式化成日期/时间字符串。
- `public Date parse(String source)`：将字符串解析成日期对象。

```java
public class SimpleDateFormatDemo {
    public static void main(String[] args) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d = new Date();
        String s = sdf.format(d);
        System.out.println(s);
    }
}
```

## Calendar

代表的是系统此刻时间对应的日历，通过它可以单独获取、修改时间中的年、月、日、时、分、秒等。

- `public static Calendar getInstance()`：使用默认时区和语言环境获得一个日历。
- `public int get(int field)`：返回给定日历字段的值。
- `public void set(int field, int value)`：将给定的日历字段设置为给定值。
- `public void add(int field, int amount)`：根据日历的规则，为给定的日历字段添加或减去指定的时间量。
- `public final Date getTime()`：返回一个表示此 Calendar 时间值（从历元至现在的毫秒偏移量）的 Date 对象。
- `public long getTimeInMillis()`：返回此 Calendar 的时间值，以毫秒为单位。

## JDK8 新增的日期时间 API

- LocalDate：代表本地日期
- LocalTime：代表本地时间
- LocalDateTime：代表本地日期时间

## Arrays

Arrays 是 Java 的一个工具类，提供了一些静态方法，用于操作数组。

- `public static String toString(数组)`：返回指定数组的内容的字符串表示形式。
- `public static void sort(数组)`：对指定数组进行排序。
- `public static int binarySearch(数组, 元素)`：使用二分搜索算法在指定数组中搜索指定值的索引。
- `public static void fill(数组, 值)`：将指定数组的所有元素设置为指定值。
- `public static void setAll(数组, IntToDoubleFunction)`：使用生成的 int 值为数组的每个元素计算新值。
- `public static int[] copyOf(数组, 新长度)`：将指定数组的前几个元素复制到一个新数组中。
- `public static int[] copyOfRange(数组, 起始索引, 结束索引)`：将指定数组的指定范围复制到一个新数组中。

sort 排序对象数组：

```java
public class ArraysDemo {
    public static void main(String[] args) {
        Person[] arr = {
            new Person("张三", 23),
            new Person("李四", 24),
            new Person("王五", 25)
        };
        Arrays.sort(arr, new Comparator<Person>() {
            public int compare(Person o1, Person o2) {
                return o1.getAge() - o2.getAge();
            }
        });
        System.out.println(Arrays.toString(arr));
    }
}
```

setAll 设置数组元素：

```java
public class ArraysDemo {
    public static void main(String[] args) {
        int[] arr = new int[10];
        Arrays.setAll(arr, new IntUnaryOperator() {
            public int applyAsInt(int operand) {
                return new Random().nextInt(100);
            }
        });
        System.out.println(Arrays.toString(arr));
    }
}
```

## Lambda 表达式

Lambda 是 JDK8 开始引入的一个新特性，用于简化匿名内部类的写法。

格式：

```java
(被重写方法的参数列表) -> {
    被重写方法的方法体
}
```

Lambda 表达式并不是可以替代所有的匿名内部类，只能替代函数式接口（只有一个抽象方法的接口）。

```java
public class LambdaDemo {
    public static void main(String[] args) {
        new Thread(() -> {
            System.out.println("多线程任务执行！");
        }).start();
    }
}
```

注意：将来我们见到的大部分函数式接口，上面都可能会有一个注解 @FunctionalInterface，有该注解的接口必定是函数式接口。

## 方法引用

方法引用是 Lambda 表达式的一种简写形式。

格式：

- 对象::实例方法名
- 类::静态方法名
- 类::实例方法名
- 类::new

## Collection

Collection 是 Java 集合框架的根接口，代表一组对象。

- `public boolean add(E e)`：添加元素。
- `public boolean addAll(Collection<? extends E> c)`：添加一个集合的元素。
- `public boolean remove(E o)`：移除元素。
- `public void clear()`：清空集合。
- `public boolean contains(E o)`：判断集合中是否包含指定的元素。
- `public boolean isEmpty()`：判断集合是否为空。
- `public int size()`：返回集合中的元素个数。
- `public Object[] toArray()`：将集合转换为数组。

## 迭代器

迭代器是用来遍历集合的专用方式（数组没有迭代器），在 java 中迭代器的代表是 Iterator。

- `public Iterator iterator()`：返回在此 collection 的元素上进行迭代的迭代器。

Iterator 接口中的常用方法：

- `public E next()`：返回迭代的下一个元素。
- `public boolean hasNext()`：如果仍有元素可以迭代，则返回 true。

```java
public class IteratorDemo {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("abc1");
        coll.add("abc2");
        coll.add("abc3");
        coll.add("abc4");
        Iterator<String> it = coll.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

## 增强 for 循环

格式：

```java
for (元素类型 变量名 : 数组或集合) {
    // ...
}
```

增强 for 循环遍历集合本质上是迭代器遍历的简写方法。

```java
public class ForEachDemo {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("abc1");
        coll.add("abc2");
        coll.add("abc3");
        coll.add("abc4");
        for (String s : coll) {
            System.out.println(s);
        }
    }
}
```

## List 集合

List 集合支持索引，所以多了很多和索引相关的方法。

- `public void add(int index, E element)`：在指定位置添加元素。
- `public E get(int index)`：获取指定位置的元素。
- `public E remove(int index)`：移除指定位置的元素。
- `public E set(int index, E element)`：修改指定位置的元素。

ArrayList 和 LinkedList 都是 List 集合的实现类，底层数据结构不同。

ArrayList 底层是数组结构，查询快，增删慢。

LinkedList 底层是双链表结构，查询慢，增删快，对首尾元素进行操作非常快。

LinkedList 特有方法：

- `public void addFirst(E e)`：在列表开头添加元素。
- `public void addLast(E e)`：在列表结尾添加元素。
- `public E getFirst()`：获取列表开头的元素。
- `public E getLast()`：获取列表结尾的元素。
- `public E removeFirst()`：移除并返回列表开头的元素。
- `public E removeLast()`：移除并返回列表结尾的元素。
- `public E pop()`：从此列表所表示的堆栈处弹出一个元素。

## Set 集合

Set 集合特点：无序：添加数据的顺序和获取数据的顺序不一致；不重复；无索引。

- HashSet：无序，不重复，无索引。
- LinkedHashSet：有序，不重复，无索引。
- TreeSet：排序，不重复，无索引。

JDK8 以前，HashSet 基于数组和链表实现。JDK8 以后，当链表长度大于 8 且数组长度 >= 64时，链表会转换为红黑树。

如果希望 Set 集合认为两个内容一样的对象是重复的，就需要重写对象的 hashCode 和 equals 方法。

TreeSet 如何排序自定义对象：

1. 让自定义类实现 Comparable 接口，重写 compareTo 方法。
2. 创建 TreeSet 时，传入一个比较器对象。

## 可变参数

可变参数是一种特殊的形参，定义在方法、构造器的形参列表里，格式是：`数据类型...参数名称`，用于灵活地接收数据。

- 可以不传，传多个数据，传数组。
- 可变参数在参数列表中只能有一个，且必须是参数列表的最后一个。
- 可变参数在方法内部本质上是一个数组。

```java
public class VarArgsDemo {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        System.out.println(sum(1, 2, 3)); // 6
        System.out.println(sum(arr)); // 6
    }

    public static int sum(int... arr) {
        int s = 0;
        for (int i : arr) {
            s += i;
        }
        return s;
    }
}
```

## Collections

Collections 是一个用来操作集合的工具类，提供了一系列静态方法，用于对集合进行操作。

- `public static <T> boolean addAll(Collection<? super T> c, T... elements)`：添加元素。
- `public static void shuffle(List<?> list)`：打乱顺序。
- `public static <T> void sort(List<T> list)`：排序。
- `public static <T> void sort(List<T> list, Comparator<? super T> c)`：根据指定的比较器产生的顺序对指定列表进行排序。

## Map 集合

Map 集合是一种存储键值对的集合，每个键最多只能映射到一个值。

Map 集合的常用实现类：HashMap、LinkedHashMap、TreeMap。

常用方法：

- `public V put(K key, V value)`：添加键值对。
- `public int size()`：获取集合的大小。
- `public void clear()`：清空集合。
- `public boolean isEmpty()`：判断集合是否为空。
- `public V remove(Object key)`：根据键删除键值对。
- `public V get(Object key)`：根据键获取值。
- `public boolean containsKey(Object key)`：判断集合中是否包含指定的键。
- `public boolean containsValue(Object value)`：判断集合中是否包含指定的值。
- `public Set<K> keySet()`：获取所有键的集合。
- `public Collection<V> values()`：获取所有值的集合。
- `public Map<K, V> putAll(Map<? extends K, ? extends V> m)`：将指定的 Map 集合中的所有映射关系复制到此 Map 集合中。
- `public Set<Map.Entry<K, V>> entrySet()`：获取所有键值对的集合。

## Stream

Stream 是 JDK8 开始引入的一个新特性，用于操作集合或者数组中的数据。

Stream 流大量的结合了 Lambda 的语法风格来编程，提供了一种更加简单，更加强大的方式来操作集合或者数组中的数据。代码更简洁，可读性更好。

获取 Stream 流的方式：

- 所有的 Collection 集合都可以通过 stream 默认方法获取流。
- 所有的数组都可以通过 Arrays 类的 stream 方法获取流。
- Stream 接口的静态方法 of 可以获取数组对应的流。

Stream 流常用的中间方法：

- `public Stream<T> filter(Predicate<? super T> predicate)`：对流中的数据进行过滤。
- `public Stream<T> limit(long maxSize)`：截取流中的前几个元素。
- `public Stream<T> skip(long n)`：跳过流中的前几个元素。
- `public Stream<R> map(Function<? super T, ? extends R> mapper)`：对流中的数据进行映射。
- `public Stream<T> sorted()`：对流中的数据进行排序。
- `public Stream<T> sorted(Comparator<? super T> comparator)`：对流中的数据进行排序。
- `public Stream<T> distinct()`：对流中的数据进行去重。
- `public <T> static Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)`：合并两个流。

Stream 流常见的终结方法：

- `public void forEach(Consumer<? super T> action)`：遍历流中的数据。
- `public long count()`：返回流中的数据个数。
- `public Object[] toArray()`：把流中的数据转换为数组。
- `public <R> R collect(Collector<? super T, A, R> collector)`：把流中的数据收集到集合中。
- `public Optional<T> min(Comparator<? super T> comparator)`：返回流中的最小值。
- `public Optional<T> max(Comparator<? super T> comparator)`：返回流中的最大值。

流只能收集一次。

## File

File 是 java.io.包下的类，File 类的对象，用于代表当前操作系统的文件（可以是文件、或文件夹）。

File 类只能对文件本身进行操作，不不能读写文件里面存储的数据。

绝对路径：以盘符开始的路径。

相对路径：相对于当前项目的根目录。

常用方法：

- `public boolean exists()`：判断文件或文件夹是否存在。
- `public boolean isDirectory()`：判断是否是文件夹。
- `public boolean isFile()`：判断是否是文件。
- `public String getName()`：获取文件或文件夹的名称。
- `public long length()`：获取文件的大小。
- `public long lastModified()`：获取文件最后一次修改时间。
- `public String getPath()`：获取文件或文件夹的路径。
- `public String getAbsolutePath()`：获取文件或文件夹的绝对路径。
- `public boolean createNewFile()`：创建文件。
- `public boolean mkdir()`：创建文件夹。
- `public boolean mkdirs()`：创建文件夹，可以创建多级文件夹。
- `public boolean delete()`：删除文件或空文件夹，不能删除非空文件夹。
- `public String[] list()`：获取文件夹中的所有文件或文件夹的名称数组。
- `public File[] listFiles()`：获取文件夹中的所有文件或文件夹的 File 对象数组。

## 字符集

- ASCII：美国标准信息交换码，用一个字节的7位可以表示。
- GBK：中国的中文编码表，最多两个字节编码。
- Unicode：国际标准编码，融合了几乎所有的字符编码表，为每个字符分配一个唯一的字符编码。
- UTF-8：变长的编码方式，英文一个字节，中文三个字节。

String 类编码解码：

- `public byte[] getBytes()`：使用平台的默认字符集将字符串编码为一系列字节。
- `public byte[] getBytes(String charsetName)`：使用指定的字符集将字符串编码为一系列字节。
- `public String(byte[] bytes)`：通过使用平台的默认字符集解码指定的字节数组，构造一个新的 String。
- `public String(byte[] bytes, String charsetName)`：通过指定的字符集解码指定的字节数组，构造一个新的 String。

## IO 流

用于读写数据的（可以读写文件，或网络中的数据）

按照流向分为：输入流、输出流。按照处理数据单位分为：字节流、字符流。

字节输入流：InputStream，实现类：FileInputStream
字节输出流：OutputStream，实现类：FileOutputStream
字符输入流：Reader，实现类：FileReader
字符输出流：Writer，实现类：FileWriter

## transient

transient 是 Java 的一个关键字，用于修饰成员变量，表示该成员变量不参与序列化。

## Junit

Junit 是一个 Java 的单元测试框架。常用注解：

- `@Test`：将一个普通的方法修饰成为一个测试方法。
- `@Before`：修饰实例方法，在测试方法之前执行。
- `@After`：修饰实例方法，在测试方法之后执行。
- `@BeforeClass`：修饰静态方法，在所有测试方法之前执行，只执行一次。
- `@AfterClass`：修饰静态方法，在所有测试方法之后执行，只执行一次。

## 反射 Reflect

Java 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性。

获取 Class 对象的三种方式：

- `public final class Object`：getClass() 方法。
- `Class c1 = 类名.class`：通过类名的属性 class 获取。
- `Class.forName("全类名")`：将类名作为字符串传入。

Class 提供了从类中获取构造器的方法：

- `public Constructor getConstructor(Class... parameterTypes)`：获取单个公有的构造方法。
- `public Constructor getDeclaredConstructor(Class... parameterTypes)`：获取单个构造方法。
- `public Constructor[] getConstructors()`：获取所有公有的构造方法。
- `public Constructor[] getDeclaredConstructors()`：获取所有构造方法。

根据获取的构造器对象，可以创建对象：

- `public T newInstance(Object... initargs)`：创建对象。
- `Constructor` 类的方法 `setAccessible(true)`：暴力反射。

从 Class 对象中获取成员变量：

- `public Field getField(String name)`：获取单个公有的成员变量。
- `public Field getDeclaredField(String name)`：获取单个成员变量。
- `public Field[] getFields()`：获取所有公有的成员变量。
- `public Field[] getDeclaredFields()`：获取所有成员变量。

根据获取的成员变量对象，可以操作成员变量：

- `public void set(Object obj, Object value)`：设置成员变量的值。
- `public Object get(Object obj)`：获取成员变量的值。
- `Field` 类的方法 `setAccessible(true)`：暴力反射。
- `Field` 类的方法 `getType()`：获取成员变量的类型。
- `Field` 类的方法 `getName()`：获取成员变量的名称。

从 Class 对象中获取成员方法：

- `public Method getMethod(String name, Class... parameterTypes)`：获取单个公有的成员方法。
- `public Method getDeclaredMethod(String name, Class... parameterTypes)`：获取单个成员方法。
- `public Method[] getMethods()`：获取所有公有的成员方法。
- `public Method[] getDeclaredMethods()`：获取所有成员方法。

根据获取的成员方法对象，可以操作成员方法：

- `public Object invoke(Object obj, Object... args)`：调用方法。
- `Method` 类的方法 `setAccessible(true)`：暴力反射。

## 注解 Annotation

注解是 Java 代码中的特殊标记，比如：@Override、@Test 等，作用是让其他程序根据注解信息来决定如何执行该程序。

注解可以用在类、构造器、方法、成员变量、方法参数、局部变量等。

自定义注解：

```java
public @interface 注解名 {
    public 属性类型 属性名() default 默认值;
}
```

如果注解中只有一个属性，且属性名为 value，那么使用注解时可以省略属性名。

```java
public @interface MyAnnotation {
    String value();
}

@MyAnnotation("abc")
public class MyAnnotationDemo {
}
```

元注解：用于修饰其他注解的注解。

@Target：声明被修饰的注解可以用在什么地方。

格式：`@Target({ElementType.TYPE, ElementType.METHOD})`

- ElementType.TYPE：类、接口、枚举。
- ElementType.METHOD：方法。
- ElementType.FIELD：成员变量。
- ElementType.PARAMETER：方法参数。
- ElementType.CONSTRUCTOR：构造方法。
- ElementType.LOCAL_VARIABLE：局部变量。
- ElementType.ANNOTATION_TYPE：注解。

@Retention：声明注解的保留周期。

格式：`@Retention(RetentionPolicy.RUNTIME)`

- RetentionPolicy.SOURCE：只作用在源码阶段，字节码文件中不存在
- RetentionPolicy.CLASS：保留到字节码阶段，运行阶段不存在
- RetentionPolicy.RUNTIME：一直保留到运行阶段。

解析注解：判断类上、方法上、成员变量上是否存在注解，并把注解里的内容给解析出来。

Class、Method、Field，Constructor、都实现了AnnotatedElement接口，它们都拥有解析注解的能力。

- `public Annotation[] getDeclaredAnnotations()`：获取所有的注解。
- `public <A extends Annotation> A getDeclaredAnnotation(Class<A> annotationClass)`：获取指定的注解。
- `public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)`：判断是否存在指定的注解。
