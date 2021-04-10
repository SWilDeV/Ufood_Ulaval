<template>
  <div class="container">
    <h1 class="title" style="font-size:3vw;">{{ $t('visits.title') }}</h1>
    <visit-lists :restaurants="restaurantDictionary" />
  </div>
</template>

<script>
import VisitLists from '@/components/Visits/VisitLists.vue'
import { getRestaurants } from '@/api/restaurants'
export default {
  name: 'Visits',
  components: { VisitLists },
  data() {
    return {
      restaurantDictionary: []
    }
  },
  async created() {
    try {
      const restaurants = (await getRestaurants({ count: 200 })).items
      for (const restaurant of restaurants) {
        this.restaurantDictionary.push({
          id: restaurant.id,
          name: restaurant.name
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.title {
  color: #2c3531;
  text-align: center;
  padding: 0vw 1vw 0.5vw 0vw;
}
</style>
