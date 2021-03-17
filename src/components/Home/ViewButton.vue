<template>
  <router-link
    v-bind:to="{ name: 'Restaurant', params: { id: restaurantId } }"
    tag="button"
    class="viewButton"
  >
    View this restaurant
  </router-link>
</template>

<script>
export default {
  name: 'ViewButton',
  props: ['restaurantId']
}
</script>

<style scoped>
.viewButton {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.3em 1.2em;
  margin: 1em 0.8em 0.8em 0.8em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: white;
  background-color: #2aa8f1;
  text-align: center;
  transition: all 0.2s;
}

.orderButton:hover {
  background-color: #3d8ffa;
}
@media all and (max-width: 30em) {
  a.orderButton {
    display: block;
    margin: 0.2em auto;
  }
}
</style>
