<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div id="title">
          <h4 class="my-0 fw-normal d-inline p-3">{{ favoriteListName }}</h4>

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
        <restaurantUserPage
          v-for="restaurant in favoriteRestaurants"
          :key="restaurant.id"
          :restaurantId="restaurant.id"
          :listId="favoriteId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { _delete, put } from '@/api'
import { mapState } from 'vuex'
import restaurantUserPage from './RestaurantsUserPage'
export default {
  name: 'visitedRestaurants',
  props: {
    favoriteListName: String,
    favoriteId: String,
    favoriteRestaurants: Array
  },

  data() {
    return {
      name: '',
      restaurants: [],
      edit: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    restaurantUserPage
  },
  methods: {
    async deleteFavorite(id) {
      try {
        await _delete(`/unsecure/favorites/${id}`)
        this.$emit('favorite-deleted', id)
      } catch (e) {
        console.error(e)
      }
    },
    async editFavoriteListName(id) {
      try {
        await put(`/unsecure/favorites/${id}`, {
          name: this.name,
          owner: this.user.email
        })
        const object = [id, this.name]
        this.$emit('favorite-edited', object)
        this.name = ''
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped></style>
