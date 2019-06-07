<template>
    <b-container fluid>
        <b-row class="card-theme-table-row">
            <!-- 輸入機台號碼頁面 -->
            <b-col lg="12" md="12" sm="12" cols="12">
                <h3>《註冊帳號》</h3>
                    <b-form-input v-model="mail" type="email"  :state="mail_state" :disabled="is_machine_not_empty"  placeholder="電子郵件">></b-form-input>
                    <b-form-input v-model="password" type="password"  :state="password_state" :disabled="is_machine_not_empty"  placeholder="密碼">></b-form-input>
                    <b-form-input v-model="confirm_password" type="password" :state="confirm_password_state" :disabled="is_machine_not_empty"  placeholder="確認密碼">></b-form-input>
                    <b-form-input v-model="name"  :state="name_state" :disabled="is_machine_not_empty"  placeholder="我們該如何稱呼您？">></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        {{ feedback }}
                    </b-form-invalid-feedback>
                    <b-button block :variant="variant" :disabled="is_machine_not_empty" @click="signup">{{ button_text }}</b-button>
            </b-col>
        </b-row>
        <b-alert class="" variant="danger" fade 
                :show="dismissCountDown"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
                    {{ error_message }}
        </b-alert>
    </b-container>
</template>


<script>
export default {
    name: 'machine_bind',
    components: {
    },
    data() {
        return {
            mail: '', // 電子郵件
            password: '', // 密碼
            confirm_password: '', // 確認密碼
            name: '', // 姓名
            error_message: '', // api 錯誤訊息
            variant:'success', // 確認送出鈕樣式
            feedback:'',//訊息提示
            button_text:'註冊',
            dismissSecs: 10,
            dismissCountDown: 0,
            mail_state: null, //填入狀態
            name_state: null, //填入狀態
            password_state: null, //填入狀態
        }
    },
    watch: {
        //檢查機台輸入的情況
        mail: function () {
            if(this.mail.length>0)
                this.mail_state = null
        },
        //檢查線材批號的爐號輸入的情況
        password: function () {
            if(this.password.length>0)
                this.password_state = null
        },
        //檢查模具號碼輸入的狀況
        name: function () {
            if(this.name.length>0)
                this.name_state = null
        },
    },
    methods: {
        //檢查警告視窗隱藏
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        //帳號註冊
        signup(){
            var value = {
                "mail": this.mail,
                "password": this.password,
                "name": this.name
            }
            //檢查參數是否有正常輸入
            this.mail_state = this.mail.length == 0 ? false : null
            this.password_state = this.password.length == 0 ? false : null
            this.confirm_password_state = this.confirm_password.length == 0 ? false : null
            this.name_state = this.name.length == 0 ? false : null
            //判斷顯示提示訊息
            if(this.mail.length == 0){
                this.feedback = "請輸入電子郵件"
                return
            }
            //檢查密碼是否有正常輸入
            if(this.password.length == 0){
                this.feedback = "請輸入密碼"
                return
            }
            //檢查密碼是否跟確認一致
            if(this.password != this.confirm_password){
                this.feedback = "請確認密碼是否輸入錯誤"
                return
            }
            //檢查密碼是否有正常輸入
            if(this.name.length == 0){
                this.feedback = "請輸入您的大名"
                return
            }
            //顯示loading視窗
            let loader = this.$loading.show(); 
            // ---------- start to http client connecting ----------
            this.$store.dispatch('signup',value).then(response => {
                if(response.status === 404) {
                    this.dismissCountDown = this.dismissSecs
                    this.error_message = response.statusText
                    loader.hide()
                    return
                }
                
                //如果機台參數錯誤導致失敗顯示alert
                if(this.mail != response.data.機台號碼) {
                    this.dismissCountDown = this.dismissSecs
                }else{
                    //機台資訊
                    this.$store.commit('SET_MACHINE_INFO', { data: response.data })
                    this.machine_item.push(response.data)
                     //鎖定線材批號輸入框
                    this.is_machine_not_empty = true
                    //修改按鈕樣式
                    this.variant = "success"
                    //修改按鈕文字
                    this.machine_button_text = "綁定成功"
                }
                loader.hide()
            })
            // ---------- end to http client connecting ----------

        }
    },
}
</script>
