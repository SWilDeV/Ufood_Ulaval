<template>
  <div class="container">
    <panel class="p-3" v-on:favorite-added="addFavorite($event)" />
    <h1 class="title">List of favorite restaurants</h1>
    <favorites
      v-for="favorite in favorites"
      :key="favorite.id"
      :favoriteListName="favorite.name"
      :favoriteId="favorite.id"
      :favoriteRestaurants="favorite.restaurants"
      :allRestaurants="restaurants"
      @favorite-deleted="deleteFavorite($event)"
      @favorite-edited="editFavorite($event)"
      @resto-deleted="deleteRestaurant($event)"
      @add-resto-to-list="addRestaurant($event)"
    />
  </div>
</template>

<script>
import favorites from './UserPage/favorites'
import panel from './UserPage/Panel'
import { mapState } from 'vuex'
import Vue from 'vue'
import { get, _delete, post } from '@/api'

export default {
  name: 'userPage',
  components: {
    favorites,
    panel
  },
  data() {
    return {
      blocks: [],
      favorites: [],
      restaurants: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.getfavoriteRestaurantLists(), this.getAllRestaurants()
  },
  methods: {
    async getfavoriteRestaurantLists() {
      try {
        this.blocks = await get('/unsecure/favorites?limit=10000')
        this.favorites = Object.values(this.blocks)[0].filter(
          list => list.owner.email === this.user.email
        )
      } catch (e) {
        console.error(e)
      }
    },
    addFavorite(favori) {
      this.favorites.push(favori)
    },
    deleteFavorite(deleteId) {
      const index = this.favorites.findIndex(deletedFavorite => deletedFavorite.id === deleteId)
      if (index >= 0) {
        Vue.delete(this.favorites, index)
      }
    },
    editFavorite({ id, name }) {
      const index = this.favorites.findIndex(editedFavorite => editedFavorite.id === id)
      if (index >= 0) {
        this.favorites[index].name = name
      }
    },
    async deleteRestaurant({ restaurantId, listId }) {
      await _delete(`/unsecure/favorites/${listId}/restaurants/${restaurantId}`)
      const index = this.favorites.findIndex(favorite => favorite.id === listId)

      if (index >= 0) {
        const favorites = this.favorites[index]
        favorites.restaurants = favorites.restaurants.filter(resto => resto.id !== restaurantId)
        Vue.set(this.favorites, index, favorites)
      }
    },
    async addRestaurant({ restaurantId, favoriteId }) {
      try {
        await post(`/unsecure/favorites/${favoriteId}/restaurants`, {
          id: restaurantId
        })
        const index = this.favorites.findIndex(favorite => favorite.id === favoriteId)
        if (index >= 0) {
          const favorite = this.favorites[index]
          favorite.restaurants.push({ id: restaurantId })
          Vue.set(this.favorites, index, favorite)
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getAllRestaurants() {
      try {
        this.restaurants = await get('/unsecure/restaurants?limit=200')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1500px;
  background-color: royalblue;
  height: 100%;
}

.favorite-header {
  max-width: 700px;
  font-size: 50px;
  color: white;
}
.title {
  color: blue;
  text-align: center;
  background-color: white;
  margin: 2rem 25rem;
  border: solid 2px red;
  border-radius: 30px;
}
</style>
