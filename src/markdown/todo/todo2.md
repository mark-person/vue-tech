
# 如果一个controller里有很多方法，不容易判断没关闭的连接
com.alibaba.druid.support.http.WebStatFilter(L97)
```
String myUrl = requestURI;
        if ("/RedseaOA/WorkFlow.mc".equals(requestURI) || "/RedseaOA/OaAffair.mc".equals(requestURI)) {
        	myUrl = requestURI + "?mehtod=" + httpRequest.getParameter("method");
        }
// 多个地方
WebURIStat uriStat = webAppStat.getURIStat(requestURI, false);
// 改成
WebURIStat uriStat = webAppStat.getURIStat(myUrl, false);
```

# /druid报错，可能是nginx的转发初禁了（集团），查看nginx错误日志
# /druid跳转到登录页，用户和密码在web.xml里
# 部分返回json的请求报错，改成反回xml没有错， 由于nginx的代理临时目录没有权限，请求post过大也是一样，查看nginx错误日志

# mysql5.7
花名册查询慢的问题，两个问题，1.一个小表没有索引，hr_staff_hire_salary.SALARY_ID(STAFF_ID关联外面) 2 set optimizer_switch='derived_merge=on'
(考勤管理-日报初始化程序用存过 使用了derived_merge=off)

# 多个red.sea.controller.CoreRquestController.getListFull
由sqlId:kq_rule_overtime_judge引起的/RedseaPlatform/getList/kq_rule_overtime_judge/CoreRequest.mc(16:14:02 - 17:59:27 超过60秒的有300563条)






