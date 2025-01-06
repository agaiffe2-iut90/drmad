import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/bank/account',
    name: 'bankaccount',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/BankAccountView.vue')
  },

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
        name: 'shoppay',
        component: () => import('../views/ShopPay.vue'),
        props: true
      }
    ],
    component: () => import('../views/ShopView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
