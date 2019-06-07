<template>
  <!-- <div class="chartElem"> -->
  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>

<script>
export default {
  mounted() {
    this.getHistoryCurrency()
  },
  data () {
    return {
      items : [],
      title: 'test',
      chartType: 'Column',
      seriesColor: '#6fcd98',
      colorInputIsSupported: null,
      animationDuration: 1000,
       src: ['a', 'b'],
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: '系統用電差異'
        },
        series: [{
          name: '契約用量',
          color: '#ffb300',
          data: [ this.items ]
        }]
      }
    }
  },
  methods: {
     getHistoryCurrency(){
      var value = {
        "rate_name" : localStorage.getItem('localCurrency')
      }
      this.$store.dispatch('GetHistoryCurrency',value).then(response => {
          if(response.status === 404) {
              this.dismissCountDown = this.dismissSecs
              this.error_message = response.statusText
              loader.hide()
              return
          }

          response.data.forEach(element => {
              //儲存線材品號資訊
              
          });
          this.items = new Array(1,2,3);
          console.log('====================================');
    console.log(this.items);
    console.log('====================================');
			})
    }
  }
}
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
#colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
}
.numberInput {
  width: 30px;
}
</style>