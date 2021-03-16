<template>
  <div class="container">
    <panel />
    <h1>List of favorite restaurants</h1>
    <favorites
      v-for="favorite in blocks"
      :key="favorite.id"
      :favoriteListName="favorite.name"
      :favoriteId="favorite.id"
    />
  </div>
</template>

<script>
import favorites from './UserPage/favorites'
import panel from './UserPage/Panel'
import { get, post } from '@/api'
export default {
  name: 'userPage',
  components: {
    favorites,
    panel
  },
  data() {
    return {
      blocks: []
    }
  },
  beforeMount() {
    this.getRestUser()
  },
  created() {
    //this.addFavorites()
  },
  methods: {
    async getRestUser() {
      try {
        this.blocks = await get('/unsecure/favorites?limit=10000')
        this.blocks = Object.values(this.blocks)[0].filter(
          list => list.owner.email === '123@123.com'
        )
      } catch (e) {
        console.error(e)
      }
    },
    async addFavorites() {
      try {
        await post('/unsecure/favorites', {
          name: 'test123',
          owner: '123@123.com'
        })
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
