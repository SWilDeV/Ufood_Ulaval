<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div>
          <h4 class="form-inline">{{ this.name }}</h4>

          <button
            class="btn btn-xs btn-outline-danger float-right"
            type="button"
            v-on:click="deleteFavoriteRestaurant"
          >
            &times;
          </button>
          <view-button v-bind:restaurant-id="restaurantId"></view-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get } from '@/api'
import ViewButton from '@/components/shared/ViewButton.vue'
export default {
  name: 'restaurantUserPage',
  props: {
    restaurantId: { type: String, required: true },
    listId: { type: String, required: true }
  },
  components: {
    ViewButton
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['user']),
    visitId() {
      return `visit-${this.restaurantId}`
    }
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
