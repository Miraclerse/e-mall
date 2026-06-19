import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

// ============ 首页组件 ============
const HomeView = {
    template: `
      <div class="home-container">
        <!-- 顶部导航 -->
        <nav class="navbar">
          <div class="nav-content">
            <div class="logo" @click="goHome">
              <span class="logo-icon">🛒</span>
              <span class="logo-text">E-Mall</span>
            </div>
            <div class="nav-actions">
              <el-button type="primary" @click="goToProducts" class="nav-btn">
                <el-icon><Goods /></el-icon>
                全部商品
              </el-button>
              <el-button type="primary" @click="goToAdmin" class="admin-btn">
                <el-icon><Setting /></el-icon>
                管理后台
              </el-button>
            </div>
          </div>
        </nav>

        <!-- 轮播图 Banner -->
        <div class="banner-section">
          <el-carousel height="400px" indicator-position="outside">
            <el-carousel-item v-for="(banner, index) in banners" :key="index">
              <div class="banner-item" :style="{ backgroundImage: 'url(' + banner.image + ')' }">
                <div class="banner-content">
                  <h1 class="banner-title">{{ banner.title }}</h1>
                  <p class="banner-desc">{{ banner.desc }}</p>
                  <el-button type="primary" size="large" @click="goToProducts">
                    查看详情→
                  </el-button>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 活动福利区 -->
        <div class="activity-section">
          <div class="section-header">
            <h2>🎉 限时活动</h2>
            <span class="section-more">更多活动 →</span>
          </div>
          <div class="activity-grid">
            <div class="activity-card" v-for="(activity, index) in activities" :key="index">
              <div class="activity-icon">{{ activity.icon }}</div>
              <div class="activity-info">
                <h3>{{ activity.title }}</h3>
                <p>{{ activity.desc }}</p>
                <span class="activity-tag">{{ activity.tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 热销推荐 -->
        <div class="recommend-section">
          <div class="section-header">
            <h2>🔥 热销推荐</h2>
            <span class="section-more" @click="goToProducts">查看全部 →</span>
          </div>
          <div class="product-grid" v-loading="loading">
            <div
                v-for="product in recommendProducts"
                :key="product.id"
                class="product-card"
                @click="showDetail(product)"
            >
              <div class="product-image">
                <img :src="product.imageUrl || defaultImage" :alt="product.name" />
                <span class="product-badge" v-if="product.isHot">🔥 热销</span>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 商品详情弹窗 -->
        <el-dialog v-model="detailVisible" :title="currentProduct?.name" width="600px">
          <div class="detail-content" v-if="currentProduct">
            <div class="detail-image">
              <img :src="currentProduct.imageUrl || defaultImage" :alt="currentProduct.name" />
            </div>
            <div class="detail-info">
              <h2 class="detail-name">{{ currentProduct.name }}</h2>
              <p class="detail-price">¥{{ currentProduct.price.toFixed(2) }}</p>
              <p class="detail-desc">{{ currentProduct.description || '暂无描述' }}</p>
              <el-tag :type="currentProduct.status === 1 ? 'success' : 'info'">
                {{ currentProduct.status === 1 ? '已上架' : '已下架' }}
              </el-tag>
            </div>
          </div>
        </el-dialog>

        <!-- 底部 -->
        <footer class="footer">
          <p>© 2026 E-Mall 电商平台 | 桂林理工大学 网络系统开发与设计</p>
        </footer>
      </div>
    `,
    data() {
        return {
            loading: false,
            detailVisible: false,
            currentProduct: null,
            defaultImage: 'https://via.placeholder.com/300x300?text=No+Image',
            banners: [
                {
                    image: '/images/碎梦.jpg',
                    title: '全新刺客职业',
                    desc: '牛逼克拉斯'
                },
                {
                    image: 'https://picsum.photos/1200/400?random=2',
                    title: '🎧 限时特惠',
                    desc: 'AirPods Pro 2 直降300元，自适应降噪，空间音频'
                },
                {
                    image: 'https://picsum.photos/1200/400?random=3',
                    title: '💻 开学季大促',
                    desc: 'MacBook Pro 学生专享价，M2 Pro芯片，性能强劲'
                }
            ],
            activities: [
                {
                    icon: '🎁',
                    title: '新用户专享',
                    desc: '首次注册送100元优惠券，全场通用',
                    tag: '限新用户'
                },
                {
                    icon: '🔥',
                    title: '限时秒杀',
                    desc: '每日10点/14点/20点，爆款商品低至5折',
                    tag: '进行中'
                },
                {
                    icon: '💳',
                    title: '信用卡优惠',
                    desc: '使用指定银行信用卡支付，满1000减50',
                    tag: '银行合作'
                },
                {
                    icon: '📦',
                    title: '满减专区',
                    desc: '满299减30，满599减80，满999减150',
                    tag: '限时优惠'
                }
            ],
            recommendProducts: []
        }
    },
    mounted() {
        this.loadRecommendProducts()
    },
    methods: {
        async loadRecommendProducts() {
            this.loading = true
            try {
                const response = await fetch('/api/product/list?page=1&size=4&status=1')
                const res = await response.json()
                if (res.code === 200) {
                    this.recommendProducts = (res.data.records || []).map((p, i) => ({
                        ...p,
                        isHot: i < 2
                    }))
                }
            } catch (error) {
                console.error('加载推荐商品失败', error)
            } finally {
                this.loading = false
            }
        },
        showDetail(product) {
            this.currentProduct = product
            this.detailVisible = true
        },
        goToProducts() {
            this.$router.push('/products')
        },
        goToAdmin() {
            this.$router.push('/admin/login')
        },
        goHome() {
            this.$router.push('/')
        }
    }
}

