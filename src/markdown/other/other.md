
### <img src="../../assets/18.png"/>至少保证代码是在本地运行过的
* 测试人员一般测试不出来，在特定条件下才运行的代码
    > * 拼出来的sql都是错的
    > * if语句忘了return，只打印信息
    > * 代码没有启动

### 问题：浏览器拦截了body为200多k的异步请求，直接请求可以
* 解决：可能是nginx对64k处理不一样，加上去缓存代码

### 问题：客户那边的360或chrome浏览器open跳到其他页("可能是#问题")
* 解决：浏览器open处理不了复杂的页面，改简单 去掉RedseaPlatform/PtPortal.mc?method=worktoday#iframe&0&&

### 连接池druid的问题(请求次数较多的时候造成内存溢出)
```xml
<!-- druid 页面监控器 -->
<!-- 记录URI所有执行过的SQL， 非常消耗内存和性能！！ -->
<init-param>
    <param-name>profileEnable</param-name>
    <param-value>true</param-value>
</init-param>
```
* 测试问题重现：同一个url每次都执行不同sql, 造成druid的ProfileEntry*对象变多
内存日志: com.alibaba.druid.support.profile.ProfileEntryStat(数量:1,228,807)
com.alibaba.druid.support.profile.ProfileEntryKey(数量:1,228,812)
* 解决：<param-value>true</param-value>改成<param-value>false</param-value>
* druid另外存在的问题:druid内存记录所有重复的SQL(配置的合并开关已开)

### 内存对象org.springframework.core.annotation.AnnotationAttributes数量=2,670,817
* 解决：定时器服务器连接数据库失败引起服务不停的重启，造成大量AnnotationAttributes

### 页面卡顿，并有很多请求
* 解决：Ajax complete异步返回修改返回内容，document.write出ajax请求
* 相似案例：一个页面并发70多个请求，造成后端socket异常

### 内存里org.apache.xmlbeans.impl.store.Xobj$AttrXobj（4百多万）和org.apache.xmlbeans.impl.store.Xobj$ElementXobj（1百多万）
* 解决：XSSFWorkbook导出中每个格子都setStyle后不会释放内存

### 宕机，报大量的dubbo找不到类异常
* 解决：dubbo设计问题，找不到类用Error(线程终止)可以防止宕机，而不是使用Exception

### 本地服务启动卡住没报错
* 解决：打印线程，查看代码运行到哪一步，然后修改源码，打印错误处，原因:jar包不完整

### 在linux中，启动报卡住没报错
* 解决: 打包代码回本地运行，报连接mongdb异常，原因：配置错误

### 打不开页面，卡住
* 解决：打印线程，连接数据库read0占满100个，找慢SQL或加连接参数

### 在linux中，服务启动慢(启动要一小时)
* 解决：看启动日志，dubbo耗时在读取计算机名时，修改hosts,注意ip4,ip6

### 超时控制漏斗原则：尽量保持交易线上前端系统超时设置大于后端系统
* nginx: proxy_read_timeout=90 连接成功后_等候后端服务器响应时间_其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）
* WebSphere线程超时时间600秒
* 报错，业务员重新操作，造成多发了500万现金券

### 定时器调用没有运行(代码没有启动)
* 解决：缺少startCron方法

### 浏览器报叹号警告
* 客户拦截特殊字符
* 请求body过大，去缓存解决

### 新装系统登录失败, 每个请求头自动加上Cache
* 解决：服务器加上自动加上缓存代打印线程码，找客户要求去掉

### 部分乱码
* 查看binlog有修改字符集的代码(代码或存储过程中)

### 处理大数据时，sequence再循环，出现相同值
* java maxInt, mysql maxInt, oracle sequence
* java和oracle会循环，mysql会报错
                        



