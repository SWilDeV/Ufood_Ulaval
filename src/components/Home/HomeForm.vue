<template>
  <div>
    <homeHeader
      v-bind:allGenres="allGenres"
      v-bind:allPriceRanges="allPriceRanges"
      @filters-changed="updateFilters($event)"
    />
    <restaurantsList v-bind:allRestaurants="allRestaurants" />
    <div class="form-inline">
      <button class="btn btn-primary m-1" :disabled="page === 1" @click="page = 1">
        <font-awesome-icon icon="fast-backward" />
      </button>
      <button class="btn btn-primary m-1" :disabled="page === 1" @click="page--">
        <font-awesome-icon icon="step-backward" />
      </button>
      <input type="text" class="form-control m-1" v-model="page" disabled />
      <button class="btn btn-primary m-1" :disabled="page === pageCount" @click="page++">
        <font-awesome-icon icon="step-forward" />
      </button>
      <button class="btn btn-primary m-1" :disabled="page === pageCount" @click="page = pageCount">
        <font-awesome-icon icon="fast-forward" />
      </button>
    </div>
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
      allPriceRanges: [],
      count: 12,
      genre: '',
      page: 1,
      price: '',
      search: '',
      total: 0
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.count)
    },
    params() {
      return {
        genre: this.genre,
        page: this.page,
        price: this.price,
        search: this.search
      }
    }
  },
  async created() {
    try {
      const results = await get('/unsecure/restaurants?limit=1000')

      //On va chercher la liste de tous les genres différents:
      const restaurantsNumber = results.items.length
      for (let i = 0; i < restaurantsNumber; i++) {
        const genresForRestaurantArray = results.items[i].genres
        const genresForRestaurantNumber = genresForRestaurantArray.length
        for (let j = 0; j < genresForRestaurantNumber; j++) {
          if (!this.allGenres.includes(genresForRestaurantArray[j])) {
            this.allGenres.push(genresForRestaurantArray[j])
          }
        }
      }

      //On va chercher toutes les fourchettes de prix différentes:
      for (let i = 0; i < restaurantsNumber; i++) {
        const priceRange = results.items[i].price_range
        if (!this.allPriceRanges.includes(priceRange) && typeof priceRange !== 'undefined') {
          this.allPriceRanges.push(priceRange)
        }
      }
      this.allPriceRanges.sort((a, b) => a - b)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    updateFilters({ genre, price, search }) {
      this.genre = genre
      this.price = price
      this.search = search
    },
    async refresh({ genre, page, price, search }) {
      const query = [`limit=${this.count}`, `page=${page - 1}`]
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
        const results = await get(`/unsecure/restaurants?${queryString}`)
        this.allRestaurants = results.items
        this.total = results.total
      } catch (e) {
        console.error(e)
      }
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler(value) {
        this.refresh(value)
      }
    }
  }
}
</script>
