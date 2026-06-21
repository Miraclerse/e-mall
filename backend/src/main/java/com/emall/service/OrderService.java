package com.emall.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.emall.entity.Order;

import java.util.List;

public interface OrderService extends IService<Order> {

    Order createOrder(Order order);

    Order getByOrderNo(String orderNo);

    List<Order> getOrdersByStatus(Integer status);

    boolean updateOrderStatus(String orderNo, Integer status);

    boolean deleteOrder(Long id);

    List<Order> getAllOrders();
}