import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: '/api',
    timeout: 30000
})

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('adminToken')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 401) {
            ElMessage.error(res.message || '登录已过期，请重新登录')
            localStorage.removeItem('adminToken')
            window.location.href = '/admin/login'
            return Promise.reject(new Error(res.message))
        }
        return res
    },
    error => {
        ElMessage.error(error.message || '请求失败')
        return Promise.reject(error)
    }
)

export default request