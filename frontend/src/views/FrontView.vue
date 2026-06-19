<template>
  <div class="front-container">
    <h1>🛒 E-Mall 商品展示</h1>
    <p>欢迎来到 E-Mall 商城</p>
    <el-button type="primary" @click="goToAdmin">进入后台管理</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAdmin = () => {
  router.push('/admin/login')
}
</script>

<style scoped>
.front-container {
  text-align: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: #f5f7fa;
}
h1 {
  font-size: 42px;
  color: #1a1a2e;
  margin-bottom: 16px;
}
p {
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
}
</style>