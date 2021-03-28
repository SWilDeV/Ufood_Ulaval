<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div id="title">
          <div class="form-inline">
            <h4 class="my-0 fw-normal d-inline p-3">{{ favoriteListName }}</h4>

            <div class="col form-inline">
              <div class="input-group">
                <b-form-select v-model="selectedRestaurant" :options="options">
                  <template #first>
                    <b-form-select-option value="" v-t="'favorites.selectRestaurant'" disabled />
                  </template>
                </b-form-select>
                <div class="input-group-append">
                  <b-button
                    variant="success"
                    v-t="'favorites.addToList'"
                    :disabled="!selectedRestaurant"
                    @click="onClickAddResto"
                  />
                </div>
              </div>
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
          :restaurant-id="restaurant.id"
          :restaurant-name="restaurant.name"
          :list-id="favoriteId"
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
      edit: false,
      name: '',
      selectedRestaurant: ''
    }
  },
  computed: {
    ...mapState(['user']),
    options() {
      return this.allRestaurants
        .filter(item => this.favoriteRestaurants.every(res => res.id !== item.id))
        .map(restaurant => ({
          text: restaurant.name,
          value: restaurant.id
        }))
        .sort((a, b) => (a.text >= b.text ? 1 : -1))
    }
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
    }
  }
}
</script>

<style scoped></style>
