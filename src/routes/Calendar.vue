<template>
  <div>
    <div class="chart-top">
      <AddDate @newDate="updateDate" @addDate="addDate"></AddDate>
      <Datepicker @newDate="updateDate" ref="picker"></Datepicker>
      <Page @left="left" @right="right"></Page>
    </div>
    <div class="chart">
      <Units :units="units" v-if="units"></Units>
      <Chart :date="date" :units="units" v-if="units" ref="chart">
        <!-- <Booking></Booking> -->
      </Chart>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { config, app, users, comments, wishlist, fs, timestamp } from '../util/config'
import moment from 'moment'
import AddDate from './calendar/AddDate'
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
      units: []
    }
  },
  methods: {
    addDate() {
      this.$refs.chart.calendar()
    },
    names() {
      const users = fs.collection("users");
      users.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.units.push(doc.data().name)
        });
      }).catch((error) => {
          console.log("Error getting name:", error);
      });
    },
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
  mounted() {
    this.names()
  },
  components: {
    AddDate, Datepicker, Page, Units, Chart, Booking
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
