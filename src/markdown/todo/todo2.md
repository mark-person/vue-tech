
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