// ============ 前台商品列表组件 ============
const FrontView = {
    template: `
      <div class="front-container">
        <nav class="navbar">
          <div class="nav-content">
            <div class="logo" @click="goHome">
              <span class="logo-icon">🛒</span>
              <span class="logo-text">E-Mall</span>
            </div>
            <div class="nav-actions">
              <el-input
                  v-model="searchKeyword"
                  placeholder="搜索商品..."
                  class="search-input"
                  size="large"
                  @keyup.enter="loadProducts"
              >
                <template #append>
                  <el-button @click="loadProducts">
                    <el-icon><Search /></el-icon>
                  </el-button>
                </template>
              </el-input>
              <el-button type="primary" @click="goHome" class="nav-btn">
                <el-icon><HomeFilled /></el-icon>
                首页
              </el-button>
              <el-button type="primary" @click="goToAdmin" class="admin-btn">
                <el-icon><Setting /></el-icon>
                管理后台
              </el-button>
            </div>
          </div>
        </nav>

        <div class="main-content">
          <div class="product-grid" v-loading="loading">
            <div
                v-for="product in productList"
                :key="product.id"
                class="product-card"
                @click="showDetail(product)"
            >
              <div class="product-image">
                <img :src="product.imageUrl || defaultImage" :alt="product.name" />
                <span class="product-status" v-if="product.status === 0">已下架</span>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <div v-if="!loading && productList.length === 0" class="empty-state">
            <el-empty description="暂无商品" />
          </div>

          <div class="pagination-wrapper" v-if="total > 0">
            <el-pagination
                v-model:current-page="page.current"
                v-model:page-size="page.size"
                :page-sizes="[8, 12, 20]"
                layout="total, sizes, prev, pager, next"
                :total="total"
                @size-change="loadProducts"
                @current-change="loadProducts"
            />
          </div>
        </div>

        <el-dialog v-model="detailVisible" :title="currentProduct?.name" width="600px">
          <div class="detail-content" v-if="currentProduct">
            <div class="detail-image">
              <img :src="currentProduct.imageUrl || defaultImage" :alt="currentProduct.name" />
            </div>
            <div class="detail-info">
              <h2 class="detail-name">{{ currentProduct.name }}</h2>
              <p class="detail-price">¥{{ currentProduct.price.toFixed(2) }}</p>
              <p class="detail-desc">{{ currentProduct.description || '暂无描述' }}</p>
              <el-tag :type="currentProduct.status === 1 ? 'success' : 'info'">
                {{ currentProduct.status === 1 ? '已上架' : '已下架' }}
              </el-tag>
            </div>
          </div>
        </el-dialog>
      </div>
    `,
    data() {
        return {
            loading: false,
            searchKeyword: '',
            productList: [],
            total: 0,
            page: { current: 1, size: 8 },
            detailVisible: false,
            currentProduct: null,
            defaultImage: 'https://via.placeholder.com/300x300?text=No+Image'
        }
    },
    mounted() {
        this.loadProducts()
    },
    methods: {
        async loadProducts() {
            this.loading = true
            try {
                const response = await fetch(`/api/product/list?page=${this.page.current}&size=${this.page.size}&name=${this.searchKeyword || ''}`)
                const res = await response.json()
                if (res.code === 200) {
                    this.productList = res.data.records || []
                    this.total = res.data.total || 0
                }
            } catch (error) {
                ElMessage.error('加载商品失败')
            } finally {
                this.loading = false
            }
        },
        showDetail(product) {
            this.currentProduct = product
            this.detailVisible = true
        },
        goToAdmin() {
            this.$router.push('/admin/login')
        },
        goHome() {
            this.$router.push('/')
        }
    }
}

