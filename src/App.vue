<template>
  <div id="app">
    <v-app>
      <Auth :comments="comments" @signedIn="signedIn = true" :signedIn="!signedIn"></Auth>
      <v-navigation-drawer width="225" clipped v-model="drawer" app v-show="signedIn">
      <v-divider></v-divider>
      <v-list dense class="pt-0">

          <v-list-tile active-class="cyan--text" to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile active-class="cyan--text" to="/calendar">
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Calendar</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile active-class="cyan--text" to="/comments">
            <v-list-tile-action>
              <v-icon>chat_bubble</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Comments</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile active-class="cyan--text" to="/wishlist">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Wishlist</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

      </v-list>
      </v-navigation-drawer>
      <v-toolbar color="white" fixed app dense clipped-left class="elevation-1" v-show="signedIn">
        <v-toolbar-side-icon @click.stop="drawer = !drawer">
          <v-icon large color="cyan" v-if="drawer">clear</v-icon>
          <v-icon large color="cyan" v-else>menu</v-icon>
        </v-toolbar-side-icon>
        <v-divider vertical></v-divider>
        <v-toolbar-title class="cyan--text">Social Media</v-toolbar-title>
        <div class="initials">
          <p>{{initials}}</p>
        </div>
      </v-toolbar>
      <v-content v-show="signedIn">
        <v-container fluid>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeIn"
          >
            <router-view :comments="comments" :wishlist="wishlist" :key="this.$route.path"></router-view>
          </transition>
        </v-container>
      </v-content>
      <v-footer app v-show="signedIn" class="cyan--text"><v-spacer></v-spacer>0.0.1</v-footer>
    </v-app>
  </div>
</template>

<script>
import store from './store/index'
import router from './router'

import Auth from './routes/Auth.vue'

import firebase from 'firebase'
import 'Firebase/firestore'

import { config, app, users, comments, wishlist, fs, timestamp } from './util/config'
import date from './util/date'

export default {
  name: 'App',
  store,
  router,
  data() {
    return {
      drawer: true,
      signedIn: false
    }
  },
  firebase: {
    comments: comments,
    wishlist: wishlist
 },
  computed: {
    email () {
      return this.$store.state.email
    },
    name () {
      return this.$store.state.name
    },
    commentsLength() {
      return this.comments.length + 1
    },
    initials() {
      return this.$store.state.initials
    }
  },
  mounted() {
    console.log(fs)
    fs.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data());
      });
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    // USE BELOW FOR USER WITH AUTO GENERATED DOCUMENT
    // fs.collection("users").doc('newUser').add({
    //     name: "Some Guy",
    //     handle: "handle",
    //     created: this.date
    // })
    // USE BELOW FOR USER WHEN ADDING DOCUMENT
    // fs.collection("users").doc("newUser").set({
    //   name: "Some Guy",
    //   handle: "handle",
    //   created: this.date
    // })
    console.log(this.date)
  },
  components: {
    Auth
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');

@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons');

#app {
  background: rgba(238, 238, 238, 1);
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
a {
  color: #fff;
  text-decoration: none;
  transition: all .3s;
}
a .list__tile__title {
  color: #666;
}
.initials {
  background: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 0;
  position: absolute;
  right: 0;
  background: #00BCD4;
}
.initials p {
  margin: 2px 0 0;
  color: white;
}
</style>
