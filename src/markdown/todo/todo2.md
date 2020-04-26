
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








