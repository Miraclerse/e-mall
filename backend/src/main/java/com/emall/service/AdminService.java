package com.emall.service;

import com.emall.entity.Admin;

public interface AdminService {
    Admin findByUsername(String username);
    Admin login(String username, String password);
}