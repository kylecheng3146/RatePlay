<template>
           <nav class="main-menu">
            <ul>
                 <li v-for="(item ,index) in items" :key="index">
                     <router-link :to="{name: item.router}">
                        <i :class="item.iClass"></i>
                        <span class="nav-text">
                            {{ item.text }}
                        </span>
                    </router-link>
                </li>
                <!-- 
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Forms
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-folder-open fa-2x"></i>
                        <span class="nav-text">
                            Pages
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            Graphs and Statistics
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-font fa-2x"></i>
                        <span class="nav-text">
                           Quotes
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i class="fa fa-table fa-2x"></i>
                        <span class="nav-text">
                            Tables
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                        <i class="fa fa-map-marker fa-2x"></i>
                        <span class="nav-text">
                            Maps
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                       <i class="fa fa-info fa-2x"></i>
                        <span class="nav-text">
                            Documentation
                        </span>
                    </a>
                </li>
              -->

            </ul>

            <ul class="logout">
                <li>
                   <router-link v-on:click.native="logout" :to="{name:'login'}" >
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            登出
                        </span>
                   </router-link>
                </li>  
            </ul> 
        </nav>      
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    router: "home",
                    iClass:'fa fa-exchange fa-2x',
                    text:'匯率換算',
                },
                {
                    router: "diff",
                    iClass:'fa fa-bars fa-2x',
                    text:'匯率走勢',
                },
                {
                    router: "activity",
                    iClass:'fa fa-info-circle fa-2x',
                    text:'旅遊資訊',
                },
                {
                    router: "",
                    iClass:'fa fa-fire fa-2x',
                    text:'',
                },
                 {
                    router: "",
                    iClass:'fa fa-leaf fa-2x',
                    text:'',
                }
            ]
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token')
        }
    }
}
</script>
