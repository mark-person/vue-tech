
### <img src="../../assets/18.png"/>至少保证代码是在本地运行过的
* 测试人员一般测试不出来，在特定条件下才运行的代码
    > * 拼出来的sql都是错的
    > * if语句忘了return，只打印信息
    > * 代码没有启动

### <img src="../../assets/18.png"/>接口稳定性
* 防止接口增加字段而造成接口不可用


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
                        
### 编程思维
* 思维:java(增删改查) python(完全统计) DB(索引)


### 日志太多
石药宕机问题：一个请求打印日志过多，一个请求2百多条日志(估计是在递归里调用的另一个有事务的方法，产生很多无用的日志)
control.MobileInterfaceControlWithCommon_OutWork:394
时间2020-02-07 00:00 - 8:30（一台机:6000个请求*200条日志*3行记录=360万行日志)
占了差不多三分之一的日志
高峰期：2020-02-07 07:33:16 - 08:12:23（一台机2300个请求*600行=138万行日志）
解决方法：不要打印无用的日志

### 工作流死循环


### 未重启成功引起内存溢出 数据库连接失败引起内存溢出 
表现:8百多万 LinkHashMap对象  1百多万annotaion对象 线程中没有red.sea....


### 代码最初的样子
```
explain SELECT kc.count_id,kc.staff_id,kc.staff_name,kc.time_num,kc.work_day,
  kc.kq_status_total,Fn_SelectNameByCode(kc.kq_status_total,'kq_count.KQSTATUS') kq_status_name,
  kc.cd_time,kc.zt_time,kc.kg_total_min,kc.yq_total_min,kc.sj_total_min,kc.qj_total_min,kc.ps_ot_min,kc.xx_ot_min,kc.jr_ot_min,
  kq_status,kq_status2,kq_status3,
  IF(kc.sb_dk_time IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,1,1,3),(SELECT kd.status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time LIMIT 1))sb_status_code,
  IF(kc.xb_dk_time IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,1,2,3),(SELECT kd.status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time LIMIT 1))xb_status_code,
  IF(kc.sb_dk_time2 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,2,1,3),(SELECT kd.status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time2 LIMIT 1))sb_status_code2,
  IF(kc.xb_dk_time2 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,2,2,3),(SELECT kd.status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time2 LIMIT 1))xb_status_code2,
  IF(kc.sb_dk_time3 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,3,1,3),(SELECT kd.status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time3 LIMIT 1))sb_status_code3,
  IF(kc.xb_dk_time3 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,3,2,3),(SELECT kd.status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time3 LIMIT 1))xb_status_code3,
  IF(kc.sb_dk_time IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,1,1,13),(SELECT IF(kd.addr_status='1','脱岗',Fn_SelectNameByCode(kd.status,'KQDATA.STATUS')) FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time LIMIT 1))sb_status,
  IF(kc.xb_dk_time IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,1,2,13),(SELECT IF(kd.addr_status='1','脱岗',Fn_SelectNameByCode(kd.status,'KQDATA.STATUS')) FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time LIMIT 1))xb_status,
  IF(kc.sb_dk_time2 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,2,1,13),(SELECT IF(kd.addr_status='1','脱岗',Fn_SelectNameByCode(kd.status,'KQDATA.STATUS')) FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time2 LIMIT 1))sb_status2,
  IF(kc.xb_dk_time2 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,2,2,13),(SELECT IF(kd.addr_status='1','脱岗',Fn_SelectNameByCode(kd.status,'KQDATA.STATUS')) FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time2 LIMIT 1))xb_status2,
  IF(kc.sb_dk_time3 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,3,1,13),(SELECT IF(kd.addr_status='1','脱岗',Fn_SelectNameByCode(kd.status,'KQDATA.STATUS')) FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time3 LIMIT 1))sb_status3,
  IF(kc.xb_dk_time3 IS NULL,Func_kq_count_SelectKQStatus(kc.count_id,3,2,13),(SELECT IF(kd.addr_status='1','脱岗',Fn_SelectNameByCode(kd.status,'KQDATA.STATUS')) FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time3 LIMIT 1))xb_status3,
  (SELECT CONCAT(Fn_SelectNameByCode(kd.status,'KQDATA.STATUS'),status_time,'分钟') FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time AND kd.status IN ('2','3','4') LIMIT 1)yc_sb_status,
  (SELECT CONCAT(Fn_SelectNameByCode(kd.status,'KQDATA.STATUS'),status_time,'分钟') FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time AND kd.status IN ('2','3','4') LIMIT 1)yc_xb_status,
  (SELECT CONCAT(Fn_SelectNameByCode(kd.status,'KQDATA.STATUS'),status_time,'分钟') FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time2 AND kd.status IN ('2','3','4') LIMIT 1)yc_sb_status2,
  (SELECT CONCAT(Fn_SelectNameByCode(kd.status,'KQDATA.STATUS'),status_time,'分钟') FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time2 AND kd.status IN ('2','3','4') LIMIT 1)yc_xb_status2,
  (SELECT CONCAT(Fn_SelectNameByCode(kd.status,'KQDATA.STATUS'),status_time,'分钟') FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time3 AND kd.status IN ('2','3','4') LIMIT 1)yc_sb_status3,
  (SELECT CONCAT(Fn_SelectNameByCode(kd.status,'KQDATA.STATUS'),status_time,'分钟') FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time3 AND kd.status IN ('2','3','4') LIMIT 1)yc_xb_status3,
  (SELECT kd.addr_status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time LIMIT 1)sb_addr_status,
  (SELECT kd.addr_status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time LIMIT 1)xb_addr_status,
  (SELECT kd.addr_status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time2 LIMIT 1)sb_addr_status2,
  (SELECT kd.addr_status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time2 LIMIT 1)xb_addr_status2,
  (SELECT kd.addr_status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.sb_dk_time3 LIMIT 1)sb_addr_status3,
  (SELECT kd.addr_status FROM kq_data kd WHERE kd.staff_id=kc.staff_id AND kd.kq_time=kc.xb_dk_time3 LIMIT 1)xb_addr_status3,
  Func_kq_count_SelectKQStatus(kc.count_id,1,12,11) kq_status_name1,
  IF(kc.time_num>=2,Func_kq_count_SelectKQStatus(kc.count_id,2,12,11),'') kq_status_name2,
  IF(kc.time_num>=3,Func_kq_count_SelectKQStatus(kc.count_id,3,12,11),'') kq_status_name3,
  DATE_FORMAT(kc.sb_dk_time,'%H:%i:%s') sb_time,
  DATE_FORMAT(kc.sb_dk_time2,'%H:%i:%s')sb_time2,
  DATE_FORMAT(kc.sb_dk_time3,'%H:%i:%s')sb_time3,
  DATE_FORMAT(kc.xb_dk_time,'%H:%i:%s') xb_time,
  DATE_FORMAT(kc.xb_dk_time2,'%H:%i:%s')xb_time2,
  DATE_FORMAT(kc.xb_dk_time3,'%H:%i:%s')xb_time3,
  kc.sb_dk_time,kc.sb_dk_time2,kc.sb_dk_time3,kc.xb_dk_time,kc.xb_dk_time2,kc.xb_dk_time3,
  kc.sb_dk_address,kc.sb_dk_address2,kc.sb_dk_address3,kc.xb_dk_address,kc.xb_dk_address2,kc.xb_dk_address3,
  kc.sb_dk_type,kc.sb_dk_type2,kc.sb_dk_type3,kc.xb_dk_type,kc.xb_dk_type2,kc.xb_dk_type3,
  IF(kc.bc_id='4','休息',kb.bc_name) bc_name,kb.bc_code,kb.bc_id,kb.begin_time bc_begin_time,kb.end_time bc_end_time,
  kb.p1_sb_time,kb.p1_xb_time,kb.p1_if_sb_dk,kb.p1_if_xb_dk,
  kb.p2_sb_time,kb.p2_xb_time,kb.p2_if_sb_dk,kb.p2_if_xb_dk,
  kb.p3_sb_time,kb.p3_xb_time,kb.p3_if_sb_dk,kb.p3_if_xb_dk,
  k.period_order,k.abnormal_type,Fn_SelectNameByCode(k.abnormal_type,'kq_count_abnormal_abnormal_type') abnormal_name,k.fk_id businessKey,k.fk_id2,k.sub_type,
  (SELECT t.vacation_type_name FROM kq_vacation_type t WHERE t.vacation_type=k.sub_type AND t.root_id=kc.root_id LIMIT 1) leave_name,
  IF(k.adjust_minute<>0,k.adjust_minute,k.abnormal_minute) abnormal_minute,
  IFNULL(k.add_begin_time,k.begin_time) begin_date_time,IFNULL(k.add_end_time,k.end_time) end_date_time,
  DATE_FORMAT(IFNULL(k.add_begin_time,k.begin_time),'%H:%i:%s') begin_time,DATE_FORMAT(IFNULL(k.add_end_time,k.end_time),'%H:%i:%s') end_time,
  ph.holiday_id,ph.holiday_name,ph.dateType,
  IF(IFNULL(ph.dateType,'')='',IF(kb.bc_id='4' OR IFNULL(kb.bc_id,'')='','休息日','工作日'),
     Fn_SelectNameByCode(ph.dateType,'pt_holiday_dateType')) datetypename,kt.TEAM_NAME,kt.dk_num_type,kt.dk_onenum_type
FROM kq_count kc LEFT JOIN kq_banci kb ON kc.bc_id = kb.bc_id
  LEFT JOIN kq_team kt ON kc.team_id = kt.TEAM_ID
  LEFT JOIN kq_count_abnormal k ON kc.count_id = k.count_id AND k.is_comfirm='2'
  LEFT JOIN kq_work_date kw ON kc.work_date_id = kw.work_date_id
  LEFT JOIN pt_holiday ph ON kw.holiday_id = ph.holiday_id AND ph.date=kc.work_day
WHERE kc.staff_id= '' AND kc.work_day= ''
```



