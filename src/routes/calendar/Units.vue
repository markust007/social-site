<template>
  <ul class="container">
    <li class="header"><p>Name</p></li>
    <li class="unit" v-for="(item, index) in units">
      <p>{{item}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Units',
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
  props: ['units']
}
</script>

<style scoped>
ul {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid #e1e1e1;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  background: white;
}
li {
  display: grid;
  grid-auto-rows: 50px;
  align-items: center;
}
p {
  border-top: 1px solid #e1e1e1;
  margin: 0;
  padding: 14px;
}
li:first-child p {
  border-top: 0px solid #e1e1e1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}
</style>
