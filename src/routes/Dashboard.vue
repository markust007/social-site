<template>
  <section id="dashboard">
    <nav>
        <v-card flat to="calendar">
          <p class="head">Calendar<span><i class="fas fa-chevron-right"></i></span></p>
          <h3>{{eventsLength}}</h3>
          <p class="text">Total Events</p>
          <v-btn color="cyan" dark style="marginTop:15px">View Calendar</v-btn>
        </v-card>

        <v-card flat to="comments">
          <p class="head">Comments<span><i class="fas fa-chevron-right"></i></span></p>
          <h3>{{commentsLength}}</h3>
          <p class="text">Total Comments</p>
          <v-btn color="cyan" dark style="marginTop:15px">View Comments</v-btn>
        </v-card>

        <v-card flat to="wishlist">
          <p class="head">Wishlists<span><i class="fas fa-chevron-right"></i></span></p>
          <h3>{{wishlistLength}}</h3>
          <p class="text">Total Wishlist's</p>
          <v-btn color="cyan" dark style="marginTop:15px">View Wishlists</v-btn>
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
    min-width: 200px;
    min-height: 225px;
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
    .head {
      background: #eee;
      margin: 0;
      padding: 5px 10px;
      font-weight: 700;
      color: #666;
      border-bottom: 1px solid #ddd;
      text-align: left;
      span {
        float: right;
      }
    }
    h3 {
      font-size: 4rem;
      margin: 20px 0 0;
      color: #666;
    }
    .text {
      color: #666;
      margin: 0;
      font-weight: 700;
    }
  }
}
</style>
