<template>
  <router-link :to="{ name: 'Member', params: { id: item.id } }" class="text-center">
    <v-gravatar :email="item.email" />
    <br />
    <strong>{{ item.name }}</strong>
    <br />
    <member-rating v-if="item.rating >= 0" :rating="item.rating" />
  </router-link>
</template>

<script>
import MemberRating from '@/components/shared/MemberRating.vue'

export default {
  name: 'MemberItem',
  components: {
    MemberRating
  },
  props: {
    item: {
      type: Object,
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

strong {
  overflow-wrap: break-word;
}
</style>
