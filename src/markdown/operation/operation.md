
### <img src="../../assets/18.png"/>java项目启动必备参数
~~~shell script
# 当出现HeapDumpOnOutOfMemoryError错误时,导出内存溢出的堆信息(hprof文件)
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/usr/local/log/tomcat8082.hprof
~~~
* java内存分析工具: java自带bin/jvisualvm.exe 或 eclipse Memory Analyzer Tool(MAT)

### <img src="../../assets/18.png"/>java内存报警，但没有打印内存溢出的堆信息
```shell script
# 打印内存信息
jmap -dump:format=b,file=e.hprof pid
```

### <img src="../../assets/18.png"/>java CPU报警
```shell script
# 打印高cpu java代码，PID=31915 TID=31968 NEW_TID=7ce0 
ps -mp 31915 -o THREAD,tid,time | sort -k2r
printf "%x \n" 31968
jstack -l 31915 | grep 7ce0 -A 30
```
* 常见问题
    > * 高cpu线程为socket, 并发太高
    > * 常见问题大量mysql read0线程，优化慢SQL

### <img src="../../assets/18.png"/>打不开页面，卡住
```shell script
# 打印线程信息
jstack -l PID > thread.txt
```

### 打印实时内存
```shell script
jstat -gcutil PID 2000

jmap -heap PID

```

### 打PID,除了ps aux|grep java
```
jps
```

### mongodb
```shell script
# 删除数据后，执行下面语句才释放空间
db.repairDatabase()
```

### nginx的Host配置
nginx配置proxy_set_header  Host  $host;
配置错误和配置两个

### rewriteBatchedStatements=true 
添加rewriteBatchedStatements=true这个参数后的执行速度比较：
同个表插入一万条数据时间近似值：
JDBC BATCH 1.1秒左右 > Mybatis BATCH 2.2秒左右 > 拼接SQL 4.5秒左右






