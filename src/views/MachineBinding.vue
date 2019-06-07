<template>
    <b-container fluid>
        <b-row class="card-theme-table-row">
            <b-col lg="1" md="1" sm="1" cols="1">
                <!-- just for layout  -->
            </b-col>
            <!-- 輸入機台號碼頁面 -->
            <b-col lg="10" md="10" sm="10" cols="10">
                <h3>《機台號碼》</h3>
                 <div class="input-group">
                    <b-form-input v-model="machine_code"  :state="machine_code_state" :disabled="is_machine_not_empty"  placeholder="機台號碼">></b-form-input>
                     <span class="input-group-addon">
                         <b-button block :variant="machine_variant" :disabled="is_machine_not_empty" @click="bindMachine">{{ machine_button_text }}</b-button>
                     </span>
                     <b-form-invalid-feedback id="input-live-feedback">
                        {{ machine_feedback }}
                    </b-form-invalid-feedback>
                </div>
                 <b-table striped hover :items="machine_item"></b-table>
            </b-col>
        </b-row>
        <b-row class="card-theme-table-row">
            <b-col lg="1" md="1" sm="0" cols="1">
                <!-- just for layout  -->
            </b-col>
            <b-col lg="10" md="10" sm="10" cols="10">
                <h3>《模具編號》</h3>
                <div class="input-group">
                    <b-form-input class="input-bold" v-model="machine_mold"  :state="machine_mold_state"  placeholder="模具編號">></b-form-input>
                    <span class="input-group-addon">
                        <b-button block variant="danger" @click="bindMold">綁定</b-button>
                    </span>
                    <b-form-invalid-feedback id="input-live-feedback">
                        {{ mold_feedback }}
                    </b-form-invalid-feedback>
                </div>
                <b-table striped hover :items="mold_items"></b-table>
            </b-col>
        </b-row>
        <b-row class="card-theme-table-row">
            <b-col lg="1" md="1" sm="0" cols="1">
                <!-- just for layout  -->
            </b-col>
            <b-col lg="10" md="10" sm="10" cols="10">
                <h3>《線材批號》</h3>
                <div class="input-group">
                    <b-form-input class="input-wire" v-model="stove_code"  :state="stove_code_state" placeholder="線材批號" :disabled="is_wire_not_empty"></b-form-input>
                    <span class="input-group-addon">
                        <b-button block :variant="wire_variant" :disabled="is_wire_not_empty" @click="bindWire">{{ wire_button_text }}</b-button>
                    </span>
                    <b-form-invalid-feedback id="input-live-feedback">
                        {{ wire_feedback }}
                    </b-form-invalid-feedback>
                </div>
                <b-table stacked :items="wire_items"></b-table>
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
            machine_code: '', // 機台號碼
            machine_mold: '', // 模具編號
            stove_code: '', //爐號
            mold_feedback: '', // 模具欄位提示訊息
            wire_feedback:'', // 線材欄位提示訊息
            machine_feedback:'', //機台欄位提示訊息
            error_message: '', // api 錯誤訊息
            wire_variant:'danger', // 線材按鈕樣式
            machine_variant:'danger', // 機台號碼按鈕樣式
            wire_button_text: '綁定', // 線材按鈕文字
            machine_button_text: '綁定', // 機台號碼按鈕文字
            loading: true, // 載入中圖示
            is_wire_not_empty : false, // 檢查線材是否綁定
            is_machine_not_empty : false, // 檢查機台是否綁定
            dismissSecs: 10,
            dismissCountDown: 0,
            machine_code_state: null, //填入狀態
            machine_mold_state: null, //填入狀態
            stove_code_state: null, //填入狀態
            mold_items: [], //模具資料
            machine_item: [], //機台資料
            wire_items: [] // 線材資料
        }
    },
    created() {
        //檢查線材批號綁定狀況
        if(this.$store.state.stove_code != "" && this.$store.state.wire_data != ""){
            //綁定線材的資料
            this.stove_code = this.$store.state.stove_code
            //重新寫入資料到表格
            this.wire_items.push(this.$store.state.wire_data)
            //鎖定線材批號輸入框
            this.is_wire_not_empty = true
            //修改按鈕樣式
            this.wire_variant = "success"
            //修改按鈕文字
            this.wire_button_text = "綁定成功"
        }

        //檢查機台綁定狀況
        if(this.$store.state.machine_code != "" && this.$store.state.machine_data != ""){
            //綁定機台的資料
            this.machine_code = this.$store.state.machine_code
            //重新寫入資料到表格
            this.machine_item.push(this.$store.state.machine_data)
            //鎖定機台輸入框
            this.is_machine_not_empty = true
            //修改按鈕樣式
            this.machine_variant = "success"
            //修改按鈕文字
            this.machine_button_text = "綁定成功"
        }
    },
    watch: {
        //檢查機台輸入的情況
        machine_code: function () {
            if(this.machine_code.length>0)
                this.machine_code_state = null
        },
        //檢查線材批號的爐號輸入的情況
        stove_code: function () {
            if(this.stove_code.length>0)
                this.stove_code_state = null
        },
        //檢查模具號碼輸入的狀況
        machine_mold: function () {
            if(this.machine_mold.length>0)
                this.machine_mold_state = null
        },
    },
    methods: {
        //檢查警告視窗隱藏
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        //機台綁定
        bindMachine(){
            var value = { "machine_code" : this.machine_code }
            //檢查參數是否有正常輸入
            this.machine_code_state = this.machine_code.length == 0 ? false : null
            //判斷顯示提示訊息
            if(this.machine_code.length == 0){
                this.mold_feedback = "請輸入機台號碼"
                return
            }
            //顯示loading視窗
            let loader = this.$loading.show(); 
            // ---------- start to http client connecting ----------
            this.$store.dispatch('BindMachine',value).then(response => {
                if(response.status === 404) {
                    this.dismissCountDown = this.dismissSecs
                    this.error_message = response.statusText
                    loader.hide()
                    return
                }
                
                //如果機台參數錯誤導致失敗顯示alert
                if(this.machine_code != response.data.機台號碼) {
                    this.dismissCountDown = this.dismissSecs
                }else{
                    //機台資訊
                    this.$store.commit('SET_MACHINE_INFO', { data: response.data })
                    this.machine_item.push(response.data)
                     //鎖定線材批號輸入框
                    this.is_machine_not_empty = true
                    //修改按鈕樣式
                    this.machine_variant = "success"
                    //修改按鈕文字
                    this.machine_button_text = "綁定成功"
                }
                loader.hide()
            })
            // ---------- end to http client connecting ----------

        },

        //模具綁定
        bindMold(){
            var value = { "machine_mold" : this.machine_mold }
            //檢查參數是否有正常輸入
            this.machine_mold_state = this.machine_mold.length == 0 ? false : null
            //判斷顯示提示訊息
            if(this.machine_mold.length == 0){
                this.mold_feedback = "請輸入模具編號"
                return
            }
            // ---------- start to http client connecting ----------
            this.$store.dispatch('BindWire',value).then(response => {
                //如果線材綁定錯誤導致失敗顯示alert
                if(this.machine_mold != response.data.品號) {
                    this.dismissCountDown = this.dismissSecs
                }else{
                    //儲存線材品號資訊
                    this.$store.commit('SET_WIRE_INFO', { data: response.data })
                    this.wire_items.push(response.data)
                }
            })
            // ---------- end to http client connecting ----------
        },

        //線材綁定
        bindWire() {
            //如果已經綁定值了就跳出function
            if (typeof this.wire_items !== 'undefined' && this.wire_items.length > 0) { return }
            var value = { "stove_code" : this.stove_code, }
            //儲存爐號
            this.$store.commit('SET_STOVE_CODE', { data: this.stove_code })
            //檢查參數是否有正常輸入
            this.stove_code_state = this.stove_code.length == 0 ? false : null
            //判斷顯示提示訊息
            if(this.stove_code.length == 0){
                this.wire_feedback = "請輸入線材批號"
                return
            }
            //顯示loading視窗
            let loader = this.$loading.show(); 
            // ---------- start to http client connecting ----------
            this.$store.dispatch('BindWire',value).then(response => {
                if(response.status === 404) {
                    this.dismissCountDown = this.dismissSecs
                    this.error_message = response.statusText
                    loader.hide()
                    return
                }
                
                //如果線材綁定錯誤導致失敗顯示alert
                if(!response.data.品號 === "") {
                    this.dismissCountDown = this.dismissSecs
                    this.error_message = "查無相關線材資料，請重新確認。"
                }else{
                    //儲存線材品號資訊
                    this.$store.commit('SET_WIRE_INFO', { data: response.data })
                    this.wire_items.push(response.data)
                    //鎖定線材批號輸入框
                    this.is_wire_not_empty = true
                    //修改按鈕樣式
                    this.wire_variant = "success"
                    //修改按鈕文字
                    this.wire_button_text = "綁定成功"
                }
                loader.hide()
            })
            // ---------- end to http client connecting ----------
        }
    },
}
</script>
