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
        title: {
            text: '72%',
            verticalAlign: 'middle',
            floating: true
        },
        chart: {
            renderTo: 'container'
        },
        series: [{
            type: 'pie',
            dataLabels: false,
            shadow: false,
            data: [{
            name: 'IE',
            y: 72,
            color: '#6fcd98'
            }, {
             name: 'IE',
             y: 28,
             color: '#e8e8e8'
          }],
            innerSize: '80%'
        }]
      }
    }
  }
}
</script>