// ============ 后台登录组件 ============
const AdminLogin = {
    template: `
        <div class="login-container">
            <div class="login-box">
                <div class="login-header">
                    <span class="login-icon">🔐</span>
                    <h2>后台管理系统</h2>
                    <p>请输入管理员账号登录</p>
                </div>
                <el-form ref="formRef" :model="loginForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" prefix-icon="Lock" show-password @keyup.enter="handleLogin" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="large" :loading="loading" @click="handleLogin" class="login-btn">
                            登 录
                        </el-button>
                    </el-form-item>
                </el-form>
                <div class="login-footer">
                    <span>默认账号: admin / 密码: admin123</span>
                    <el-button type="text" @click="goHome">返回首页</el-button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            loginForm: { username: 'admin', password: 'admin123' },
            loading: false,
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        async handleLogin() {
            this.loading = true
            try {
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.loginForm)
                })
                const res = await response.json()
                if (res.code === 200) {
                    localStorage.setItem('adminToken', res.data)
                    ElMessage.success('登录成功')
                    this.$router.push('/admin/manage')
                } else {
                    ElMessage.error(res.message || '登录失败')
                }
            } catch (error) {
                ElMessage.error('登录失败，请检查网络')
            } finally {
                this.loading = false
            }
        },
        goHome() {
            this.$router.push('/')
        }
    }
}

// ============ 后台管理组件 ============
const AdminManage = {
    template: `
        <div class="admin-container">
            <aside class="sidebar">
                <div class="sidebar-logo">
                    <span>📦</span>
                    <span>E-Mall 管理</span>
                </div>
                <nav class="sidebar-nav">
                    <div class="nav-item active">
                        <el-icon><Goods /></el-icon>
                        <span>商品管理</span>
                    </div>
                </nav>
                <div class="sidebar-footer">
                    <el-button type="danger" text @click="handleLogout">
                        <el-icon><SwitchButton /></el-icon>
                        退出登录
                    </el-button>
                </div>
            </aside>

            <main class="main-content">
                <header class="content-header">
                    <h2>商品管理</h2>
                    <el-button type="primary" @click="openAddDialog">
                        <el-icon><Plus /></el-icon>
                        新增商品
                    </el-button>
                </header>

                <div class="search-bar">
                    <el-input v-model="searchName" placeholder="搜索商品名称" clearable style="width: 280px" @clear="loadProducts">
                        <template #append>
                            <el-button @click="loadProducts">
                                <el-icon><Search /></el-icon>
                            </el-button>
                        </template>
                    </el-input>
                    <el-select v-model="searchStatus" placeholder="全部状态" clearable style="width: 140px; margin-left: 12px" @change="loadProducts">
                        <el-option label="已上架" :value="1" />
                        <el-option label="已下架" :value="0" />
                    </el-select>
                </div>

                <el-table :data="tableData" border stripe v-loading="loading" style="margin-top: 16px">
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column label="图片" width="100">
                        <template #default="{ row }">
                            <el-image :src="row.imageUrl || defaultImage" fit="cover" style="width: 60px; height: 60px; border-radius: 4px" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称" min-width="150" />
                    <el-table-column prop="price" label="价格" width="120">
                        <template #default="{ row }">
                            ¥{{ row.price.toFixed(2) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
                    <el-table-column label="状态" width="100">
                        <template #default="{ row }">
                            <el-tag :type="row.status === 1 ? 'success' : 'info'">
                                {{ row.status === 1 ? '上架' : '下架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="280" fixed="right">
                        <template #default="{ row }">
                            <el-button size="small" :type="row.status === 1 ? 'warning' : 'success'" @click="toggleStatus(row)">
                                {{ row.status === 1 ? '下架' : '上架' }}
                            </el-button>
                            <el-button size="small" type="primary" @click="openEditDialog(row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination-wrapper">
                    <el-pagination
                        v-model:current-page="page.current"
                        v-model:page-size="page.size"
                        :page-sizes="[5, 10, 20]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        @size-change="loadProducts"
                        @current-change="loadProducts"
                    />
                </div>
            </main>

            <el-dialog v-model="dialogVisible" :title="dialogTitle" width="560px" destroy-on-close>
                <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入商品名称" />
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input-number v-model="formData.price" :precision="2" :min="0" :max="999999" />
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="formData.description" type="textarea" rows="3" placeholder="请输入商品描述" />
                    </el-form-item>
                    <el-form-item label="图片">
                        <input type="file" @change="handleFileChange" accept="image/*" />
                        <div v-if="formData.imageUrl" style="margin-top: 8px;">
                            <span>当前图片：</span>
                            <img :src="formData.imageUrl" alt="当前图片" style="height: 60px; border-radius: 4px;" />
                        </div>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" :loading="submitLoading" @click="submitForm">确定</el-button>
                </template>
            </el-dialog>
        </div>
    `,
    data() {
        return {
            loading: false,
            submitLoading: false,
            searchName: '',
            searchStatus: null,
            tableData: [],
            total: 0,
            page: { current: 1, size: 10 },
            dialogVisible: false,
            dialogTitle: '新增商品',
            isEdit: false,
            uploadFile: null,
            defaultImage: 'https://via.placeholder.com/60x60?text=No+Image',
            formRef: null,
            formData: {
                id: null,
                name: '',
                price: 0,
                description: '',
                imageUrl: '',
                status: 1
            },
            formRules: {
                name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                price: [{ required: true, message: '请输入价格', trigger: 'blur' }]
            }
        }
    },
    mounted() {
        this.loadProducts()
        const token = localStorage.getItem('adminToken')
        if (!token) {
            this.$router.push('/admin/login')
        }
    },
    methods: {
        getToken() {
            return localStorage.getItem('adminToken') || ''
        },
        async loadProducts() {
            this.loading = true
            try {
                const params = new URLSearchParams({
                    page: this.page.current,
                    size: this.page.size
                })
                if (this.searchName) params.append('name', this.searchName)
                if (this.searchStatus !== null && this.searchStatus !== undefined) {
                    params.append('status', this.searchStatus)
                }
                const response = await fetch(`/api/product/list?${params}`, {
                    headers: { 'Authorization': this.getToken() }
                })
                const res = await response.json()
                if (res.code === 200) {
                    this.tableData = res.data.records || []
                    this.total = res.data.total || 0
                } else if (res.code === 401) {
                    localStorage.removeItem('adminToken')
                    this.$router.push('/admin/login')
                }
            } catch (error) {
                ElMessage.error('加载商品失败')
            } finally {
                this.loading = false
            }
        },
        async toggleStatus(row) {
            try {
                const response = await fetch(`/api/product/toggle/${row.id}`, {
                    method: 'PUT',
                    headers: { 'Authorization': this.getToken() }
                })
                const res = await response.json()
                if (res.code === 200) {
                    row.status = row.status === 1 ? 0 : 1
                    ElMessage.success('状态切换成功')
                } else {
                    ElMessage.error(res.message || '状态切换失败')
                }
            } catch (error) {
                ElMessage.error('操作失败')
            }
        },
        handleDelete(id) {
            ElMessageBox.confirm('确定要删除该商品吗？删除后不可恢复。', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    const response = await fetch(`/api/product/delete/${id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': this.getToken() }
                    })
                    const res = await response.json()
                    if (res.code === 200) {
                        ElMessage.success('删除成功')
                        this.loadProducts()
                    } else {
                        ElMessage.error(res.message || '删除失败')
                    }
                } catch (error) {
                    ElMessage.error('操作失败')
                }
            }).catch(() => {})
        },
        openAddDialog() {
            this.isEdit = false
            this.dialogTitle = '新增商品'
            this.formData = { id: null, name: '', price: 0, description: '', imageUrl: '', status: 1 }
            this.uploadFile = null
            this.dialogVisible = true
        },
        openEditDialog(row) {
            this.isEdit = true
            this.dialogTitle = '编辑商品'
            this.formData = { ...row }
            this.uploadFile = null
            this.dialogVisible = true
        },
        handleFileChange(event) {
            this.uploadFile = event.target.files[0]
        },
        async submitForm() {
            this.submitLoading = true
            try {
                const form = new FormData()
                form.append('name', this.formData.name)
                form.append('price', this.formData.price)
                if (this.formData.description) form.append('description', this.formData.description)
                if (this.uploadFile) form.append('file', this.uploadFile)

                let url = '/api/product/add'
                let method = 'POST'
                if (this.isEdit) {
                    url = '/api/product/update'
                    method = 'PUT'
                    form.append('id', this.formData.id)
                    form.append('status', this.formData.status)
                }

                const response = await fetch(url, {
                    method: method,
                    headers: { 'Authorization': this.getToken() },
                    body: form
                })
                const res = await response.json()
                if (res.code === 200) {
                    ElMessage.success(this.isEdit ? '更新成功' : '添加成功')
                    this.dialogVisible = false
                    this.loadProducts()
                } else {
                    ElMessage.error(res.message || '操作失败')
                }
            } catch (error) {
                ElMessage.error('操作失败')
            } finally {
                this.submitLoading = false
            }
        },
        handleLogout() {
            ElMessageBox.confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                localStorage.removeItem('adminToken')
                this.$router.push('/admin/login')
                ElMessage.success('已退出')
            }).catch(() => {})
        }
    }
}

// ============ 路由配置 ============
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/products',
        name: 'Products',
        component: FrontView
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/admin/manage',
        name: 'AdminManage',
        component: AdminManage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/admin/manage') {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            next('/admin/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router