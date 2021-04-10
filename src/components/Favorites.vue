<template>
  <div class="container">
    <h1 class="title" style="font-size:3vw;">{{ $t('favorites.title') }}</h1>
    <panel class="p-3" v-on:favorite-added="addFavorite($event)" />

    <favorite-lists
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
  </div>
</template>

<script>
import Vue from 'vue'
import FavoriteLists from '@/components/Favorites/FavoriteLists.vue'
import Panel from '@/components/Favorites/FavoriteForm.vue'
import { mapState } from 'vuex'
import {
  addRestaurantToList,
  createList,
  deleteFavoriteList,
  deleteRestaurantFromList,
  getFavorites,
  updateFavorite
} from '@/api/favorites'
import { getRestaurants } from '@/api/restaurants'

export default {
  name: 'Favorites',
  components: {
    FavoriteLists,
    Panel
  },
  data() {
    return {
      favorites: [],
      favoriteRestaurantList: [],
      restaurantDictionary: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async created() {
    try {
      const restaurants = (await getRestaurants({ count: 200 })).items
      for (const restaurant of restaurants) {
        this.restaurantDictionary.push({
          id: restaurant.id,
          name: restaurant.name
        })
      }

      const favorites = (await getFavorites(10000)).items
      this.favorites = favorites.filter(list => list.owner.email === this.user.email)
      this.makeDictionaryForRestaurant()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async addFavorite(name) {
      try {
        const favori = await createList({
          name: name,
          owner: this.user.email
        })
        this.favoriteRestaurantList.push(favori)
      } catch (e) {
        console.error(e)
      }
    },
    async addRestaurant({ restaurantId, favoriteId }) {
      try {
        await addRestaurantToList({ restaurantId, favoriteId })
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
    },
    async deleteFavorite(deleteId) {
      try {
        await deleteFavoriteList(deleteId)
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
    async deleteRestaurant({ restaurantId, listId }) {
      await deleteRestaurantFromList(restaurantId, listId)

      const index = this.favoriteRestaurantList.findIndex(favorite => favorite.id === listId)
      if (index >= 0) {
        const favorites = this.favoriteRestaurantList[index]
        favorites.restaurants = favorites.restaurants.filter(resto => resto.id !== restaurantId)
        Vue.set(this.favoriteRestaurantList, index, favorites)
      }
    },
    async editFavorite({ id, name }) {
      try {
        const owner = this.user.owner
        await updateFavorite({ id, name }, owner)
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
    }
  }
}
</script>

<style scoped>
.orange {
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
