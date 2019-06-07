import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import BootstrapVue from 'bootstrap-vue';
import HighchartsVue from 'highcharts-vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './stylus/home.styl';
import './stylus/login.styl';


Vue.use(BootstrapVue);
Vue.use(HighchartsVue);

//新增loading全局圖示
Vue.use(VueLoading, {
  canCancel: false,
  color: '#248f81',
  loader: 'dots', //spinner/dots/bars
  width: 160,
  height: 160,
  backgroundColor: '#e8e8e8',
  isFullPage: true,
  opacity: 0.7
});

new Vue({
  data()
  {
    return {
      chartOptions: {
        series: [{
          data: [1, 2, 3] // sample data
        }]
      }
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
