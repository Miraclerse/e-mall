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
