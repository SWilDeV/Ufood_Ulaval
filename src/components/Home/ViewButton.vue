<template>
  <div class="d-flex justify-content-cente">
    <router-link
      v-bind:to="{ name: 'Restaurant', params: { id: restaurantId } }"
      class="btn btn-primary w-100 "
      >View this restaurant</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'ViewButton',
  props: ['restaurantId']
}
</script>

<style scoped>
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
