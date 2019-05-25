<template>
  <!-- <div class="chartElem"> -->
  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>

<script>
export default {
  data () {
    return {
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
          data: [1, 2, 3, 4, 5, 6]
        }, {  
          name: '尖峰用電量',
          color: '#43a047',
          data: [11, 22, 33, 44, 55, 66]
        }, {  
          name: '半尖峰用電量',
          color: '#f4511e',
          data: [5, 32, 24, 18, 9, 44]
        }, {  
          name: '離峰用電量',
          color: '#039be5',
          data: [23, 41, 7, 27, 38, 16]
        }]
      }
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