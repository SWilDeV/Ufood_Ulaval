<template>
  <div class="row">
    <restaurant-card
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>

<script>
import RestaurantCard from './RestaurantCard'

export default {
  name: 'RestaurantList',
  components: {
    RestaurantCard
  },
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>
