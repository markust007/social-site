<template>
  <div class="buttons">
    <button @click="$emit('left')"><v-icon large>keyboard_arrow_left</v-icon></button>
    <button @click="$emit('right')"><v-icon large>keyboard_arrow_right</v-icon></button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },
  props: []
}
</script>

<style scoped>
.buttons {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: right!important;
}
button {
  background: white;
  border-radius: 2px;
  height: 48px;
  width: 48px;
}
button:focus {
  outline: none;
}
</style>
