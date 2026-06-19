package com.emall.controller;

import com.emall.dto.LoginDTO;
import com.emall.entity.Admin;
import com.emall.service.AdminService;
import com.emall.util.JwtUtil;
import com.emall.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Result<?> login(@RequestBody LoginDTO loginDTO) {
        Admin admin = adminService.login(loginDTO.getUsername(), loginDTO.getPassword());
        if (admin == null) {
            return Result.error("用户名或密码错误");
        }

        String token = jwtUtil.generateToken(admin.getId(), admin.getUsername());
        return Result.success(token);
    }

    @GetMapping("/verify")
    public Result<?> verifyToken(@RequestHeader("Authorization") String token) {
        try {
            jwtUtil.parseToken(token);
            return Result.success("Token有效");
        } catch (Exception e) {
            return Result.error("Token无效或已过期");
        }
    }
}