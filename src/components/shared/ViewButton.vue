<template>
  <router-link
    v-bind:to="{ name: 'Restaurant', params: { id: restaurantId } }"
    class="btn btn-primary"
  >
    <font-awesome-icon icon="eye" />
    {{ $t('viewButton.text') }}
  </router-link>
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
