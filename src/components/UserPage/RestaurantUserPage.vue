<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div>
          <h4 class="form-inline">{{ this.name }}</h4>
          <button
            class="w-10 btn btn-xs btn-outline-danger float-right"
            type="button"
            v-on:click="deleteFavoriteRestaurant"
          >
            &times;
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
import { mapState } from 'vuex'
import { get } from '@/api'
export default {
  name: 'restaurantUserPage',
  props: {
    restaurantId: { type: String, required: true },
    listId: { type: String, required: true }
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    deleteFavoriteRestaurant() {
      try {
        const restaurantId = this.restaurantId
        const listId = this.listId

        this.$emit('resto-deleted', { restaurantId, listId })
      } catch (e) {
        console.error(e)
      }
    }
  },
  async created() {
    try {
      const restaurant = await get(`/unsecure/restaurants/${this.restaurantId}`)
      this.name = restaurant.name
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
