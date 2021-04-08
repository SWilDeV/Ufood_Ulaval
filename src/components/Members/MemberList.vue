<template>
  <div>
    <member-item
      class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3"
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import MemberItem from '@/components/Members/MemberItem.vue'

export default {
  name: 'MemberList',
  components: {
    MemberItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
