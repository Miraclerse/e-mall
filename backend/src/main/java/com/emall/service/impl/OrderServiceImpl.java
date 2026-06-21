package com.emall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.emall.entity.Order;
import com.emall.mapper.OrderMapper;
import com.emall.service.OrderService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {

    @Override
    public Order createOrder(Order order) {
        order.setCreateTime(LocalDateTime.now());
        order.setStatus(0); // 待付款
        this.save(order);
        return order;
    }

    @Override
    public Order getByOrderNo(String orderNo) {
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Order::getOrderNo, orderNo);
        return this.getOne(wrapper);
    }

    @Override
    public List<Order> getOrdersByStatus(Integer status) {
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Order::getStatus, status);
        wrapper.orderByDesc(Order::getCreateTime);
        return this.list(wrapper);
    }

    @Override
    public boolean updateOrderStatus(String orderNo, Integer status) {
        Order order = this.getByOrderNo(orderNo);
        if (order == null) {
            return false;
        }
        order.setStatus(status);
        if (status == 1) {
            order.setPayTime(LocalDateTime.now());
        }
        return this.updateById(order);
    }

    @Override
    public boolean deleteOrder(Long id) {
        return this.removeById(id);
    }

    @Override
    public List<Order> getAllOrders() {
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(Order::getCreateTime);
        return this.list(wrapper);
    }
}