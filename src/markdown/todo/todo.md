

# 打印日志过多
现象：java新生代未满，年老代已满，卡住，没有内存溢出日志
石药宕机问题：一个高频请求打印日志过多，一个请求2百多条日志(估计是在递归里调用的另一个有事务的方法，产生很多无用的日志)
control.MobileInterfaceControlWithCommon_OutWork:394
时间2020-02-07 00:00 - 8:30（一台机:6000个请求*200条日志*3行记录=360万行日志)
占了差不多三分之一的日志
高峰期：2020-02-07 07:33:16 - 08:12:23（一台机2300个请求*600行=138万行日志）
解决方法：不要打印无用的日志

# tocmat卡死,数据库事务锁没有sql
```
"http-bio-8701-exec-246" daemon prio=10 tid=0x00007fd624003800 nid=0x36dc runnable [0x00007fd610e9a000]
   java.lang.Thread.State: RUNNABLE
	at java.net.SocketInputStream.socketRead0(Native Method)
	at java.net.SocketInputStream.read(SocketInputStream.java:152)
	at java.net.SocketInputStream.read(SocketInputStream.java:122)
	at com.mysql.jdbc.util.ReadAheadInputStream.fill(ReadAheadInputStream.java:100)
	at com.mysql.jdbc.util.ReadAheadInputStream.readFromUnderlyingStreamIfNecessary(ReadAheadInputStream.java:143)
	at com.mysql.jdbc.util.ReadAheadInputStream.read(ReadAheadInputStream.java:173)
	- locked <0x00000007d31d1710> (a com.mysql.jdbc.util.ReadAheadInputStream)
	at com.mysql.jdbc.MysqlIO.readFully(MysqlIO.java:2911)
	at com.mysql.jdbc.MysqlIO.reuseAndReadPacket(MysqlIO.java:3337)
	at com.mysql.jdbc.MysqlIO.reuseAndReadPacket(MysqlIO.java:3327)
	at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3814)
	at com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2435)
	at com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2582)
	at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2526)
	- locked <0x00000007d31ca5b0> (a com.mysql.jdbc.JDBC4Connection)
	at com.mysql.jdbc.ConnectionImpl.setAutoCommit(ConnectionImpl.java:4846)
	- locked <0x00000007d31ca5b0> (a com.mysql.jdbc.JDBC4Connection)
	at com.alibaba.druid.filter.FilterChainImpl.connection_setAutoCommit(FilterChainImpl.java:553)
	at com.alibaba.druid.filter.FilterAdapter.connection_setAutoCommit(FilterAdapter.java:984)
	at com.alibaba.druid.filter.FilterChainImpl.connection_setAutoCommit(FilterChainImpl.java:549)
	at com.alibaba.druid.proxy.jdbc.ConnectionProxyImpl.setAutoCommit(ConnectionProxyImpl.java:430)
	at com.alibaba.druid.pool.DruidPooledConnection.setAutoCommit(DruidPooledConnection.java:686)
	at org.springframework.jdbc.datasource.DataSourceTransactionManager.doCleanupAfterCompletion(DataSourceTransactionManager.java:313)
	at org.springframework.transaction.support.AbstractPlatformTransactionManager.cleanupAfterCompletion(AbstractPlatformTransactionManager.java:1009)
	at org.springframework.transaction.support.AbstractPlatformTransactionManager.processCommit(AbstractPlatformTransactionManager.java:805)
	at org.springframework.transaction.support.AbstractPlatformTransactionManager.commit(AbstractPlatformTransactionManager.java:724)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.commitTransactionAfterReturning(TransactionAspectSupport.java:475)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:270)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:94)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:96)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:260)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:94)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:91)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:204)
	at com.sun.proxy.$Proxy416.getAllHrRosterColNoPage(Unknown Source)
	at red.sea.hr.custommodule.HrModuleTempletFactory.getListCol(HrModuleTempletFactory.java:56)
	at red.sea.hr.customRoster.roster.controller.HrRosterController.getRosterListNew(HrRosterController.java:1169)
	at sun.reflect.GeneratedMethodAccessor1246.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:606)
```
临时解决方案：加大缓存区，mysql连接后面加&tcpRcvBuf=1024000
长期解决方案(需要分业务类型，长请求，短请求)：mysql连接配置socketTimeout


# 考勤匹配
```sql
SELECT kc.count_id,kc.staff_id,kc.staff_name,kc.time_num,kc.work_day,
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





