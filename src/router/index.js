import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/LoginPage/Login.vue';
import Home from '@/components/HomePage/Home.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  }
]

const router = new VueRouter({
  routes
});

// 挂载路由守护
router.beforeEach((to, from, next) => {
  // to将要方位的路径
  // from从哪个路径跳转
  // next 放行   next()   next('/login') // 强制跳转
  if (to.path === '/login') return next();
  // 获取token
  const token = sessionStorage.getItem('token');
  if (!token) return next('/login');
  next();
})

export default router
