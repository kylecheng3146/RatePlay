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
          type: 'pie',
          options3d:{
            enabled: true,//使用3D功能
            alpha: 60,//延y軸向内的傾斜角度
            beta: 0,   
          }
        },
        title: {
          text: '系統用電百分比'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,//每個扇形是否能夠點選
                cursor: 'pointer',//滑鼠游標
                depth: 50,//pie的厚度
                dataLabels: {
                    enabled: true,//是否顯示線型tip
                },
                colors: ['#ffb300', '#43a047', '#f4511e', '#039be5']
            },
        },
        series: [
          {
            type: 'pie',
            data: [
                ['契約用量',12],//名稱與百分比，也可以{name: '測試',y: 12}
                ['尖峰用電量',23],
                ['半尖峰用電量',19],
                ['離峰用電量',29]
            ]
          }
        ]
      }
    }
  }
}
</script>