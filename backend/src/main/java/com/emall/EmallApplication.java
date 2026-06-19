package com.emall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmallApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmallApplication.class, args);
        System.out.println("==========================================");
        System.out.println("  E-Mall 后台服务启动成功！");
        System.out.println("  API地址: http://localhost:8080/api");
        System.out.println("  默认账号: admin / 密码: admin123");
        System.out.println("==========================================");
    }
}