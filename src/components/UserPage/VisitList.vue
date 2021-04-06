<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" v-t="'visits.restaurant'" />
          <th scope="col" v-t="'visits.date'" />
          <th scope="col" v-t="'visits.rating'" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="visit in visits" :key="visit.id" v-b-modal="visit.id">
          <td v-text="index[visit.restaurant_id]" />
          <td v-text="formatDate(visit.date)" />
          <td v-text="visit.rating" />
          <visit-modal
            :id="visit.id"
            :restaurant-id="visit.restaurant_id"
            :title="index[visit.restaurant_id]"
            :visit="visit"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import mixins from '@/mixins'
import VisitModal from '@/components/shared/VisitModal.vue'
import { getVisits } from '@/api/visits'

export default {
  name: 'VisitList',
  mixins: [mixins],
  components: {
    VisitModal
  },
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visits: []
    }
  },
  computed: {
    index() {
      const index = {}
      for (const restaurant of this.restaurants) {
        index[restaurant.id] = restaurant.name
      }
      return index
    }
  },
  async created() {
    try {
      this.visits = (await getVisits(1000)).items.sort((a, b) => (a.date > b.date ? -1 : 1))
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
