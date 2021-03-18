<template>
  <ul>
    <li v-for="visit in visits" :key="visit.id">
      <a href="#" v-b-modal="visit.id">
        {{ formatDate(visit.date) }}
      </a>
      <visit-modal :id="visit.id" :restaurant-id="visit.restaurant_id" :visit="visit" />
    </li>
  </ul>
</template>

<script>
import { getVisits } from '@/api/visits'
import VisitModal from '@/components/shared/VisitModal.vue'

export default {
  name: 'Visits',
  components: {
    VisitModal
  },
  data() {
    return {
      visits: []
    }
  },
  methods: {
    formatDate(value) {
      const date = new Date(value)
      const formatter = new Intl.DateTimeFormat(this.$i18n.locale, {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
      return formatter.format(date)
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
