<template>
  <div class="home-form">
    <homeHeader
      v-bind:allGenres="allGenres"
      v-bind:allPriceRanges="allPriceRanges"
      v-bind:refresh="refresh"
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

  data() {
    return {
      allRestaurants: [],
      allGenres: [],
      allPriceRanges: []
    }
  },
  async created() {
    try {
      const restaurantsResponse = await get('/unsecure/restaurants?limit=130')
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
    async refresh({ genre, price, search }) {
      const query = ['limit=130']
      if (genre) {
        query.push(`genres=${genre}`)
      }
      if (price) {
        query.push(`price_range=${price}`)
      }
      if (search) {
        query.push(`q=${search}`)
      }

      const queryString = query.join('&')
      try {
        const restaurantsResponse = await get(`/unsecure/restaurants?${queryString}`)
        this.allRestaurants = restaurantsResponse.items
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
