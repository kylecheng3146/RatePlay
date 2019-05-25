<template>  
  <div>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col sm="12" md="12" lg="9">
        <b-col md="12">
          <div class="chart-view">
            <keep-alive>
              <component :is="currentView"></component>
            </keep-alive>
          </div>
        </b-col>
        <b-col sm="12" md="12">
          <b-row class="chart-detail-row">
            <b-col cols="4" sm="4" md="4">
              <h4> 1500 </h4>
              <br>
              <h4>總度數</h4>
            </b-col>
            <b-col cols="4" sm="4" md="4">
              <h4> 1500 </h4>
              <br>
              <h4>平均度數</h4>
            </b-col>
            <b-col cols="4" sm="4" md="4">
              <h4> 1500 </h4>
              <br>
              <h4>契約容量</h4>
            </b-col>
          </b-row>
        </b-col>
      </b-col>
      <b-col sm="12" md="12" lg="1">
      </b-col>
      <b-col sm="12" md="12" lg="2">
        <component :is="card"></component>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import SingleBarChart from '../components/SingleBarChart.vue'
import Card from '../components/Card.vue'
export default {
  name: 'usage',
  data () {
    return {
      selected: 'chart',
      currentView: 'chart',
      card: 'card',
    }
  },
  components: {
    chart: SingleBarChart,
    card: Card,
  },
  methods: {
    activate (elem) {
      this.selected = elem
    },
    handler () {
      var args = arguments
      for (var arg of args) {
        if (arg instanceof Function) {
          arg()
        }
      }
    },
    select (elem) {
      this.currentView = elem
      this.activate(elem)
    },
  }
}
</script>