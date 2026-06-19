package com.emall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.emall.entity.Product;
import com.emall.mapper.ProductMapper;
import com.emall.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {

    @Override
    public IPage<Product> getProductList(Integer page, Integer size, String name, Integer status) {
        Page<Product> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();

        if (StringUtils.hasText(name)) {
            wrapper.like(Product::getName, name);
        }
        if (status != null) {
            wrapper.eq(Product::getStatus, status);
        }
        wrapper.orderByDesc(Product::getUpdateTime);

        return this.page(pageParam, wrapper);
    }

    @Override
    public Product getProductById(Long id) {
        return this.getById(id);
    }

    @Override
    public boolean addProduct(Product product) {
        return this.save(product);
    }

    @Override
    public boolean updateProduct(Product product) {
        return this.updateById(product);
    }

    @Override
    public boolean deleteProduct(Long id) {
        return this.removeById(id);
    }

    @Override
    public boolean toggleStatus(Long id) {
        Product product = this.getById(id);
        if (product == null) {
            return false;
        }
        product.setStatus(product.getStatus() == 1 ? 0 : 1);
        return this.updateById(product);
    }
}