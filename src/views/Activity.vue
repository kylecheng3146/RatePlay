<template>
    <b-container fluid>
        <b-row>
            <!-- 輸入機台號碼頁面 -->
            <b-col lg="12" md="12" sm="12" cols="12">
                 <b-table striped hover :items="items"></b-table>
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
    name: 'activity',
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
            items: [] // 線材資料
        }
    },
    created() {
        this.getActivity()
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

        //線材綁定
        getActivity() {
            //顯示loading視窗
            let loader = this.$loading.show(); 
            // ---------- start to http client connecting ----------
            this.$store.dispatch('GetActivity',"").then(response => {
                if(response.status === 404) {
                    this.dismissCountDown = this.dismissSecs
                    this.error_message = response.statusText
                    loader.hide()
                    return
                }
                 response.data.forEach(element => {
                    //儲存線材品號資訊
                    // this.$store.commit('SET_WIRE_INFO', { data: element })
                    this.items.push(element)
                });
                
                // }
                loader.hide()
            })
        }
    },
}
</script>
