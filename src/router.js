import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './routes/Dashboard.vue'
import Calendar from './routes/Calendar.vue'
import Comments from './routes/Comments.vue'
import Wishlist from './routes/Wishlist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/tape-chart/',
  // base: '/',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments,
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist,
    }
  ]
})
