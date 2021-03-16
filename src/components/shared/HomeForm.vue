<template>
  <div class="home-form">
    <homeHeader v-bind:allGenres="allGenres" v-bind:allPriceRanges="allPriceRanges"></homeHeader>
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
    homeForm: [],
    allGenres: [],
    allPriceRanges: []
  }),
  async created() {
    try {
      const restaurantsResponse = await get(`/unsecure/restaurants?limit=20`)
      this.homeForm = restaurantsResponse.items
    } catch (e) {
      console.error(e)
    }

    //On va chercher la liste de tous les genres différents:
    let restaurantsNumber = this.homeForm.length
    for (let i = 0; i < restaurantsNumber; i++) {
      let genresForRestaurantArray = this.homeForm[i].genres
      let genresForRestaurantNumber = genresForRestaurantArray.length
      for (let j = 0; j < genresForRestaurantNumber; j++) {
        if (!this.allGenres.includes(genresForRestaurantArray[j])) {
          this.allGenres.push(genresForRestaurantArray[j])
        }
      }
    }

    //On va chercher toutes les fourchettes de prix différentes:
    for (let i = 0; i < restaurantsNumber; i++) {
      let priceRange = this.homeForm[i].price_range
      if (!this.allPriceRanges.includes(priceRange) && typeof priceRange !== 'undefined') {
        this.allPriceRanges.push(priceRange)
      }
    }
    this.allPriceRanges.sort(function(a, b) {
      return a - b
    })
  }
}
</script>

<style></style>
