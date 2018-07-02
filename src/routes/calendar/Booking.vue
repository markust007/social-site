<template>
  <span>time</span>
</template>

<script>
export default {
  name: 'Booking',
  data () {
    return {

    }
  },
  computed: {
    res() {
      return this.$store.state.reservation
    }
  },
  methods: {

  },
  mounted() {

  },
  props: ['units']
}
</script>

<style scoped>
span {
  position: absolute;
  height: 30px;
  width: 25%;
  background: gray;
  margin-top: 10px;
}
</style>
