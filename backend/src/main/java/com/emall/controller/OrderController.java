package com.emall.controller;

import cn.hutool.core.util.IdUtil;
import com.emall.entity.Order;
import com.emall.entity.Product;
import com.emall.service.OrderService;
import com.emall.service.ProductService;
import com.emall.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    /**
     * 创建订单
     */
    @PostMapping("/create")
    public Result<?> createOrder(@RequestParam Long productId,
                                 @RequestParam(defaultValue = "1") Integer quantity,
                                 @RequestParam(required = false) String buyerName,
                                 @RequestParam(required = false) String buyerPhone) {
        try {
            Product product = productService.getProductById(productId);
            if (product == null || product.getStatus() == 0) {
                return Result.error("商品不存在或已下架");
            }

            String orderNo = IdUtil.getSnowflakeNextIdStr();
            BigDecimal totalAmount = product.getPrice().multiply(new BigDecimal(quantity));

            Order order = new Order();
            order.setOrderNo(orderNo);
            order.setProductId(productId);
            order.setProductName(product.getName());
            order.setQuantity(quantity);
            order.setTotalAmount(totalAmount);
            order.setBuyerName(buyerName);
            order.setBuyerPhone(buyerPhone);
            order.setStatus(0); // 待付款

            orderService.createOrder(order);
            return Result.success(order);

        } catch (Exception e) {
            e.printStackTrace();
            return Result.error("创建订单失败：" + e.getMessage());
        }
    }

    /**
     * 查询订单详情
     */
    @GetMapping("/{orderNo}")
    public Result<?> getOrder(@PathVariable String orderNo) {
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            return Result.error("订单不存在");
        }
        return Result.success(order);
    }

    /**
     * 确认付款（用户点击"我已付款"）
     */
    @PostMapping("/pay/{orderNo}")
    public Result<?> confirmPay(@PathVariable String orderNo) {
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            return Result.error("订单不存在");
        }
        if (order.getStatus() != 0) {
            return Result.error("订单状态异常，无法支付");
        }
        boolean success = orderService.updateOrderStatus(orderNo, 1);
        if (success) {
            return Result.success("付款确认成功");
        }
        return Result.error("确认付款失败");
    }

    /**
     * 取消订单
     */
    @PostMapping("/cancel/{orderNo}")
    public Result<?> cancelOrder(@PathVariable String orderNo) {
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            return Result.error("订单不存在");
        }
        if (order.getStatus() != 0) {
            return Result.error("该订单已支付或已取消，无法取消");
        }
        boolean success = orderService.updateOrderStatus(orderNo, 2);
        if (success) {
            return Result.success("订单已取消");
        }
        return Result.error("取消订单失败");
    }

    /**
     * 删除订单（仅限已取消或已付款的订单）
     */
    @DeleteMapping("/delete/{orderNo}")
    public Result<?> deleteOrder(@PathVariable String orderNo) {
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            return Result.error("订单不存在");
        }
        // 只有已取消(2)或已付款(1)的订单才能删除
        if (order.getStatus() == 0) {
            return Result.error("待付款订单不能删除，请先取消订单");
        }
        boolean success = orderService.deleteOrder(order.getId());
        if (success) {
            return Result.success("订单删除成功");
        }
        return Result.error("删除订单失败");
    }

    /**
     * 获取所有订单（后台管理用）
     */
    @GetMapping("/list")
    public Result<?> getOrderList() {
        List<Order> orders = orderService.getAllOrders();
        return Result.success(orders);
    }
}