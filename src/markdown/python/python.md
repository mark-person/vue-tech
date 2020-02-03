
### <img src="../../assets/18.png"/>连接客户服务器频率不能过高
* 解决方法：优化代码，在一个连接中多次操作


### 常用方法
```python
# with...as... 与 try...finally...
# with open('a.txt', 'w') as f:
# open()中产生的异常不能捕获 with只能捕获pass部分的异常
# with 语句适用于对资源进行访问的场合，确保不管使用过程中是否发生异常都会执行必要的“清理”操作，释放资源。

def append(filename, content):
    with open(filename, 'a+') as f:
        f.writelines(content + '\n')


def now():
    return time.strftime("%Y-%m-%d %H:%M:%S")


def zip_file():
    try:
        z = zipfile.ZipFile(r'E:\python\zip\abc.zip', 'w')
        file_name1 = r'E:\python\zip\doc\1.txt'
        file_name2 = r'E:\python\zip\doc\2.txt'
        z.write(file_name1, "1.txt", compress_type=zipfile.ZIP_DEFLATED)
        z.write(file_name2, "2.txt", compress_type=zipfile.ZIP_DEFLATED)
        return 0, "打包成功"
    except IOError as e:
        return 1, "打包异常:%s"
    finally:
        if 'z' in dir():
            z.close()

```

### 远程执行命令(无密码登录)
* 注意连接次数，优化代码（频率太高客户服务器可能会拦截）
```python
import paramiko
import time
# PRIVATE_KEY_PATH = r'/root/.ssh/id_rsa'
PRIVATE_KEY_PATH = r'C:\Users\LENOVO\.ssh\id_rsa'
# 注：循环执行不能调用该方法，需要在方法里面循环执行
def exe_cmd(cmd_str):
    begin_time = time.clock()
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        paramiko.util.log_to_file('paramiko.log')
        key = paramiko.RSAKey.from_private_key_file(PRIVATE_KEY_PATH)
        client.load_system_host_keys()
        client.connect(hostname='193.112.136.240', port=22, username='root', pkey=key);
        file_path = "/tmp/sqlfile/1.sql"
        cmd = "export MYSQL_PWD=%s && /home/ppx/mysql/bin/mysql --force -u%s -h%s -P%s %s --comments < %s" % \
              ("123456", "root", "localhost", "3306", "repository", file_path)
        stdin, stdout, stderr = client.exec_command(cmd)
        err_read = stderr.read();
        if err_read != '':
            return 0, 1, err_read.decode('utf-8')
        return 0, 0, stdout.read().decode("utf-8")
    except Exception as e:
        return 1, "异常:%s" % e
    finally:
        client.close()
```

### 远程上传文件(无密码登录)
```python
def put_sql_file(local_file, remote_file, hostname, username, port):
    _begin_time = time.clock()
    try:
        s = paramiko.SSHClient()
        paramiko.util.log_to_file('paramiko.log')
        key = paramiko.RSAKey.from_private_key_file(PRIVATE_KEY_PATH)
        s.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        s.load_system_host_keys()
        s.connect(hostname, port, username, pkey=key)
        t = s.get_transport()
        sftp = paramiko.SFTPClient.from_transport(t)
        sftp.put(local_file, remote_file)
        return 0, "上传成功:%s 用时:%s" % (remote_file, (time.clock() - _begin_time))
    except Exception as e:
        return 1, "上传失败:%s，请检查, 异常:%s" % (local_file, e)
    finally:
        s.close()
```

### 操作数据库
```python
import pymysql


# 注：循环执行不能调用该方法，需要在方法里面循环执行
def update_status():
    try:
        conn = pymysql.connect(host="localhost", user="root", password="123456",
             database="jiaolong_test", charset="utf8")
        update_sql = """
            update test set test_name = %s where test_id = %s
        """
        with conn.cursor() as insert_cur:
            insert_cur = conn.cursor();
            insert_cur.execute(update_sql, ["gogo004", 1])
        conn.commit();
        return 0, ''
    except Exception as e:
        return 1, e
    finally:
        if 'conn' in dir():
            conn.close()

```





