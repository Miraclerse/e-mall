import request from '../utils/request'

export function adminLogin(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}

export function verifyToken() {
    return request({
        url: '/admin/verify',
        method: 'get'
    })
}