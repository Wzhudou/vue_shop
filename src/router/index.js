import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/LoginPage/Login.vue';
import Home from '@/components/HomePage/Home.vue';
import Welcome from '@/components/Welcome/Welcome.vue';
import Users from '@/components/user/Users.vue';
import Rights from '@/components/power/rights/Rights.vue';
import Roles from '@/components/power/roles/Roles.vue';
import Cate from '@/components/goods/Cate.vue';
import Params from '@/components/goods/Params.vue';
import List from '@/components/goods/List.vue';
import Add from '@/components/goods/Add.vue';
import Order from '@/components/order/Order.vue';
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
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome,
    },{
      path: '/users',
      component: Users,
    },{
      path: '/rights',
      component: Rights,
    },{
      path: '/roles',
      component: Roles,
    },{
      path: '/categories',
      component: Cate,
    },{
      path: '/params',
      component: Params,
    },{
      path: '/goods',
      component: List,
    },{
      path: '/goods/add',
      component: Add,
    },{
      path: '/orders',
      component: Order,
    }],
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
