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
      @favorite-deleted="deleteFavorite($event)"
      @favorite-edited="editFavorite($event)"
      @:resto-deleted="deleteRestaurant($event)"
      @:resto-added="addRestaurant($event)"
    />
  </div>
</template>

<script>
import favorites from './UserPage/favorites'
import panel from './UserPage/Panel'
import { mapState } from 'vuex'
import Vue from 'vue'
import { get } from '@/api'

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
    editFavorite(edited) {
      const index = this.favorites.findIndex(editedFavorite => editedFavorite.id === edited[0])
      if (index >= 0) {
        this.favorites[index].name = edited[1]
      }
    },
    deleteRestaurant(id) {
      const index = this.favorites.findIndex(resto => resto.id === id)
      if (index >= 0) {
        Vue.delete(this.favorites, index)
      }
    },
    addRestaurant() {
      console.log('hello')
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
