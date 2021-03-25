<template>
  <body>
    <div class="container">
      <h1 class="title" style="font-size:3vw;">Lists of favorite restaurants</h1>
      <panel class="p-3" v-on:favorite-added="addFavorite($event)" />

      <favorites
        v-for="favorite in favoriteRestaurantList"
        :key="favorite.id"
        :favorite-list-name="favorite.name"
        :favorite-id="favorite.id"
        :favorite-restaurants="favorite.restaurants"
        :all-restaurants="restaurantDictionary"
        @favorite-deleted="deleteFavorite($event)"
        @favorite-edited="editFavorite($event)"
        @resto-deleted="deleteRestaurant($event)"
        @add-resto-to-list="addRestaurant($event)"
      />
      <h2>Visits</h2>
      <visits />
    </div>
  </body>
</template>

<script>
import Visits from './UserPage/Visits.vue'
import Favorites from './UserPage/Favorites'
import panel from './UserPage/Panel'
import { mapState } from 'vuex'
import Vue from 'vue'
import { get, _delete, post, put } from '@/api'

export default {
  name: 'userPage',
  components: {
    Favorites,
    panel,
    Visits
  },
  data() {
    return {
      favorites: [],
      restaurantDictionary: [],
      favoriteRestaurantList: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async created() {
    try {
      const restaurants = (await get('/unsecure/restaurants?limit=200')).items
      for (const restaurant of restaurants) {
        this.restaurantDictionary.push({
          id: restaurant.id,
          name: restaurant.name
        })
      }

      const favorites = (await get('/unsecure/favorites?limit=10000')).items
      this.favorites = favorites.filter(list => list.owner.email === this.user.email)
      this.makeDictionaryForRestaurant()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    makeDictionaryForRestaurant() {
      let dictArray = []
      for (let i = 0; i < this.favorites.length; i++) {
        for (let k = 0; k < this.favorites[i].restaurants.length; k++) {
          for (let j = 0; j < this.restaurantDictionary.length; j++) {
            if (this.favorites[i].restaurants[k].id === this.restaurantDictionary[j].id) {
              dictArray.push(this.restaurantDictionary[j])
            }
          }
        }
        let items = {
          restaurants: dictArray,
          name: this.favorites[i].name,
          id: this.favorites[i].id
        }
        this.favoriteRestaurantList.push(items)
        dictArray = []
      }
    },
    async addFavorite(name) {
      try {
        const favori = await post('/unsecure/favorites', {
          name: name,
          owner: this.user.email
        })
        this.favoriteRestaurantList.push(favori)
      } catch (e) {
        console.error(e)
      }
    },
    async deleteFavorite(deleteId) {
      try {
        await _delete(`/unsecure/favorites/${deleteId}`)
      } catch (e) {
        console.error(e)
      }
      const index = this.favoriteRestaurantList.findIndex(
        deletedFavorite => deletedFavorite.id === deleteId
      )
      if (index >= 0) {
        Vue.delete(this.favoriteRestaurantList, index)
      }
    },
    async editFavorite({ id, name }) {
      try {
        await put(`/unsecure/favorites/${id}`, {
          name: name,
          owner: this.user.email
        })
      } catch (e) {
        console.error(e)
      }
      const index = this.favoriteRestaurantList.findIndex(
        editedFavorite => editedFavorite.id === id
      )
      if (index >= 0) {
        this.favoriteRestaurantList[index].name = name
      }
    },
    async deleteRestaurant({ restaurantId, listId }) {
      await _delete(`/unsecure/favorites/${listId}/restaurants/${restaurantId}`)
      const index = this.favoriteRestaurantList.findIndex(favorite => favorite.id === listId)

      if (index >= 0) {
        const favorites = this.favoriteRestaurantList[index]
        favorites.restaurants = favorites.restaurants.filter(resto => resto.id !== restaurantId)
        Vue.set(this.favoriteRestaurantList, index, favorites)
      }
    },
    async addRestaurant({ restaurantId, favoriteId }) {
      try {
        await post(`/unsecure/favorites/${favoriteId}/restaurants`, {
          id: restaurantId
        })
        const index = this.favoriteRestaurantList.findIndex(favorite => favorite.id === favoriteId)
        if (index >= 0) {
          const restaurant = this.restaurantDictionary.find(resto => resto.id === restaurantId)
          const favorite = this.favoriteRestaurantList[index]
          favorite.restaurants.push({ id: restaurant.id, name: restaurant.name })
          Vue.set(this.favoriteRestaurantList, index, favorite)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
// comment for LF
</script>

<style scoped>
body {
  height: 100%;
  /*background-color: #2c3531;*/
  /* background-color: #116466; */
  background-color: #d9b08c;
  /* background-color: #116466; */
  bottom: 0;
}

.container {
  max-width: 1500px;
  height: 100%;
  bottom: 0;
}

.favorite-header {
  max-width: 700px;
  font-size: 50px;
  color: white;
}
.title {
  color: #2c3531;
  text-align: center;
  padding: 0vw 1vw 0.5vw 0vw;
}
</style>
