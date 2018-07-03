<template>
  <section id="dashboard">
    <nav>
        <v-card flat to="calendar" hover>
          <div class="icon" style="borderRadius:50%;">
            <v-icon x-large color="white" style="marginTop: 16px;">date_range</v-icon>
          </div>
          <p class="head">Calendar</p>
          <h3>{{eventsLength}}</h3>
          <p class="text">Events</p>
          <v-divider></v-divider>
          <v-btn flat large block color="cyan" style="margin:-1px 0">View<v-icon size="20" style="marginLeft:5px">arrow_forward</v-icon></v-btn>
        </v-card>

        <v-card flat to="comments" hover>
          <div class="icon" style="borderRadius:50%;">
            <v-icon x-large color="white" style="marginTop: 20px;">chat_bubble</v-icon>
          </div>
          <p class="head">Comments</p>
          <h3>{{commentsLength}}</h3>
          <p class="text">Comments</p>
          <v-divider></v-divider>
          <v-btn flat large block color="cyan" style="margin:-1px 0">View<v-icon size="20" style="marginLeft:5px">arrow_forward</v-icon></v-btn>
        </v-card>

        <v-card flat to="wishlist" hover>
          <div class="icon" style="borderRadius:50%;">
            <v-icon x-large color="white" style="marginTop: 20px;">list</v-icon>
          </div>
          <p class="head">Wishlists</p>
          <h3>{{wishlistLength}}</h3>
          <p class="text">Wishlists</p>
          <v-divider></v-divider>
          <v-btn flat large block color="cyan" style="margin:-1px 0">View<v-icon size="20" style="marginLeft:5px">arrow_forward</v-icon></v-btn>
        </v-card>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sign: true,
    };
  },

  computed: {
    commentsLength() {
      return this.comments.length
    },
    wishlistLength() {
      return this.wishlist.length
    },
    eventsLength() {
      return this.$store.state.reservation.length
    }
  },

  methods: {

  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ['comments', 'wishlist']
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  a {
    flex: 1;
    // min-width: 200px;
    background: #fff;
    margin: 0 35px 0 0;
    border: 1px solid #ddd;
    text-align: center;
    text-decoration: none;
    &:-webkit-any-link {
      text-decoration: none;
    }
    p, h3 {
      text-decoration: none;
    }
    .icon {
      width: 75px;
      height: 75px;
      margin: 15px auto 0;
      background: #00BCD4;
    }
    .head {
      margin: 0;
      margin-top: 10px;
      font-weight: 700;
      color: #000;
      text-align: center;
      font-size: 1.2rem;
    }
    h3 {
      font-size: 5rem;
      margin: 0;
      color: #00BCD4;
      line-height: 1.1;
    }
    .text {
      color: #000;
      margin: -10px 0 20px;
      font-weight: 700;
    }
  }
}
</style>
