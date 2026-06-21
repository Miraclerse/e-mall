-- 创建数据库
CREATE DATABASE IF NOT EXISTS emall DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE emall;

-- 管理员表
CREATE TABLE admin (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                       username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
                       password VARCHAR(100) NOT NULL COMMENT '密码（加密存储）',
                       nickname VARCHAR(50) COMMENT '昵称',
                       create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                       update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- 插入默认管理员（密码：admin123，需使用BCrypt加密）
INSERT INTO admin (username, password, nickname) VALUES
    ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iK8l5ZGy', '超级管理员');

-- 商品表
CREATE TABLE product (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
                         name VARCHAR(100) NOT NULL COMMENT '商品名称',
                         price DECIMAL(10,2) NOT NULL COMMENT '商品价格',
                         description VARCHAR(500) COMMENT '商品描述',
                         image_url VARCHAR(255) COMMENT '图片URL',
                         status TINYINT DEFAULT 1 COMMENT '状态：1-上架，0-下架',
                         create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                         update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 插入测试数据
INSERT INTO product (name, price, description, image_url, status) VALUES
                                                                      ('iPhone 15 Pro Max', 9999.00, 'A17 Pro芯片，钛金属边框，全新操作按钮', '/upload/iphone15.jpg', 1),
                                                                      ('MacBook Pro 16', 18999.00, 'M2 Pro芯片，16英寸Liquid视网膜XDR显示屏', '/upload/macbook.jpg', 1),
                                                                      ('AirPods Pro 2', 1899.00, '自适应降噪，空间音频，H2芯片', '/upload/airpods.jpg', 1),
                                                                      ('iPad Air 5', 4799.00, 'M1芯片，10.9英寸全面屏，支持Apple Pencil', '/upload/ipad.jpg', 1),
                                                                      ('Samsung S24 Ultra', 8999.00, 'AI赋能，2亿像素，S Pen内置', '/upload/samsung.jpg', 1),
                                                                      ('Sony WH-1000XM5', 2999.00, '旗舰降噪，30小时续航，轻量化设计', '/upload/sony.jpg', 0);
USE emall;
UPDATE admin SET password = '$2a$10$Et7ount2s3Ash1/DSHILMOB2XHZm4xt9TF0bNLnEzhYsR1wt32b9m' WHERE username = 'admin';

-- 订单表
CREATE TABLE orders (
                        id BIGINT PRIMARY KEY AUTO_INCREMENT,
                        order_no VARCHAR(32) NOT NULL UNIQUE COMMENT '商户订单号',
                        product_id BIGINT NOT NULL COMMENT '商品ID',
                        product_name VARCHAR(100) NOT NULL COMMENT '商品名称',
                        quantity INT DEFAULT 1 COMMENT '购买数量',
                        total_amount DECIMAL(10,2) NOT NULL COMMENT '订单金额（元）',
                        buyer_name VARCHAR(50) COMMENT '购买人姓名',
                        buyer_phone VARCHAR(20) COMMENT '购买人电话',
                        status TINYINT DEFAULT 0 COMMENT '0-待付款 1-已付款 2-已取消',
                        pay_time DATETIME COMMENT '付款时间',
                        remark VARCHAR(255) COMMENT '备注',
                        create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 订单表
USE emall;
DROP TABLE IF EXISTS orders;=utf8mb4 COMMENT='订单表';

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
                        id BIGINT PRIMARY KEY AUTO_INCREMENT,
                        order_no VARCHAR(32) NOT NULL UNIQUE,
                        product_id BIGINT NOT NULL,
                        product_name VARCHAR(100) NOT NULL,
                        quantity INT DEFAULT 1,
                        total_amount DECIMAL(10,2) NOT NULL,
                        buyer_name VARCHAR(50),
                        buyer_phone VARCHAR(20),
                        status TINYINT DEFAULT 0,
                        pay_time DATETIME,
                        remark VARCHAR(255),
                        create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);