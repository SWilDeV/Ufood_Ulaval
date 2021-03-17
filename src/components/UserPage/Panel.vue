<template>
  <div class="container">
    <div class="col">
      <div class="card mb-4 shadow-sm">
        <div class="card-header">
          <input type="text" v-model="name" placeholder="Create new list" />
          <button class="w-10 btn btn-xs btn-success" type="button" v-on:click="addFavoriteList">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from '@/api'
export default {
  name: 'panel-v',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async addFavoriteList() {
      try {
        await post('/unsecure/favorites', {
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

<style></style>
