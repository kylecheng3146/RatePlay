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
            plotBackgroundColor: null,
            backgroundColor: '#152330',
            color: '#fff',
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: '#000',
            width: 470,
            height: 260,
            type: 'pie',
            reflow: true
        },
        title: {
            text: '集團用電分佈圖',
            style: {
                color: '#fff',
            }
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        tooltip: {
            // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        series: [{
            "name": "Department",
            "colorByPoint": true,
            "data": [{
                    name: "空調",
                    y: 50,
                    drilldown: "空調",
                    sliced: true,
                    selected: true
                },
                {
                    name: "MIS",
                    y: 20.57,
                    drilldown: "MIS"
                },
                {
                    name: "SIT",
                    y: 7.23,
                    drilldown: "SIT"
                },
                {
                    name: "照明",
                    y: 5.58,
                    drilldown: "照明"
                },
                {
                    name: "油量",
                    y: 4.02,
                    drilldown: "油量"
                },
                {
                    name: "水量",
                    y: 1.92,
                    drilldown: "水量"
                },
                {
                    name: "Other",
                    y: 7.62,
                    drilldown: null
                }
            ]
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