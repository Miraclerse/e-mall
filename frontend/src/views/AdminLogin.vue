<template>
  <div class="login-container">
    <div class="login-box">
      <h1>🔐</h1>
      <h2>后台管理系统</h2>
      <p>请输入管理员账号登录</p>
      <el-input
          v-model="username"
          placeholder="用户名"
          size="large"
          style="margin-bottom: 16px;"
      />
      <el-input
          v-model="password"
          type="password"
          placeholder="密码"
          size="large"
          style="margin-bottom: 16px;"
          @keyup.enter="handleLogin"
      />
      <el-button type="primary" size="large" style="width: 100%;" @click="handleLogin">
        登 录
      </el-button>
      <div style="margin-top: 16px; font-size: 13px; color: #999;">
        默认账号: admin / 密码: admin123
        <el-button type="text" @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { adminLogin } from '../api/admin'

const router = useRouter()
const username = ref('admin')
const password = ref('admin123')

const handleLogin = async () => {
  try {
    const res = await adminLogin({ username: username.value, password: password.value })
    if (res.code === 200) {
      localStorage.setItem('adminToken', res.data)
      ElMessage.success('登录成功')
      router.push('/admin/manage')
    } else {
      ElMessage.error(res.message || '登录失败')
    }
  } catch (error) {
    ElMessage.error('登录失败')
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-box {
  background: white;
  padding: 48px 40px;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
h1 {
  font-size: 48px;
  margin-bottom: 12px;
}
h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 8px;
}
p {
  color: #999;
  margin-bottom: 24px;
}
</style>