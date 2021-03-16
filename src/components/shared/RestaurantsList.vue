<template>
  <div class="restaurant-grid">
    <RestaurantCard
      v-for="restaurant in homeForm"
      v-bind:key="restaurant.id"
      v-bind:restaurant="restaurant"
    >
    </RestaurantCard>
  </div>
</template>

<script>
import RestaurantCard from './RestaurantCard'

export default {
  name: 'restaurantList',
  components: {
    RestaurantCard
  },
  props: ['homeForm']
}
</script>

<style></style>
