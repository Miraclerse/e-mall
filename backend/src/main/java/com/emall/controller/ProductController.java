package com.emall.controller;

import com.emall.entity.Product;
import com.emall.service.ProductService;
import com.emall.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/list")
    public Result<?> listProducts(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer status) {

        return Result.success(productService.getProductList(page, size, name, status));
    }

    @GetMapping("/{id}")
    public Result<?> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return Result.error("商品不存在");
        }
        return Result.success(product);
    }

    @PostMapping("/add")
    public Result<?> addProduct(
            @RequestParam String name,
            @RequestParam BigDecimal price,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile file) {

        try {
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            product.setDescription(description);
            product.setStatus(1);

            if (file != null && !file.isEmpty()) {
                String imageUrl = uploadImage(file);
                product.setImageUrl(imageUrl);
            }

            boolean success = productService.addProduct(product);
            return success ? Result.success("添加成功") : Result.error("添加失败");
        } catch (Exception e) {
            return Result.error("添加失败：" + e.getMessage());
        }
    }

    @PutMapping("/update")
    public Result<?> updateProduct(
            @RequestParam Long id,
            @RequestParam String name,
            @RequestParam BigDecimal price,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) Integer status) {

        try {
            Product product = productService.getProductById(id);
            if (product == null) {
                return Result.error("商品不存在");
            }

            product.setName(name);
            product.setPrice(price);
            product.setDescription(description);
            if (status != null) {
                product.setStatus(status);
            }

            if (file != null && !file.isEmpty()) {
                String imageUrl = uploadImage(file);
                product.setImageUrl(imageUrl);
            }

            boolean success = productService.updateProduct(product);
            return success ? Result.success("更新成功") : Result.error("更新失败");
        } catch (Exception e) {
            return Result.error("更新失败：" + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public Result<?> deleteProduct(@PathVariable Long id) {
        boolean success = productService.deleteProduct(id);
        return success ? Result.success("删除成功") : Result.error("删除失败");
    }

    @PutMapping("/toggle/{id}")
    public Result<?> toggleStatus(@PathVariable Long id) {
        boolean success = productService.toggleStatus(id);
        return success ? Result.success("状态切换成功") : Result.error("状态切换失败");
    }

    private String uploadImage(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + suffix;

        String uploadPath = System.getProperty("user.dir") + "/uploads/";
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File dest = new File(uploadPath + newFileName);
        file.transferTo(dest);

        return "/uploads/" + newFileName;
    }
}