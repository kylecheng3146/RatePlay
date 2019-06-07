<template>
    <b-container fluid class="container-home">
        <b-row>
            <b-col lg="4" md="3" sm="1" cols="1">
                 <!-- just for layout  -->
            </b-col>
            <!-- 登入頁面 -->
            <b-col class="login-panel" lg="4" md="6" sm="10" cols="10">
               
                <b-img :src="images.path" fluid></b-img>
                <b-form-input v-model="account"  :state="accountState"  placeholder="帳號">></b-form-input>
                <b-form-input v-model="password" :type="'password'" :state="passwordState" placeholder="密碼"></b-form-input>
                <p @click="signup">註冊</p>
                <b-form-invalid-feedback id="input-live-feedback">
                    {{ feedback }}
                </b-form-invalid-feedback>
                <b-button block variant="success" @click="login">登入</b-button>
                
                
            </b-col>
            <b-col lg="4" md="3" sm="1" cols="1">
                <!-- just for layout  -->
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
            images: {
                path: require('../assets/OFCO.png')
            }
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
        signup() {
            this.$router.push('/signup')
        },
        //登入按鈕事件
        login() {
            var value = {
                "Email" : this.account,
                "Password" : this.password
            }
            //檢查帳號
            this.accountState = this.account.length == 0 ? false : null
            this.passwordState = this.password.length == 0 ? false : null
            //判斷顯示提示訊息
            if(this.account.length == 0 && this.password.length ==0){
                this.feedback = "請輸入帳號與密碼"
                return
            } else if(this.account.length == 0) { //帳號沒有輸入
                this.feedback = "請輸入帳號"
                return
            }else if(this.password.length ==0){ //密碼沒有輸入
                this.feedback = "請輸入密碼"
                return
            }

            this.$store.dispatch('AUTHENTICATE',value).then(response => {

                console.log('====================================');
                console.log(response);
                console.log('====================================');
                //如果帳號密碼錯誤導致登入失敗顯示alert
                if(this.account != response.data.email) {
                    this.dismissCountDown = this.dismissSecs
                } else {
                    let token = response.data.token;
                    // login successful if there's a jwt token in the response
                    if (token != null) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('token', token)
                         this.$store.commit('SET_USER_INFO', { data: response.data })
                        //登入跳轉到首頁頁面
                        this.$router.push('/')
                    }
                }
            });
        }
    },
}
</script>
