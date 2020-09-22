import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'


Vue.use(VueRouter)

const routes = [

  // 登陆页面
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue'),
    beforeEnter: (to, form, next) => {
      if (store.state.token == '') {
        next()
      } else {
        next('/home')
      }
    },
  },
  // 主页面
  {
    path: '/home',
    name: 'home',
    redirect: '/hellow',
    component: () => import('../views/home.vue'),
    beforeEnter: (to, form, next) => {
      setTimeout(function () {
        if (store.state.token == '') {
          next('/')
        } else {
          next()
        }
      }, 500)

    },
    children: [
      // hellow页面
      {
        path: '/hellow',
        name: 'hellow',
        component: () => import('../views/Hellow.vue'),
      },
      // 用户页面
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/用户管理/users.vue'),
      },

      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/权限管理/roles.vue'),
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/权限管理/rights.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/商品管理/goods.vue'),
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../views/商品管理/params.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/商品管理/categories.vue'),
      },
      {
        path: '/goods/add',
        name: 'add',
        component: () => import('../views/商品管理/add.vue'),
      },

      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/订单管理/orders.vue'),
      },
      
      {
        path: '/reports',
        name: 'reports',
        component: () => import('../views/数据统计/Reports.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router