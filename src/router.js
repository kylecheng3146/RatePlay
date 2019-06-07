import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import SendBarcode from './views/SendBarcode.vue';
import Activity from './views/Activity.vue';
import UsePercentage from './views/UsePercentage.vue';
import Usecentage from './views/UseCentage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/barcode',
      name: 'barcode',
      component: SendBarcode
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/percentage',
      name: 'percentage',
      component: UsePercentage
    },
    {
      path: '/centage',
      name: 'centage',
      component: Usecentage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   //初始為登入畫面
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');

//   //如果尚未取得登入token則返回登入頁面
//   if (authRequired && loggedIn == null) {
//     return next('/login');
//   }

//   //一般狀況往下進行.
//   next();
// })

export default router