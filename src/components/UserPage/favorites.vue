<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 fw-normal">{{ rName }}</h4>
        <button
          class="w-10 btn btn-xs btn-outline-primary float-right"
          type="button"
          v-on:click="onDelete(favorite.id)"
        >
          delete
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
import { mapState } from 'vuex'

export default {
  name: 'visitedRestaurants',
  props: ['r-name', 'r-city', 'number-of-visit'],
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped></style>
