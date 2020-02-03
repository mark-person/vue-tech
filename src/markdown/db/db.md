
### 尽量让SQL简单，不带多余没用语句
* mysql5.x 优化器比mysql8和oracle差的地方
```sql
select * from pt_users where user_id = ? order by create_time 
```
用了explain select *...会发现mysql5.x会多出Using filesort(mysql8和oracle不会)
* 相似案例(参考《数据库设计规范（19-11-06）》)
    > * COUNT后面的子查询中的SELECT没有意义, 分页语句分两条写
    > * 用子查询，写法不规范, 关联了多余的表，或者用错关联字段


# 如何从数据库设计来解决数据库性能问题（展望未来）
* 不要过度设计，关注需求
* 多备用一张王牌，关键时可以出（数据量大的时候）
* 目标:
    > * 会3NF
    > * 会抽象和继承
    > * 会用powerdesigner的CDM(概念数据模型)

### 1.数据量大的表需要考虑的问题
mysql以block为单位加载到内存
* 字段长度，int作主键占4个字节空间优于varchar(36)，找最新记录时可直接用主键排序
* 大字段需要考虑另外创建表，根据实际情况，可使用继承或使用md5作主键(oracle可使用只存指针方式)
* 尽量满足3NF, 一些影响性能的反模式:
    > * 没主键
    > * 用type字段的合并多个表(如个人会员，企业会员，是两个不同的实体，规范设计：个人会员和企业会员继承会员表)
    > * 用,分格数据
 
### 2.powerdesigner
* 1. 新建CDM(Conceptual Data Model)文件
* 2. 创建Domain(Domains help you identify the types of information in your model)，
防止乱用数据类型；反例：ID值一会是varchar(32), 一会是varchar(36)
* 3. 创建一个通用字段表：创建人，创建时间，修改人，修改时间。
防止这些字段不统一；反例：9096数据库有一百多种不同可能是创建时间或修改时间字段名称，正常应该是2个
* 4. 会使用多对多，一对多，多对一设计，除了容易看懂图,
还可以防止字段不对应; 反例: 表1的A_ID对应表2的B_ID
* 5. 按F4, Check Model, 尽量达到0警告
* 6. 高级设计，会抽象和继承，就是防止一个if写到底，数据库卡死
* 7. TOOLS -> Generate Physical Data Model



















