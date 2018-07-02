<template>
  <div>
    <div class="chart-top">
      <Datepicker @newDate="updateDate" ref="picker"></Datepicker>
      <Page @left="left" @right="right"></Page>
    </div>
    <div class="chart">
      <Units :units="units"></Units>
      <Chart :date="date" :units="units">
        <!-- <Booking></Booking> -->
      </Chart>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from './calendar/Datepicker'
import Page from './calendar/Page'
import Units from './calendar/Units'
import Chart from './calendar/Chart'
import Booking from './calendar/Booking'
export default {
  name: 'Calendar',
  data () {
    return {
      date: null,
      units: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8']
    }
  },
  methods: {
    updateDate(date) {
      this.date = date
    },
    left() {
      if(!this.date) {
        this.date = moment().subtract(7, 'days').format('YYYY-MM-DD')
      } else {
        this.date = moment(this.date).subtract(7, 'days').format('YYYY-MM-DD')
      }
      this.$refs.picker.left()
    },
    right() {
      if(!this.date) {
        this.date = moment().add(7, 'days').format('YYYY-MM-DD')
      } else {
        this.date = moment(this.date).add(7, 'days').format('YYYY-MM-DD')
      }
      this.$refs.picker.right()
    }
  },
  components: {
    Datepicker, Page, Units, Chart, Booking
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-top {
  display: flex;
  justify-content: space-between;
}
.chart-top * {
  flex: 1;
}
.chart {
  display: flex;
  margin-top: 10px;
}
</style>
