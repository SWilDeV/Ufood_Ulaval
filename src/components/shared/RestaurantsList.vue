<template>
  <div class="restaurant-grid">
    <RestaurantCard></RestaurantCard>
  </div>
</template>

<script>
import RestaurantCard from './RestaurantCard'
import { get } from '@/api'

export default {
  name: 'restaurantList',
  components: {
    RestaurantCard
  },

  data: () => ({
    restaurants: []
  }),
  async created() {
    //Prend tout les restaurants sans contrainte
    const restaurantsResponse = await get(`/unsecure/restaurants?limit=130`)
    //LA LISTE DE RESTAURANTS UTILISABLES EST restaurantsResponse.items
    this.restaurants = restaurantsResponse.items
    var arrayLength = this.restaurants.length
    for (var i = 0; i < arrayLength; i++) {
      console.log(i, this.restaurants[i].name)
    }
  }
}
</script>

<style></style>
