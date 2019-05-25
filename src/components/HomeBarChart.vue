<template>
  <!-- <div class="chartElem"> -->
    <div id="container"></div>
</template>

<script>
// 最主要是这里模块的引入 很坑 
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts)
export default {
    mounted(){
        this.init();
    },
    methods:{
        init(){
            Highcharts.chart('container', {
                chart: {
                    zoomType: 'xy',
                    backgroundColor: '#152330',
                },
                title: {
                    text: '最近3年 神達電腦 華亞廠辦 累積用電總和 趨勢圖',
                    style: {
                        color: "#fff"
                    }
                },
                // subtitle: {
                    // text: 'Source: WorldClimate.com'
                // },
                xAxis: [{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        // text: 'Temperature',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        // text: 'Rainfall',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: '2017',
                    type: 'column',
                    yAxis: 1,
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    color: '#5e35b1',
                    // tooltip: {
                    //     valueSuffix: ' mm'
                    // }
                }, {
                    name: '2018',
                    type: 'column',
                    yAxis: 1,
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    color: '#fdd835'
                    // tooltip: {
                    //     valueSuffix: ' mm'
                    // }
                }, {
                    name: '2019',
                    type: 'column',
                    yAxis: 1,
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    // tooltip: {
                    //     valueSuffix: ' mm'
                    // }

                }
                , {
                    name: 'Temperature',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                    // tooltip: {
                    //     valueSuffix: '°C'
                    // }
                }]
            });
        }
    }
}
</script>