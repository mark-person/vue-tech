
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

### <img src="../../assets/18.png"/>打不开页面，卡住
```shell script
# 打印线程信息
jstack -l PID > thread.txt
```

### mongodb
```shell script
# 删除数据后，执行下面语句才释放空间
db.repairDatabase()
```