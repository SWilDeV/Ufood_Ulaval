<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div id="title">
          <div class="form-inline">
            <h4 class="my-0 fw-normal d-inline p-3">{{ favoriteListName }}</h4>

            <div class="col form-inline">
              <select class="form-control w-50" v-model="selectedRestaurant">
                <option value="">Select restaurant</option>
                <option v-for="resto in allRestaurants" :value="resto.id" :key="resto.id">
                  {{ resto.name }}
                </option>
              </select>
              <button
                :disabled="!selectedRestaurant"
                class="btn btn-success"
                @click="onClickAddResto"
              >
                Add
              </button>
            </div>
          </div>

          <div class="form-inline" v-show="edit">
            <input type="text" v-model="name" placeholder="Change name" class="form-control" />
            <button
              class="w-10 btn btn-xs btn-outline-primary"
              type="button"
              v-on:click="editFavoriteListName(favoriteId)"
            >
              OK
            </button>
          </div>
          <button
            class="w-10 btn btn-xs btn-outline-danger float-right"
            type="button"
            v-on:click="deleteFavorite(favoriteId)"
          >
            Delete
          </button>
          <button
            class="w-10 btn btn-xs btn-outline-primary float-right"
            type="button"
            v-on:click="edit = !edit"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="card-body">
        <restaurant-user-page
          v-for="restaurant in favoriteRestaurants"
          :key="restaurant.id"
          :restaurantId="restaurant.id"
          :restaurantName="restaurant.name"
          :listId="favoriteId"
          @resto-deleted="$emit('resto-deleted', $event)"
          @resto-added="$emit('resto-added', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RestaurantUserPage from './RestaurantUserPage'
export default {
  name: 'visitedRestaurants',
  props: {
    favoriteListName: String,
    favoriteId: String,
    favoriteRestaurants: Array,
    allRestaurants: Array
  },

  data() {
    return {
      name: '',
      edit: false,
      selectedRestaurant: '',
      restoDic: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    RestaurantUserPage
  },
  methods: {
    async deleteFavorite(id) {
      this.$emit('favorite-deleted', id)
    },
    async editFavoriteListName(id) {
      const name = this.name
      this.$emit('favorite-edited', { id, name })
      this.name = ''
    },
    onClickAddResto() {
      const favoriteId = this.favoriteId
      const restaurantId = this.selectedRestaurant
      this.$emit('add-resto-to-list', { restaurantId, favoriteId })
      this.selectedRestaurant = ''
    },
    async makeDictionaryForRestaurant() {
      for (let i = 0; i < this.favoriteRestaurants.length; i++) {
        for (let j = 0; j < this.allRestaurants.length; j++) {
          if (this.favoriteRestaurants[i].id === this.allRestaurants[j].id) {
            this.restoDic.push(this.allRestaurants[j])
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
