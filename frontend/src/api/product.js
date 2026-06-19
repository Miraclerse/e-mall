import request from '../utils/request'

export function getProductList(params) {
    return request({
        url: '/product/list',
        method: 'get',
        params
    })
}

export function getProductDetail(id) {
    return request({
        url: `/product/${id}`,
        method: 'get'
    })
}

export function addProduct(data) {
    return request({
        url: '/product/add',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function updateProduct(data) {
    return request({
        url: '/product/update',
        method: 'put',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function deleteProduct(id) {
    return request({
        url: `/product/delete/${id}`,
        method: 'delete'
    })
}

export function toggleProductStatus(id) {
    return request({
        url: `/product/toggle/${id}`,
        method: 'put'
    })
}