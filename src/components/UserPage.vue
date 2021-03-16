<template>
  <div class="container">
    <panel />
    <h1>List of favorite restaurants</h1>
    <favorites
      v-for="favorite in favorites"
      :key="favorite.id"
      :favoriteListName="favorite.name"
      :favoriteId="favorite.id"
    />
  </div>
</template>

<script>
import favorites from './UserPage/favorites'
import panel from './UserPage/Panel'
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
      favorites: []
    }
  },
  beforeMount() {
    this.getRestUser()
  },
  methods: {
    async getRestUser() {
      try {
        this.blocks = await get('/unsecure/favorites?limit=10000')
        this.favorites = Object.values(this.blocks)[0].filter(
          list => list.owner.email === '123@123.com'
        )
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
}

.favorite-header {
  max-width: 700px;
  font-size: 50px;
  color: white;
}
</style>
