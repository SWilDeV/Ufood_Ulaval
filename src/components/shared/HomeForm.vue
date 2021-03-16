<template>
  <div class="home-form">
    <homeHeader></homeHeader>
    <restaurantsList v-bind:homeForm="homeForm"></restaurantsList>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import RestaurantsList from './RestaurantsList'
import { get } from '@/api'

export default {
  name: 'homeForm',
  components: { HomeHeader, RestaurantsList },

  data: () => ({
    homeForm: []
  }),
  async created() {
    //Prend tout les restaurants sans contrainte
    const restaurantsResponse = await get(`/unsecure/restaurants?limit=130`)
    //LA LISTE DE RESTAURANTS UTILISABLES EST restaurantsResponse.items
    this.homeForm = restaurantsResponse.items
    /*
    var arrayLength = this.restaurants.length
    for (var i = 0; i < arrayLength; i++) {
      console.log(i, this.restaurants[i].name)
    }
    */
  }
}
</script>

<style></style>
