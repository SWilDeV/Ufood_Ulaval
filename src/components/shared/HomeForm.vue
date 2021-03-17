<template>
  <div class="home-form">
    <homeHeader
      v-bind:allGenres="allGenres"
      v-bind:allPriceRanges="allPriceRanges"
      v-bind:onGenreChange="onGenreChange"
      v-bind:onPriceChange="onPriceChange"
      v-bind:onSearch="onSearch"
    ></homeHeader>
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
      const restaurantsResponse = await get(`/unsecure/restaurants?limit=130`)
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
  },

  methods: {
    async onGenreChange(selectedGenre, selectedPrice) {
      console.log(selectedGenre, selectedPrice)
      if (selectedGenre === 'allGenres') {
        const restaurantsResponse = await get(`/unsecure/restaurants?limit=130`)
        this.homeForm = restaurantsResponse.items
      } else {
        const restaurantsResponse = await get(`/unsecure/restaurants?genres=${selectedGenre}`)
        this.homeForm = restaurantsResponse.items
      }
    },

    async onPriceChange(selectedGenre, selectedPrice) {
      console.log(selectedGenre, selectedPrice)
      if (selectedPrice === 'allPrices') {
        const restaurantsResponse = await get(`/unsecure/restaurants?limit=30`)
        this.homeForm = restaurantsResponse.items
      } else {
        const restaurantsResponse = await get(`/unsecure/restaurants?price_range=${selectedPrice}`)
        this.homeForm = restaurantsResponse.items
      }
    },

    async onSearch(searchValue) {
      console.log(searchValue)
      if (searchValue === '') {
        const restaurantsResponse = await get(`/unsecure/restaurants?limit=30`)
        this.homeForm = restaurantsResponse.items
      } else {
        const restaurantsResponse = await get(`/unsecure/restaurants?q=${searchValue}`)
        this.homeForm = restaurantsResponse.items
      }
    }
  }
}
</script>

<style></style>
