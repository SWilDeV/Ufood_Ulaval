<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div>
          <h4 class="form-inline">{{ this.name }}</h4>
          <button
            class="w-10 btn btn-xs btn-outline-danger float-right"
            type="button"
            v-on:click="deleteFavoriteRestaurant(listId, restaurantId)"
          >
            X
          </button>
          <button type="button" class=" float-right w-10 btn btn-outline-primary">
            More Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'restaurantUserPage',
  props: {
    restaurantId: { type: String, required: true },
    listId: { type: String, required: true }
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getRestaurantName(this.restaurantId)
    })
  },
  methods: {
    async getRestaurantName(id) {
      try {
        const response = await get(`/unsecure/restaurants/${id}`)
        this.name = response.name
      } catch (e) {
        console.error(e)
      }
    },
    deleteFavoriteRestaurant(p_listid, p_restoID) {
      try {
        this.$emit('resto-deleted', { p_listid, p_restoID })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
