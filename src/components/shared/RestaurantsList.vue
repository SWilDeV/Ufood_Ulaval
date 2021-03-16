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
  props: ['homeForm'],

  created() {
    
    var arrayLength = this.homeForm.length
    console.log('allodd')
    for (var i = 0; i < arrayLength; i++) {
      console.log(i, this.homeForm[i].price_range)
    }
  }
}
</script>

<style></style>
