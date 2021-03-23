<template>
  <div class="row">
    <restaurant-card
      v-for="restaurant in allRestaurants"
      v-bind:key="restaurant.id"
      v-bind:restaurant="restaurant"
    />
  </div>
</template>

<script>
import RestaurantCard from './RestaurantCard'

export default {
  name: 'restaurantList',
  components: {
    RestaurantCard
  },
  props: ['allRestaurants']
}
</script>
