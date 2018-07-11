<template>
  <div class="datepicker">
    <v-btn
      color="cyan"
      dark
      @click.stop="dialog = true"
    >
      New Event
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="650"
    >
    <div class="modal">
      <p>Pick a date range for your event</p>
      <v-date-picker v-model="firstDate" no-title scrollable>
      </v-date-picker>
      <v-date-picker v-model="secondDate" no-title scrollable :allowed-dates="allowedDates">
      </v-date-picker>
      <v-text-field placeholder="Add Comment" v-model="message"></v-text-field>
      <v-btn flat color="cyan" @click="dialog = false">Cancel</v-btn>
      <v-btn flat color="cyan" @click="saveDate">OK</v-btn>
    </div>
    </v-dialog>
  </div>
</template>

<script>
let datesArray = []
import moment from 'moment'
import firebase from 'firebase'
import { config, app, users, comments, wishlist, fs, timestamp } from '../../util/config'
export default {
  name: 'Add-Date',
  data () {
    return {
      firstDate: null,
      secondDate: null,
      message: "",
      dialog: false,
      datesArray: datesArray
    }
  },
  computed: {
    email () {
      return this.$store.state.email
    },
    name () {
      return this.$store.state.name
    },
    newDate() {
      if(!this.date) {
        return moment().format('MMM Do YY');
      } else {
        // this.$emit('newDate', this.date)
        return moment(this.date).format('MMM Do YY');
      }
    },
    res() {
      return this.$store.state.reservation
    },
    date() {
      if(!this.firstDate && !this.secondDate) {
        return moment().format('MMM Do YY');
      } else {
        // this.$emit('newDate', this.date)
        return this.firstDate + " - " + this.secondDate
      }
    }
  },
  methods: {
    saveDate() {
      this.dialog = false
      const $index = this.email.indexOf("@")
      const $name = this.email.slice(0, $index);
      fs.collection("calendar").doc().set({
        arrival: this.firstDate,
        depart: this.secondDate,
        message: this.message,
        name: this.name
      })
      this.$emit('addDate')
    },
    left() {
      if(!this.date) {
        this.date = moment().subtract(7, 'days').format('YYYY-MM-DD')
      } else {
        this.date = moment(this.date).subtract(7, 'days').format('YYYY-MM-DD')
      }
    },
    right() {
      if(!this.date) {
        this.date = moment().add(7, 'days').format('YYYY-MM-DD')
      } else {
        this.date = moment(this.date).add(7, 'days').format('YYYY-MM-DD')
      }
    },
    allowedDates: val => datesArray.indexOf(val) == -1
  },
  mounted() {
    let usedDates = []
    usedDates.push(moment().format('YYYY-MM-DD'))
    datesArray = [...(new Set(usedDates))]
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datepicker {
  text-align: left;
  /* border: 1px solid #e1e1e1; */
}
.modal {
  background: #f5f5f5;
  padding: 25px 32px 0;
}
</style>
