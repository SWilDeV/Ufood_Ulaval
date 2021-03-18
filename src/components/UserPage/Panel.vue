<template>
  <div class="container">
    <div class="col">
      <div class="card mb-4 shadow-sm">
        <div class="card-header form-inline">
          <input type="text" v-model="name" placeholder="Create new list" />
          <button class="w-10 btn btn-success" type="button" v-on:click="addFavoriteList">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { post } from '@/api'
export default {
  name: 'panel-v',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async addFavoriteList() {
      try {
        const favorite = await post('/unsecure/favorites', {
          name: this.name,
          owner: this.user.email
        })
        this.$emit('favorite-added', favorite)
        this.name = ''
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
