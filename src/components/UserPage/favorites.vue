<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 fw-normal">{{ favoriteListName }}</h4>
        <div class="titleEdit" ref="jedi">
          <input type="text" />
          <button class="w-10 btn btn-xs btn-outline-primary" type="button">
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
        <button class="w-10 btn btn-xs btn-outline-primary float-right" type="button" @click="keel">
          Edit
        </button>
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
import { _delete } from '@/api'

export default {
  name: 'visitedRestaurants',
  props: ['favorite-list-name', 'r-city', 'number-of-visit', 'favorite-id'],
  data() {
    return {}
  },
  methods: {
    keel() {
      this.$refs.jedi.style.display = 'none'
    },
    deleteFavorite(id) {
      try {
        _delete(`/unsecure/favorites/${id}`)
        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped></style>
