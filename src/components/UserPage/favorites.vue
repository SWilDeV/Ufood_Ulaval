<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 fw-normal">{{ favoriteListName }}</h4>

        <div id="title">
          <div>
            <input type="text" v-model="name" />
            <button
              class="w-10 btn btn-xs btn-outline-primary"
              type="button"
              v-on:click="editFavoriteListName(favoriteId)"
            >
              OK
            </button>
          </div>
          <button
            class="w-10 btn btn-xs btn-outline-primary float-right"
            type="button"
            v-on:click="deleteFavorite(favoriteId)"
          >
            Delete
          </button>

          <button class="w-10 btn btn-xs btn-outline-primary float-right" type="button">
            Edit
          </button>
        </div>
      </div>
      <div class="card-body">
        <h1 class="card-title favorite-card-title">
          <!-- <small class="text-muted"></small>visits: {{ numberOfVisit }} -->
        </h1>
        <button type="button" class="w-10 btn btn-lg btn-outline-primary">
          More Info
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { _delete, put } from '@/api'

export default {
  name: 'visitedRestaurants',
  props: ['favorite-list-name', 'r-city', 'number-of-visit', 'favorite-id'],
  data() {
    return {
      name: ''
    }
  },
  methods: {
    deleteFavorite(id) {
      try {
        _delete(`/unsecure/favorites/${id}`)
        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    },
    async editFavoriteListName(id) {
      try {
        await put(`/unsecure/favorites/${id}`, {
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

<style scoped></style>
