

# 工作流测试进入死循环，造成内存溢出
```
 at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lred/sea/ws/bean/MessagePushExt;Ljava/lang/String;Ljava/util/List;Ljava/lang/String;)V (WfProcessServiceImpl.java:595)
  at red.sea.workFlow.processDefine.wfProcess.service.impl.WfProcessServiceImpl.doRunMockComplete(Lre

```


# 配置化缺少rootId，内存溢出
```
  at red.sea.hr.custommodule.hrmodulepropertypagecol.dao.impl.HrModulePropertyPageColJdbcDao.getAllHrModulePropertyPageColNoPage(Ljava/util/Map;)Ljava/util/List; (HrModulePropertyPageColJdbcDao.java:226)
  at red.sea.hr.custommodule.hrmodulepropertypagecol.service.impl.HrModulePropertyPageColServiceImpl.getAllHrModulePropertyPageColNoPage(Ljava/util/Map;)Ljava/util/List; (HrModulePropertyPageColServiceImpl.java:136)

red.sea.hr.custommodule.hrmodulepropertypagecol.data.HrModulePropertyPageCol 对象数量 822,223 objects
```

# redis
1.没有关闭，造成登录报！号 (get redis connect的连接卡住)
```

连接不对()
关闭不对
```

# rabbitMq
```
关闭不对，连接不对
```

# 连接的参数被修改，一个是编码，一个是参数优化
* 处理石药在tomcat连接慢的问题，应该是navicat改了优化器 set optimizer_switch='derived_merge=on'; set optimizer_switch='derived_merge=off';

# 数据库内存溢出 
* 总内存超出范围

# 应用被kill
* 总内存超出范围（数据库配置总内存过高）
* rabbitMq连接过高，5千多，占了大量的内存

# 代码只更新一半
* sqlID, 页面没有加密， 后面已经解密

# 菜单检测问题
* 4分钟，变两小时
* 跟vpn同一台机

# 一个高频请求日志过多
循环里调用事务


# 隆基泰和正式cpu高
Thread 6934: (state = IN_JAVA)
Error occurred during stack walking:
不用转换tid
```
[root@localhost ~]# ps -mp 4849 -o THREAD,tid,time | sort -k2r
USER     %CPU PRI SCNT WCHAN  USER SYSTEM   TID     TIME
ehr       6.0  19    - futex_    -      -  6934 01:14:28
ehr       4.6  19    - futex_    -      -  6852 00:57:32
ehr      40.0   -    - -         -      -     - 08:15:42
ehr       3.7  19    - futex_    -      -  6907 00:45:52
ehr       3.7  19    - futex_    -      -  6886 00:46:38
ehr       2.6  19    - futex_    -      -  6931 00:32:30
ehr       2.6  19    - -         -      -  6937 00:32:19
ehr       2.4  19    - futex_    -      -  6918 00:29:52
ehr       2.3  19    - futex_    -      -  6889 00:28:30
ehr       2.3  19    - futex_    -      -  6885 00:28:54
ehr       2.3  19    - futex_    -      -  6850 00:28:33
```









