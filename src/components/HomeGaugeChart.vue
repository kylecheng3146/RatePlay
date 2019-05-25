<template>
  <!-- <div class="chartElem"> -->
   <div id="highCharts"></div>
</template>

<script>
   // 最主要是这里模块的引入 很坑 
    import Highcharts from 'highcharts/highstock';
    // 这个一定要引入 不然报错
    import HighchartsMore from 'highcharts/highcharts-more';
    HighchartsMore(Highcharts)
    Highcharts.setOptions({
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: '#152330',
                color: '#fff',
                width: 220,
                height: 240
            },

            title: {
                text: '集團即時用電',
                style: {
                    color: '#fff',
                }
            },
            subtitle: {
                text: '(年累積用電kWH)',
                style: {
                    color: '#eee',
                }
            },

            pane: {
                startAngle: -125,
                endAngle: 125,
                background: [{
                    backgroundColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 2000,
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 14,
                minorTickPosition: 'inside',
                minorTickColor: '#aaa',
                tickPixelInterval: 30,
                tickWidth: 1,
                tickPosition: 'inside',
                tickLength: 0,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 500,
                    color: '#DDDF0D'
                }, {
                    from: 500,
                    to: 1000,
                    color: '#ff8200'
                }, {
                    from: 1000,
                    to: 1500,
                    color: '#DF5353'
                }, {
                    from: 1500,
                    to: 2000,
                    color: '#be0000'
                }]
            },

            series: [{
                name: '即時用電',
                data: [1100],
                tooltip: {
                    valueSuffix: ''
                }
            }]
    });

    export default {
        mounted(){
           this.init();
        },
        data(){
            return {

            }    
        },
        methods:{
            init(){
                this.draw();
            },
            draw(){
                new Highcharts.chart('highCharts', {
                    yAxis: {
                        min: 0,
                        max: 2000,
                    },
                    credits: {
                            enabled: false
                    },
                    series: [{
                            name: '速度',
                            data: [80],
                            dataLabels: {
                              
                            },
                    }]
                },  // Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                newVal,
                                inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 0 || newVal > 200) {
                                newVal = point.y - inc;
                            }
                            point.update(newVal);
                        }, 3000);
                    }
                });
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