<template>
  <div class="container">
    <panel />
    <h1>List of favorite restaurants</h1>
    <favorites v-for="favorite in blocks.items" :key="favorite.id" :rName="favorite.id" />
  </div>
</template>

<script>
import favorites from './favorites'
import panel from './Panel'
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
      test: []
    }
  },
  beforeMount() {
    this.getRestUser()
  },
  created() {
    this.addFavorites()
  },
  methods: {
    async getRestUser() {
      try {
        this.blocks = await get('/unsecure/favorites?limit=10000')
      } catch (e) {
        console.error(e)
      }
    },
    async addFavorites() {
      try {
        this.test = await post('/unsecure/favorites', {
          name: 'test1',
          owner: '123@123.com'
        })
        console.log(this.test)
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
