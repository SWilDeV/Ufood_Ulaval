<template>
  <div class="row">
    <RestaurantCard
      v-for="restaurant in allRestaurants"
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
  props: ['allRestaurants']
}
</script>
