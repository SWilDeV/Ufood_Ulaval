<template>
  <b-card class="mb-1" no-body>
    <b-card-header role="tab">
      <h5 class="mb-0">
        <button class="btn btn-link" v-b-toggle="collapseId" v-text="item.name" />
      </h5>
    </b-card-header>
    <b-collapse :id="collapseId" visible :accordion="accordion" role="tabpanel">
      <b-card-body>
        <div v-for="(restaurant, index) in item.restaurants" :key="index">
          <router-link
            :to="{ name: 'Restaurant', params: { id: restaurant.id } }"
            v-text="restaurant.name"
          />
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'FavoriteList',
  props: {
    accordion: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    collapseId() {
      return `collapse_${this.item.id}`
    }
  }
}
</script>
