<template>
  <div class="calendar">
        <div class="calendar__header">
          <div v-for="day in days">{{day | moment('MMM D')}}</div>
        </div>
        <div class="calendar__week" v-for="(item, index) in units">
          <span v-for="(r, id) in res" v-if="r.name == item && r.depart >= arrive && r.depart < leave" :style="[leftStyle(r.arrival), widthStyle(r.arrival, r.depart)]">
            <v-icon left size="20" color="white" style="verticalAlign:top;padding:5px 0 0 5px;">person</v-icon><p>{{r.message}}</p>
          </span>
          <div class="calendar__day day" v-for="day in days">
          </div>
        </div>
      </div>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import { config, app, users, comments, wishlist, fs, timestamp } from '../../util/config'
export default {
  name: 'Chart',
  data () {
    return {
      res: []
    }
  },
  computed: {
    days() {
      // let num;
      // if(window.outerWidth < 480) {
      //   num = 4
      // } else if(window.outerWidth < 768) {
      //   num = 5
      // } else if(window.outerWidth < 1024) {
      //   num = 6
      // } else {
      //   num = 7
      // }
      let array = Array(7).fill().map((_, i) => moment(this.newDate).clone().add(i, 'days').format('YYYY-MM-DD'))
      return array
    },
    // res() {
    //   return this.$store.state.reservation
    // },
    newDate() {
      if(!this.date) {
        return moment().format('YYYY-MM-DD')
      } else {
        return this.date
      }
    },
    arrive() {
      let arrive = moment(this.newDate).format('YYYY-MM-DD')
      return arrive
    },
    leave() {
      let leaving = moment(this.newDate).clone().add(8, 'days').format('YYYY-MM-DD')
      return leaving;
    },
    style() {

    }
  },
  methods: {
    calendar() {
      const users = fs.collection("calendar");
      users.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.res.push(doc.data())
        });
      }).catch((error) => {
          console.log("Error getting name:", error);
      });
    },
    leftStyle(arrival) {
      switch(true) {
        case arrival < moment(this.newDate).format('YYYY-MM-DD'):
            return {left: '0%'}
            break;
        case arrival == moment(this.newDate).format('YYYY-MM-DD'):
            return {left: '7.14%'}
            break;
        case arrival == moment(this.newDate).clone().add(1, 'day').format('YYYY-MM-DD'):
            return {left: '21.42%'}
            break;
        case arrival == moment(this.newDate).clone().add(2, 'days').format('YYYY-MM-DD'):
            return {left: '35.7%'}
            break;
        case arrival == moment(this.newDate).clone().add(3, 'days').format('YYYY-MM-DD'):
            return {left: '49.98%'}
            break;
        case arrival == moment(this.newDate).clone().add(4, 'days').format('YYYY-MM-DD'):
            return {left: '64.26%'}
            break;
        case arrival == moment(this.newDate).clone().add(5, 'days').format('YYYY-MM-DD'):
            return {left: '78.54%'}
            break;
        case arrival == moment(this.newDate).clone().add(6, 'days').format('YYYY-MM-DD'):
            return {left: '92.82%'}
            break;
        default:
            console.log('none')
      }
    },
    widthStyle(arrival, depart) {
      let arr = moment(arrival) //arrival date
      let dep = moment(depart) //departure date
      let first = moment(this.newDate) //current date
      if(arr < first) {
        arr = first
      }
      let duration = moment.duration(dep.diff(arr)); //difference from arrival to departure
      let fromLeft = moment.duration(first.diff(arr)); //difference from arrival to now
      let days = duration.asDays(); //+days between arrival and depart
      let minusDays = fromLeft.asDays(); //-days between arrival and now
      let arrFormat = moment(arrival).format('YYYY, MM, DD')
      let firstFormat = moment(this.newDate).format('YYYY, MM, DD')
      let depFormat = moment(depart).format('YYYY, MM, DD')
      let multiplier = 100 / this.days.length
      let width = multiplier * days
      if(arrFormat < firstFormat && firstFormat == depFormat) {
        return {width: '7%'}
      } else if(arrFormat < firstFormat) {
        return {width: (width + 7) + '%'}
      } else {
        return {width: width + '%'}
      }
    }
  },
  mounted() {
    this.calendar()
    //Get dates allowed for datepicker
    let arr = []
    let dep = []
    let usedDates = []
    let datesArray = []
    let dates = this.res.map((item, index) => {
      arr.push(moment(item.arrival))
      dep.push(moment(item.depart))
      let newDates = moment.duration(dep[index].diff(arr[index])).asDays()
      datesArray.push(newDates)
      usedDates.push(moment(item.arrival).format('YYYY, MM, DD'))
      usedDates.push(arr[index].add(datesArray[index], 'days').format('YYYY, MM, DD'))
      datesArray = [...(new Set(usedDates))]
    });
    console.log(datesArray)
  },
  props: ['date', 'units']
}
</script>

<style scoped>
.calendar{}

.calendar__week,
.calendar__header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar__week {
  grid-auto-rows: 50px;
  text-align: right;
  position: relative;
}

.calendar__header {
  grid-auto-rows: 50px;
  align-items: center;
  text-align: center;
}

.calendar__day {
  padding: 16px;
}
.calendar {
  flex: 4;
  background-color: white;
  border: 1px solid #e1e1e1;
  overflow: hidden;
}

.calendar span {
  position: absolute;
  height: 30px;
  width: 25%;
  background: #00BCD4;
  top: 10px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar span p {
  display: inline-block;
  color: white;
  padding: 6px 8px;
  font-size: 0.9rem;
  margin: 0;
}

.calendar__header > div {
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bold;
}

.calendar__day {
  border-right: 1px solid #e1e1e1;
  border-top: 1px solid #e1e1e1;
}

.calendar__day:last-child {
  border-right: 0;
}
</style>
