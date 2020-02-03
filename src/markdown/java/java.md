
### <img src="../../assets/18.png"/>必须关掉打开资源(数据库连接、网络接口和邮件接口等)
* 不关掉的后果
> 1. 数据库连接池满，宕机
> 2. 内存溢出，宕机
* 关闭方式1
```java
final Resource resource = acquire();
try {
    use(resource);
} finally {
    resource.release();
}
```
* 关闭方式2(自动关闭)
```java 
try (FileOutputStream f = null;) {
}
```
* 案例：没关闭httpclient连接，内存溢出java.lang.ref.Finalizer对象Retained Heap=1.79G
    > * 参考：https://www2014.aspxhtml.com/post-4748 
    > * 搜索: The class "java.lang.ref.Finalizer", loaded by "<system class loader>"

### <img src="../../assets/18.png"/>递归方法必须防止死循环(树型数据结构)
* 案例：菜单表的垃圾数据的id="" parentId=""造成死循环，
引起内存溢出，内存日志里：java.lang.String -> item java.util.LinkedList$Node -> next java...
java.lang.String(2千万个对象)
* 解决方法
    > * 传递变量进行控制，比如递归50次后就结束调用，直接返回结果，使程序有终止点。
    > * 判断传人参数合法性，是否有多处重复数据。
* 相似案例：考勤机传入1969年的数据，引起入库报错，卡住

### <img src="../../assets/18.png"/>SQL非拼装需求时不能使用Map
* 需要显式使用column_name = ?, 否则可能在页面没有传值情况或攻击时，造成内存溢出

### 造成内存溢出的一些案例
* 全部数据载入内存再统计(数据量少时没问题，数据量大了就卡顿，并造成内存溢出)
* 大量数据没分页，或者分页写错了
* 业务主表中有大字段











