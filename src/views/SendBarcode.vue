<template>  
  <div>
    <b-container fluid>
        <b-row>
            <b-col sm="2" md="2" lg="2">
            </b-col>
            <b-col sm="8" md="8" lg="8">
                <div>
                    <b-form-input v-model="machine_code" placeholder="機台編號"></b-form-input>
                    <b-form-input v-model="work_code" placeholder="工單號碼"></b-form-input>

                     <b-button block variant="success" @click="sendBarcode">確認送出</b-button>
                </div>
            </b-col>
            <b-col sm="2" md="2" lg="2">
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        machine_code: '',
        work_code:''
      }
    },
    methods: {
      sendBarcode(){
      }
    },
  }
</script>