<template>
  <div class="home-form">
    <homeHeader
      v-bind:allGenres="allGenres"
      v-bind:allPriceRanges="allPriceRanges"
      v-bind:onGenreChange="onGenreChange"
      v-bind:onPriceChange="onPriceChange"
      v-bind:onSearch="onSearch"
    ></homeHeader>
    <restaurantsList v-bind:allRestaurants="allRestaurants"></restaurantsList>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import RestaurantsList from './RestaurantsList'
import { get } from '@/api'

export default {
  name: 'allRestaurants',
  components: { HomeHeader, RestaurantsList },

  data: () => ({
    allRestaurants: [],
    allGenres: [],
    allPriceRanges: []
  }),
  async created() {
    try {
      const restaurantsResponse = await get(`/unsecure/restaurants?limit=130`)
      this.allRestaurants = restaurantsResponse.items
    } catch (e) {
      console.error(e)
    }

    //On va chercher la liste de tous les genres différents:
    let restaurantsNumber = this.allRestaurants.length
    for (let i = 0; i < restaurantsNumber; i++) {
      let genresForRestaurantArray = this.allRestaurants[i].genres
      let genresForRestaurantNumber = genresForRestaurantArray.length
      for (let j = 0; j < genresForRestaurantNumber; j++) {
        if (!this.allGenres.includes(genresForRestaurantArray[j])) {
          this.allGenres.push(genresForRestaurantArray[j])
        }
      }
    }

    //On va chercher toutes les fourchettes de prix différentes:
    for (let i = 0; i < restaurantsNumber; i++) {
      let priceRange = this.allRestaurants[i].price_range
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
        try {
          const restaurantsResponse = await get(`/unsecure/restaurants?limit=130`)
          this.allRestaurants = restaurantsResponse.items
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          const restaurantsResponse = await get(`/unsecure/restaurants?genres=${selectedGenre}`)
          this.allRestaurants = restaurantsResponse.items
        } catch (e) {
          console.error(e)
        }
      }
    },

    async onPriceChange(selectedGenre, selectedPrice) {
      console.log(selectedGenre, selectedPrice)
      if (selectedPrice === 'allPrices') {
        try {
          const restaurantsResponse = await get(`/unsecure/restaurants?limit=30`)
          this.allRestaurants = restaurantsResponse.items
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          const restaurantsResponse = await get(
            `/unsecure/restaurants?price_range=${selectedPrice}`
          )
          this.allRestaurants = restaurantsResponse.items
        } catch (e) {
          console.error(e)
        }
      }
    },

    async onSearch(searchValue) {
      console.log(searchValue)
      if (searchValue === '') {
        const restaurantsResponse = await get(`/unsecure/restaurants?limit=30`)
        this.allRestaurants = restaurantsResponse.items
      } else {
        const restaurantsResponse = await get(`/unsecure/restaurants?q=${searchValue}`)
        this.allRestaurants = restaurantsResponse.items
      }
    }
  }
}
</script>

<style></style>
