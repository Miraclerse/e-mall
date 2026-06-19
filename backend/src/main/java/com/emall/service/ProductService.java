package com.emall.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.emall.entity.Product;

public interface ProductService {
    IPage<Product> getProductList(Integer page, Integer size, String name, Integer status);
    Product getProductById(Long id);
    boolean addProduct(Product product);
    boolean updateProduct(Product product);
    boolean deleteProduct(Long id);
    boolean toggleStatus(Long id);
}