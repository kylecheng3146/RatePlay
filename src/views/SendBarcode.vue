<template>
    <b-container fluid>
        <b-row class="card-theme-table-row">
            <b-col lg="1" md="1" sm="1" cols="1">
                 <!-- just for layout  -->
            </b-col>
            <!-- 輸入工單頁面 -->
            <b-col lg="10" md="10" sm="10" cols="10">
                <h3>《工單編號》</h3>
                <div class="input-group">
                    <b-form-input class="input-bold" v-model="work_code"  :state="work_code_state"  placeholder="工單編號">></b-form-input>
                        <span class="input-group-addon">
                            <b-button block variant="success" @click="sendWorkCode">確認送出</b-button>
                        </span>
                    <b-form-invalid-feedback id="input-live-feedback">
                        {{ feedback }}
                    </b-form-invalid-feedback>
                </div>
            </b-col>
        </b-row>
        <b-row class="card-theme-table-row">
            <b-col lg="1" md="1" sm="1" cols="1">
                 <!-- just for layout  -->
            </b-col>
            <!-- 輸入工單頁面 -->
            <b-col lg="10" md="10" sm="10" cols="10">
                <h3>《派  工  單》</h3>
                <b-col lg="1" md="1" sm="1" cols="1">
                    <!-- just for layout  -->
                </b-col>
                <b-col>
                    <b-table stacked :items="line_items"></b-table>
                </b-col>
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
    name: 'send_barcode',
    components: {
    },
    data() {
        return {
            work_code:'',
            feedback:'',
            error_message:'',
            loading: true,
            errored: false,
            dismissSecs: 10,
            dismissCountDown: 0,
            machine_code_state: null,
            work_code_state: null,
            line_items:[]
        }
    },
    watch: {
        //檢查工單輸入的情況
        work_code: function () {
            this.work_code_state = null
        }
    },
    methods: {
        //檢查警告視窗隱藏
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },

        //送出工單編號
        sendWorkCode() {
            //檢查工單是否為空
            this.work_code_state = this.work_code.length == 0 ? false : null
            //判斷顯示提示訊息
            if(this.work_code.length == 0){ //工單編號沒有輸入
                this.feedback = "請輸入工單編號"
                return
            }
            let loader = this.$loading.show(); 
            var value = {
                "work_code" : this.work_code
            }
            this.$store.dispatch('GetSendJobData',value).then(response => {
                //如果查無相關資料則跳脫
                if(response.status === 404) {
                    this.dismissCountDown = this.dismissSecs
                    this.error_message = response.statusText
                    loader.hide()
                    return
                }
                //將資料寫入表格
                this.line_items.push(response.data)
                var value = {
                    "WorkOrder" : this.work_code
                }
                // ---------- start to http client connecting ----------
                this.$store.dispatch('AddworkData',value).then(response => {
                    //如果工單輸入錯誤導致失敗顯示alert
                    if(this.work_code != response.data.workOrder) {
                        this.error_message = "工單寫入失敗，請確認"
                        this.dismissCountDown = this.dismissSecs
                    }
                    loader.hide()
                })
            })
            // ---------- end to http client connecting ----------
        }
    },
}
</script>