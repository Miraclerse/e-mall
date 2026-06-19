package com.emall.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.emall.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {

    @Update("UPDATE product SET status = 1 WHERE id = #{id}")
    int putOnShelf(@Param("id") Long id);

    @Update("UPDATE product SET status = 0 WHERE id = #{id}")
    int putOffShelf(@Param("id") Long id);
}