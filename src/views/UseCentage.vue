<template>
  <div>
    <b-container class="bv-example-row">
      <!-- <b-row>
        <b-col sm="12" md="12" lg="12">
          <b-button variant="danger" v-on:click="nameSearch()">Button</b-button>
        </b-col>
      </b-row> -->

      <b-row class="mt-2">
        <b-col sm="12" md="12" lg="12">
          <b-table responsive stacked :items="items" :fields="fields" class="bg-light"></b-table>
        </b-col>
      </b-row>

      <!-- <b-row class="mt-5">
        <b-col sm="12" md="12" lg="12">
          <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col sm="12" md="12" lg="12">
          <highcharts class="chart" :options="chartOptions2" :updateArgs="updateArgs"></highcharts>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col sm="12" md="12" lg="12">
          <highcharts class="chart" :options="chartOptions3" :updateArgs="updateArgs"></highcharts>
        </b-col>
      </b-row> -->
    </b-container>
  </div>
</template>

<script>
import { http } from "../http/http";
export default {
  //name: 'usage',
  // el: '#app',
  data() {
    return {
      fields: {
        // id: {
        //   label: "編號"
        //   // sortable: true
        // },
        cusid: {
          label: "裝置"
          // sortable: true
        },
        time: {
          label: "更新時間"
          // sortable: true
        },
        voltage: {
          label: "電壓"
          // sortable: true
        },
        current: {
          label: "電流"
          // sortable: true
        },
        power: {
          label: "功率"
          // sortable: true
        },
        kiloWatt: {
          label: "累積"
          // sortable: true
        }
        // '裝置', '時間','電壓','電流','功率','累積','ip',,'serverTime'
      },
      items: [],
      title: "test",
      chartType: "Line",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      animationDuration: 1000,
      src: ["a", "b"],
      updateArgs: [true, true, { duration: 1000 }],

      chartOptions: {
        chart: {
          type: "line"
        },
        title: {
          text: "電壓(V)"
        },
        series: [
          {
            name: "電壓(V)",
            color: "#ffb300",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
          // {
          //   name: "電流",
          //   color: "#43a047",
          //   data: [11, 22, 33, 44, 55, 66]
          // },
          // {
          //   name: "功率",
          //   color: "#f4511e",
          //   data: [5, 32, 24, 18, 9, 44]
          // },
          // {
          //   name: "累積",
          //   color: "#039be5",
          //   data: [23, 41, 7, 27, 38, 16]
          // }
        ],
        xAxis: [
          {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            title: {
              text: null
            },
            labels: {
              rotation: -45
            }
          }
        ],
        yAxis: [
          {
            min: 0,
            labels: {
              overflow: "justify"
            },
            title: {
              text: "", //, '单位 (kwh)',
              align: "high"
            }
          }
        ]
      },

      chartOptions2: {
        chart: {
          type: "line"
        },
        title: {
          text: "電流(I)"
        },
        series: [
          // {
          //   name: "電壓",
          //   color: "#ffb300",
          //   data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          // },
          {
            name: "電流(I)",
            color: "#43a047",
            data: [11, 22, 33, 44, 55, 66]
          }
          // {
          //   name: "功率",
          //   color: "#f4511e",
          //   data: [5, 32, 24, 18, 9, 44]
          // },
          // {
          //   name: "累積",
          //   color: "#039be5",
          //   data: [23, 41, 7, 27, 38, 16]
          // }
        ],
        xAxis: [
          {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            title: {
              text: null
            },
            labels: {
              rotation: -45
            }
          }
        ],
        yAxis: [
          {
            min: 0,
            labels: {
              overflow: "justify"
            },
            title: {
              text: "", //, '单位 (kwh)',
              align: "high"
            }
          }
        ]
      },
      chartOptions3: {
        chart: {
          type: "line"
        },
        title: {
          text: "功率(P)"
        },
        series: [
          // {
          //   name: "電壓",
          //   color: "#ffb300",
          //   data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          // },
          // {
          //   name: "電流",
          //   color: "#43a047",
          //   data: [11, 22, 33, 44, 55, 66]
          // },
          {
            name: "功率(P)",
            color: "#f4511e",
            data: [5, 32, 24, 18, 9, 44]
          }
          // {
          //   name: "累積(kwh)",
          //   color: "#039be5",
          //   data: [23, 41, 7, 27, 38, 16]
          // }
        ],
        xAxis: [
          {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            title: {
              text: null
            },
            labels: {
              rotation: -45
            }
          }
        ],
        yAxis: [
          {
            min: 0,
            labels: {
              overflow: "justify"
            },
            title: {
              text: "", //, '单位 (kwh)',
              align: "high"
            }
          }
        ]
      }
    };
  },
  created: function() {
    this.nameSearch();
    this.timer = setInterval(this.nameSearch, 1000);
  },
  methods: {
    // activate (elem) {
    //   this.selected = elem
    // },
    // handler () {
    //   var args = arguments
    //   for (var arg of args) {
    //     if (arg instanceof Function) {
    //       arg()
    //     }
    //   }
    // },
    // select (elem) {
    //   this.currentView = elem
    //   this.activate(elem)
    // },
    nameSearch: function() {
      var _self = this;

      http.get().then(response => {
        //var arr = ["];
        var newArr = response.filter(function(element, index) {
          //
          if (index == 0) {
            element.cusid = "施耐德";
            
            element.voltage = element.voltage + "(V)";
            element.current = element.current + "(A)";
            element.power = element.power + "(kW)";
            element.kiloWatt = element.kiloWatt / 1000 + "(kWh)";
            return element; 
          }
        });
        _self.items = newArr;
      });
    },
    cancelAutoUpdate: function() {
      clearInterval(this.timer);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>