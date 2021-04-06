<template>
  <div>
    <home-header
      v-bind:all-genres="allGenres"
      v-bind:all-price-ranges="allPriceRanges"
      @filters-changed="setFilters($event)"
    />
    <restaurant-list v-bind:all-restaurants="allRestaurants" />
    <home-pager :count="count" :total="total" @page-changed="setPage($event)" />
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import HomePager from './HomePager'
import RestaurantList from './RestaurantList'
import { getRestaurants, getFilteredRestaurants } from '@/api/home'

export default {
  name: 'allRestaurants',
  components: { HomeHeader, HomePager, RestaurantList },
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
      const results = await getRestaurants(1000)

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
      this.allGenres.sort()
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
        const results = await getFilteredRestaurants(queryString)
        this.allRestaurants = results.items
        this.total = results.total
      } catch (e) {
        console.error(e)
      }
    },
    setFilters({ genre, price, search }) {
      this.genre = genre
      this.price = price
      this.search = search
      this.page = 1
    },
    setPage(page) {
      this.page = page
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
