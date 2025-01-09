import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    name: 'shopmain',
    children: [
      {
        path: '/',
        name: 'shophome',
        alias: '/shop/home',
        component: () => import('../views/ShopHome.vue')
      },

      {
        path: 'login',
        name: 'shoplogin',
        component: () => import('../views/ShopLoginView.vue')
      },

      {
        path: 'buy',
        name: 'shopbuy',
        component: () => import('../views/ShopBuy.vue')
      },

      {
        path: 'pay/:orderId',
        name: 'shopPay',
        component: () => import('../views/ShopPay.vue'),
        props: true
      }
    ],
    component: () => import('../views/ShopView.vue')
  },

  {
    path: '/bank',
    name: 'bankmain',
    children: [
      {
        path: '/',
        name: 'bankhome',
        alias: '/bank/home',
        component: () => import('../views/ShopHome.vue')
      },
      {
        path: 'account',
        name: 'bankaccount',
        component: () => import('../views/BankAccountView.vue')
      },
      {
        path: 'amount',
        name: 'bankamount',
        component: () => import('../views/BankAmount.vue')
      },
      {
        path: 'operation',
        name: 'bankoperation',
        component: () => import('../views/BankOperation.vue')
      },
      {
        path: "history",
        name: "bankhistory",
        component: () => import("../views/BankHistory.vue")
      },
      {
        path: "logout",
        name: "banklogout",
        component: () => import("../views/BankLogout.vue")
      }
    ],
    component: () => import('../views/BankView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
