import Vue from 'vue'
import Vuex from 'vuex'

const uid = (() => '_' + Math.random().toString(36).substr(2, 9))

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    items: null,
    userName: "",
    menu: true,
    email: "",
    name: "",
    initials: "",
    reservation: [
      {
        id: uid(),
        arrival: '2018-06-19',
        depart: '2018-06-20',
        customer: 'John Lennon',
        unit: 'Unit 1'
      },
      {
        id: uid(),
        arrival: '2018-06-20',
        depart: '2018-06-22',
        customer: 'Paul McCartney',
        unit: 'Unit 2'
      },
      {
        id: uid(),
        arrival: '2018-06-21',
        depart: '2018-06-22',
        customer: 'Ringo Starr',
        unit: 'Unit 3'
      },
      {
        id: uid(),
        arrival: '2018-06-21',
        depart: '2018-06-23',
        customer: 'George Harrison',
        unit: 'Unit 4'
      },
      {
        id: uid(),
        arrival: '2018-06-22',
        depart: '2018-06-23',
        customer: 'Mick Jagger',
        unit: 'Unit 5'
      },
      {
        id: uid(),
        arrival: '2018-06-20',
        depart: '2018-06-23',
        customer: 'Keith Richards',
        unit: 'Unit 6'
      },
      {
        id: uid(),
        arrival: '2018-06-21',
        depart: '2018-06-22',
        customer: 'Eric Clapton',
        unit: 'Unit 1'
      },
      {
        id: uid(),
        arrival: '2018-06-23',
        depart: '2018-06-24',
        customer: 'Pete Townshend',
        unit: 'Unit 2'
      },
      {
        id: uid(),
        arrival: '2018-06-24',
        depart: '2018-06-25',
        customer: 'Jimmy Page',
        unit: 'Unit 5'
      },
      {
        id: uid(),
        arrival: '2018-06-21',
        depart: '2018-06-24',
        customer: 'Roger Daltry',
        unit: 'Unit 7'
      }
    ]
  },
  mutations: {
    setArrival (state, value, id) {
      state.reservation[id].arrival = value;
    },
    setItems (state, value) {
      state.items = value;
    },
    updateEmail (state, value) {
      state.email = value;
    },
    updateName (state, value) {
      state.name = value;
    },
    updateInitials (state, value) {
      state.initials = value;
    },
    changeUserName (state, value) {
      state.userName = value;
    },
    menuToggle (state) {
      state.menu = !state.menu;
    }
  }
})
export default store
