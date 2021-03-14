<template>
  <div class="container">
    <!-- {{ $t('userPage.hello', { name: user.name }) }} -->
    <panel />
    <visitedRestaurants />
  </div>
</template>

<script>
import visitedRestaurants from './visitedRestaurants'
import panel from './Panel'
import { get } from '@/api'
export default {
  name: 'userPage',
  components: {
    visitedRestaurants,
    panel
  },
  beforeMount() {
    this.getRestUser()
  },
  methods: {
    async getRestUser() {
      try {
        const restaurants = await get('/unsecure/restaurants')
        console.log(restaurants)
      } catch (e) {
        this.onError(e)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 100%;
  background-color: royalblue;
}

.weather-header {
  max-width: 700px;
  font-size: 50px;
  color: white;
}
</style>
