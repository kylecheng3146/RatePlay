<template>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col lg="4" md="3" sm="1" cols="1">
                 
            </b-col>
            <!-- 登入頁面 -->
            <b-col class="login-panel" lg="4" md="6" sm="10" cols="10">
               
                <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
                <b-form-input v-model="account"  :state="accountState"  placeholder="帳號"></b-form-input>
                <b-form-input v-model="password" :type="'password'" :state="passwordState" placeholder="密碼"></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                    {{ feedback }}
                </b-form-invalid-feedback>
                <b-button block variant="success" @click="login">登入</b-button>
                
            </b-col>
            <b-col lg="4" md="3" sm="1" cols="1">
            </b-col>
        </b-row>
        <b-alert class="" variant="danger" fade 
                :show="dismissCountDown"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
                    登入失敗
        </b-alert>
    </b-container>
</template>


<script>
import { http } from "../http/http";
import axios from 'axios'
// @ is an alias to /src
export default {
    name: 'login',
    components: {
    },
    data() {
        return {
            password:'',
            account: '',
            feedback:'',
            loading: true,
            errored: false,
            dismissSecs: 10,
            dismissCountDown: 0,
            accountState: null,
            passwordState: null,
        }
    },
    watch: {
        //檢查帳號密碼輸入的情況
        account: function () {
            if(this.account.length>0)
                this.accountState = null
        },
        password: function () {
            this.passwordState = null
        }
    },
    methods: {
        //檢查警告視窗隱藏
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },

        //登入按鈕事件
        login() {
            // var value = {
            //     "username" : this.account,
            //     "password" : this.password
            // }
            // // this.$router.push('home')
            // http.authenticate(value).then(
            //     response => {
            //     //檢查帳號
            //     this.accountState = this.account.length == 0 ? false : null
            //     this.passwordState = this.password.length == 0 ? false : null
            //     //判斷顯示提示訊息
            //     if(this.account.length == 0 && this.password.length ==0){
            //         this.feedback = "請輸入帳號與密碼"
            //         return
            //     } else if(this.account.length == 0) { //帳號沒有輸入
            //         this.feedback = "請輸入帳號"
            //         return
            //     }else if(this.password.length ==0){ //密碼沒有輸入
            //         this.feedback = "請輸入密碼"
            //         return
            //     }
            //     //如果帳號密碼錯誤導致登入失敗顯示alert
            //     console.log(response)
            //     if(this.account != response.userId) {
            //         this.dismissCountDown = this.dismissSecs
            //     } else {
            //         // login successful if there's a jwt token in the response
            //         if (response.salt != null) {
            //             // store user details and jwt token in local storage to keep user logged in between page refreshes
            //             localStorage.setItem('user', response.salt)
            //             //登入跳轉到首頁頁面
                        this.$router.push('/')
            //         }
            //     }
            //     }
            // );
        }
    },
}
</script>
