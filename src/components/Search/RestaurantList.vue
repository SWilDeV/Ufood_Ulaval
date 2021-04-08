<template>
  <div class="row">
    <restaurant-item
      v-for="item in items"
      :key="item.id"
      class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
      :id="item.id"
      :name="item.name"
      :picture="item.pictures[0]"
      :rating="item.rating"
    />
  </div>
</template>

<script>
import RestaurantItem from '@/components/Search/RestaurantItem.vue'

export default {
  name: 'RestaurantList',
  components: {
    RestaurantItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
