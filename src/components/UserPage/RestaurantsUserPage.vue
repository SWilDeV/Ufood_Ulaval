<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div class="card-body d-inline">
          <h4 class="d-inline">{{ this.name }}</h4>
          <button
            class="d-inline w-10  m-2 btn btn-xs btn-outline-danger float-right"
            type="button"
            v-on:click="deleteFavoriteRestaurant(listId, restaurantId)"
          >
            X
          </button>
          <button type="button" class=" float-right w-10 btn btn-lg btn-outline-primary">
            More Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, _delete } from '@/api'
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
        _delete(`/unsecure/favorites/${p_listid}/restaurants/${p_restoID}`)
        this.$emit('resto-deleted', p_restoID)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
