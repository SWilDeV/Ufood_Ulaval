<template>
  <div>
    <home-header
      :genres="allGenres"
      :price-ranges="allPriceRanges"
      @filters-changed="setFilters($event)"
    />

    <div v-if="mode === 'list'">
      <div class="text-center">
        <icon-button
          icon="map-marked-alt"
          text="home.map"
          variant="primary"
          @click="toggleMode('map')"
          size="lg"
          class="mb-3"
        />
      </div>

      <restaurant-list :restaurants="restaurants" />
      <pager class="mb-3" v-model="page" :count="count" :total="total" />
    </div>

    <div v-if="mode === 'map'">
      <div class="text-center">
        <icon-button
          icon="th-list"
          text="home.list"
          variant="primary"
          @click="toggleMode('list')"
          size="lg"
          class="mb-3"
        />
      </div>
      <restaurant-map :coords="coords" :restaurants="restaurants" />
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins'
import HomeHeader from './HomeHeader'
import IconButton from '@/components/shared/IconButton'
import Pager from '@/components/shared/Pager.vue'
import RestaurantList from './RestaurantList'
import RestaurantMap from './RestaurantMap'
import { getRestaurants } from '@/api/restaurants'

export default {
  mixins: [mixins],
  name: 'HomeForm',
  components: {
    HomeHeader,
    IconButton,
    Pager,
    RestaurantList,
    RestaurantMap
  },
  data() {
    return {
      allGenres: [],
      allPriceRanges: [],
      coords: null,
      count: 12,
      genre: '',
      mode: 'list',
      page: 1,
      price: '',
      restaurants: [],
      search: '',
      total: 0
    }
  },
  computed: {
    params() {
      const params = {
        genre: this.genre,
        price: this.price,
        search: this.search
      }
      switch (this.mode) {
        case 'list':
          params.count = this.count
          params.page = this.page
          break
        case 'map':
          params.coords = this.coords
          params.count = 20
          break
      }
      return params
    }
  },
  async created() {
    try {
      this.coords = await this.getPosition()
    } catch (e) {
      console.error(e)
    }

    try {
      const results = await getRestaurants({ count: 1000 })

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
    async refresh(params) {
      try {
        const results = await getRestaurants(params)
        this.restaurants = results.items
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
    },
    toggleMode(mode) {
      this.mode = mode
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler(params) {
        this.refresh(params)
      }
    }
  }
}
</script>
