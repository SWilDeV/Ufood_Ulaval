<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div>
          <h4 class="form-inline">{{ this.restaurantName }}</h4>

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
import ViewButton from '@/components/shared/ViewButton.vue'
export default {
  name: 'restaurantUserPage',
  props: {
    restaurantId: { type: String, required: true },
    listId: { type: String, required: true },
    restaurantName: { type: String, required: true }
  },
  components: {
    ViewButton
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
  }
}
</script>
