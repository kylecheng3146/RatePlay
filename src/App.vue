<template>  
  <div>
      <!-- 檢查目前頁面如果為login則不要顯示navbar && sidebar -->
      <div v-if="currentRouteName != 'login'">
      <component :is="navbar"></component>
      <div @mouseover="mouseOver" @mouseout="mouseOut">
      <component :is="sidebar"></component>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
export default {
  name: 'app',
  data () {
    return {
      navbar: 'navbar',
      sidebar: 'sidebar'
    }
  },
  //計算屬性
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
  //元件屬性
  components: {
    navbar: NavBar,
    sidebar: SideBar
  },
  methods: {
    handler () {
      var args = arguments
      for (var arg of args) {
        if (arg instanceof Function) {
          arg()
        }
      }
    },
    //滑鼠移入的動作，縮小navbar
    mouseOver: function(){
      document.getElementById("navbar").style.marginLeft = "200px"
      document.getElementById("navbar").style.transition = ".1s"
    },
    //滑鼠移入的動作，放大navbar
    mouseOut: function () {
      document.getElementById("navbar").style.marginLeft = "60px"
      document.getElementById("navbar").style.transition = ".1s"
    }
  }
}
</script>