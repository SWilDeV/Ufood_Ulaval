<template>
  <router-link :to="{ name: 'Restaurant', params: { id } }" class="mb-3 text-center">
    <img :src="picture" :alt="name" class="mx-auto" height="200" />
    <br />
    <strong>{{ name }}</strong>
    <br />
    <font-awesome-icon icon="star" />
    {{ $t('restaurant.rating') }}
    {{ formatRating(rating) }}
  </router-link>
</template>

<script>
import mixins from '@/mixins'

export default {
  name: 'RestaurantItem',
  mixins: [mixins],
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
a {
  color: black;
}
a:hover {
  text-decoration: none;
}

img {
  max-width: 260px;
}

strong {
  overflow-wrap: break-word;
}
</style>
