# 🛒 E-Mall 电商展示系统     

基于 Spring Boot + Vue 3 的轻量级商品展示与后台管理系统。
  
## 📋 项目简介              

E-Mall 是一个用于商品信息展示和后台管理的 Web 应用系统。主要功能包括：

- 前台商品展示（首页轮播图、活动福利、热销推荐、商品列表）
- 后台管理（商品增删改查、上架/下架、图片上传）
- 管理员登录认证（JWT Token）

## ✨ 技术栈                    

### 后端
- Java 17
- Spring Boot 2.7.14
- MyBatis-Plus 3.5.3.1
- MySQL 8.0
- JWT 认证
- BCrypt 密码加密

### 前端
- Vue 3
- Element Plus
- Vue Router
- Axios

## 🚀 快速启动                 
             

### 1. 数据库配置

创建数据库并执行 `database/schema.sql`：

```sql
CREATE DATABASE IF NOT EXISTS emall;
USE emall;

修改 backend/src/main/resources/application.yml 中的数据库连接信息：

yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/emall
    username: root
    password: 你的密码
 ``` 
### 2. 启动后端                  

cd backend
mvn spring-boot:run
后端运行在：http://localhost:8080/api

### 3. 启动前端                 

cd frontend
npm install
npm run serve
前端运行在：http://localhost:8082

### 4. 访问系统                 

页面	地址
首页	http://localhost:8082/
商品列表	http://localhost:8082/products
后台登录	http://localhost:8082/admin/login
后台管理	http://localhost:8082/admin/manage
默认账号: admin / admin123

## 📁 项目结构                  

e-mall/
├── backend/                    # 后端 Spring Boot 项目
│   ├── src/main/java/com/emall/
│   │   ├── config/             # 配置类（跨域、安全、拦截器）
│   │   ├── controller/         # 控制器层
│   │   ├── service/            # 业务逻辑层
│   │   ├── mapper/             # 数据访问层
│   │   ├── entity/             # 实体类
│   │   ├── dto/                # 数据传输对象
│   │   ├── util/               # 工具类（JWT、结果封装）
│   │   └── interceptor/        # 拦截器
│   └── pom.xml
│
├── frontend/                   # 前端 Vue 3 项目
│   ├── src/
│   │   ├── router/index.js     # 路由配置（包含所有页面组件）
│   │   ├── api/                # API 请求封装
│   │   └── utils/request.js    # Axios 配置
│   ├── public/                 # 静态资源
│   └── package.json
│
└── database/
    └── schema.sql              # 数据库建表脚本

## 📸 功能预览                   

### 首页        

轮播图展示主要商品

活动福利卡片

热销推荐商品

### 商品列表                    

卡片式商品展示

搜索功能

分页浏览

点击查看详情

### 后台管理                      

管理员登录

商品增删改查

图片上传

上架/下架切换

## 📝 API 接口                 

接口	方法	说明
/api/admin/login	POST	管理员登录
/api/product/list	GET	商品列表（分页）
/api/product/{id}	GET	商品详情
/api/product/add	POST	新增商品
/api/product/update	PUT	更新商品
/api/product/delete/{id}	DELETE	删除商品
/api/product/toggle/{id}	PUT	切换上架/下架

## 📄 课程信息                    

课程名称: 网络系统开发与设计

学校: 桂林理工大学

## 📜 许可证                      

仅供学习交流使用
