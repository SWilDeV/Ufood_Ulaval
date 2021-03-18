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
      v-on:favorite-deleted="deleteFavorite($event)"
      v-on:favorite-edited="editFavorite($event)"
    />
  </div>
</template>

<script>
import favorites from './UserPage/favorites'
import panel from './UserPage/Panel'
import { mapState } from 'vuex'
import Vue from 'vue'
import { get, post } from '@/api'

export default {
  name: 'userPage',
  components: {
    favorites,
    panel
  },
  data() {
    return {
      blocks: [],
      favorites: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.getfavoriteRestaurantLists()
  },
  // created() {
  //   this.addRestaurant()
  // },

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

    async addRestaurant() {
      try {
        await post(`/unsecure/favorites/60514d06c097ff0004d963fe/restaurants`, {
          id: '5f31fc6d55d7790550c08b01'
        })
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
