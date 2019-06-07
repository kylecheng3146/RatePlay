<template>  
  <div>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col sm="12" md="12" lg="12">
          <div class="chart-view">
             <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
          </div>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'
export default{
    components: {
        VueHighcharts
    },
    created() {
      this.load()
    },
    data(){
      return{
		items : [],
        options: {
          chart: {
            type: 'line'
          },
          title: {
            text: '匯率走勢圖'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: ['6/7', '6/8', '6/9', '6/10', '6/11', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'currency'
            },
            labels: {
              formatter: function () {
                return this.value;
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []
        }
      }
    },
    methods: {
		load(){
			var value = {
				"rate_name" : localStorage.getItem('localCurrency')
			}
			//讀取所選取查詢的匯率
			this.$store.dispatch('GetHistoryCurrency',value).then(response => {
				if(response.status === 404) {
					this.dismissCountDown = this.dismissSecs
					this.error_message = response.statusText
					loader.hide()
					return
				}

				const asyncData = {
					name: response.data[0].rateName,
					//多個+號改型別..
					data: response.data.map(x=> +x.exrate1)
				}
				let lineCharts = this.$refs.lineCharts;
				lineCharts.delegateMethod('showLoading', 'Loading...');
				setTimeout(() => {
					lineCharts.addSeries(asyncData);
					lineCharts.hideLoading();
				}, 2000)
				this.items.push(response.data.map(x=>x.exrate1))
			})
      }
    }
}
</script>