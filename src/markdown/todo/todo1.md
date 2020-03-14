

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















