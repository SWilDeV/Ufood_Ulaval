<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div id="title">
          <h4 class="my-0 fw-normal d-inline p-3">{{ favoriteListName }}</h4>

          <div class="d-inline">
            <input type="text" v-model="name" placeholder="Change name" />
            <button
              class="w-10 btn btn-xs btn-outline-primary"
              type="button"
              v-on:click="editFavoriteListName(favoriteId)"
            >
              OK
            </button>
          </div>
          <button
            class="w-10 btn btn-xs btn-outline-primary float-right"
            type="button"
            v-on:click="deleteFavorite(favoriteId)"
          >
            Delete
          </button>

          <button class="w-10 btn btn-xs btn-outline-primary float-right" type="button">
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
      restaurants: []
    }
  },
  components: {
    restaurantUserPage
  },
  methods: {
    deleteFavorite(id) {
      try {
        _delete(`/unsecure/favorites/${id}`)
        //window.location.reload()
      } catch (e) {
        console.error(e)
      }
    },
    async editFavoriteListName(id) {
      try {
        await put(`/unsecure/favorites/${id}`, {
          name: this.name,
          owner: '123@123.com'
        })

        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped></style>
