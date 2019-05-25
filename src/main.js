import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import BootstrapVue from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
// app.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './stylus/home.styl'
import './stylus/login.styl'


Vue.use(BootstrapVue)
Vue.use(HighchartsVue)

new Vue({
  data() {
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
}).$mount('#app')
