<template>
  <div class="buttons">
    <button @click="$emit('left')"><v-icon>keyboard_arrow_left</v-icon></button>
    <button @click="$emit('right')"><v-icon>keyboard_arrow_right</v-icon></button>
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
  -webkit-box-flex: 4;
  -ms-flex: 4;
  flex: 4;
  text-align: right!important;
  margin-top: 10px;
}
button {
  border: 1px solid #e1e1e1;
  border-radius: 2px;
}
</style>
