import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/Main.vue'),
      },
      {
        path: '/user',
        component: () => import('../views/User.vue'),
      },
      {
        path: '/password',
        component: () => import('../views/Password.vue'),
      },
      {
        path: '/address',
        component: () => import('../views/Address.vue'),
      },
      {
        path: '/orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: '/orderInfo',
        component: () => import('../views/OrderInfo.vue'),
      },
      {
        path: '/goods',
        component: () => import('../views/Goods.vue'),
      },
      {
        path: '/product',
        component: () => import('../views/Product.vue'),
      },
      {
        path: '/test',
        component: () => import('../views/Test.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),

  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router