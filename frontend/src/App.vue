<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
}
#app {
  width: 100%;
  min-height: 100vh;
}

/* ===== 导航栏通用样式 ===== */
.navbar {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 16px 0;
}
.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.logo-icon { font-size: 32px; }
.logo-text { font-size: 24px; font-weight: 700; color: #1a1a2e; }
.nav-actions { display: flex; align-items: center; gap: 16px; }
.search-input { width: 300px; }
.admin-btn { white-space: nowrap; }
.nav-btn { white-space: nowrap; }

/* ===== 首页样式 ===== */
.home-container {
  min-height: 100vh;
  background: #f5f7fa;
}
.banner-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px 0;
}
.banner-item {
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  position: relative;
}
.banner-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 100%);
  border-radius: 16px;
}
.banner-content {
  position: relative;
  z-index: 1;
  color: #fff;
  max-width: 500px;
}
.banner-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.banner-desc {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 24px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.activity-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.section-header h2 {
  font-size: 24px;
  color: #1a1a2e;
}
.section-more {
  color: #999;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}
.section-more:hover { color: #409eff; }
.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.activity-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.activity-icon { font-size: 36px; flex-shrink: 0; }
.activity-info h3 { font-size: 16px; color: #1a1a2e; margin-bottom: 4px; }
.activity-info p { font-size: 13px; color: #999; margin-bottom: 8px; line-height: 1.4; }
.activity-tag {
  display: inline-block;
  background: #f0f7ff;
  color: #409eff;
  font-size: 12px;
  padding: 2px 12px;
  border-radius: 12px;
}
.recommend-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 40px;
}
.product-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff6b6b;
  color: #fff;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}
.footer {
  text-align: center;
  padding: 32px 20px;
  color: #999;
  font-size: 14px;
  border-top: 1px solid #eee;
}

/* ===== 商品列表样式 ===== */
.front-container { min-height: 100vh; background: #f5f7fa; }
.main-content { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  overflow: hidden;
}
.product-image img { width: 100%; height: 100%; object-fit: cover; }
.product-status {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}
.product-info { padding: 16px; }
.product-name {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a2e;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product-price { font-size: 20px; font-weight: 700; color: #e74c3c; }
.pagination-wrapper { margin-top: 32px; display: flex; justify-content: center; }
.empty-state { padding: 80px 0; text-align: center; }
.detail-content { display: flex; gap: 32px; }
.detail-image {
  flex: 1;
  max-width: 300px;
  height: 300px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}
.detail-image img { width: 100%; height: 100%; object-fit: cover; }
.detail-info { flex: 2; }
.detail-name { font-size: 22px; color: #1a1a2e; margin-bottom: 12px; }
.detail-price { font-size: 28px; font-weight: 700; color: #e74c3c; margin-bottom: 16px; }
.detail-desc { color: #666; line-height: 1.6; margin-bottom: 16px; }

/* ===== 后台登录样式 ===== */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-box {
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.login-header { text-align: center; margin-bottom: 32px; }
.login-icon { font-size: 48px; display: block; margin-bottom: 12px; }
.login-header h2 { font-size: 24px; color: #1a1a2e; margin-bottom: 8px; }
.login-header p { color: #999; font-size: 14px; }
.login-btn { width: 100%; }
.login-footer { margin-top: 16px; display: flex; justify-content: space-between; align-items: center; color: #999; font-size: 13px; }

/* ===== 后台管理样式 ===== */
.admin-container { display: flex; min-height: 100vh; }
.sidebar {
  width: 220px;
  background: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.sidebar-logo span:first-child { font-size: 28px; }
.sidebar-nav { flex: 1; padding: 16px 12px; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255,255,255,0.7);
  transition: all 0.3s;
}
.nav-item:hover { background: rgba(255,255,255,0.1); color: #fff; }
.nav-item.active { background: rgba(255,255,255,0.15); color: #fff; }
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.sidebar-footer .el-button {
  color: rgba(255,255,255,0.7);
  width: 100%;
  justify-content: center;
}
.sidebar-footer .el-button:hover { color: #fff; }
.main-content {
  flex: 1;
  margin-left: 220px;
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.content-header h2 { font-size: 22px; color: #1a1a2e; }
.search-bar { display: flex; align-items: center; }
.pagination-wrapper { margin-top: 20px; display: flex; justify-content: flex-end; }

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .nav-content { flex-direction: column; gap: 12px; }
  .search-input { width: 200px; }
  .product-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  .detail-content { flex-direction: column; }
  .detail-image { max-width: 100%; height: 200px; }
  .sidebar { width: 60px; }
  .sidebar-logo span:last-child { display: none; }
  .nav-item span { display: none; }
  .main-content { margin-left: 60px; }
  .banner-item { padding: 0 24px; }
  .banner-title { font-size: 24px; }
  .banner-desc { font-size: 14px; }
  .activity-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .activity-grid { grid-template-columns: 1fr; }
}
</style>