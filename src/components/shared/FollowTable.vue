<template>
  <table class="table table-striped">
    <tbody>
      <tr v-for="item in sortedItems" :key="item.id">
        <td>
          <router-link :to="{ name: 'Member', params: { id: item.id } }">
            <v-gravatar class="mr-2" :email="item.email" />
            {{ item.name }}
          </router-link>
        </td>
        <td v-if="editable" class="align-middle">
          <follow-button :id="item.id" @click="$emit('unfollowed', item.id)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FollowButton from '@/components/shared/FollowButton.vue'

export default {
  name: 'FollowList',
  components: {
    FollowButton
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sortedItems() {
      return this.items.slice().sort((a, b) => (a.name >= b.name ? 1 : -1))
    }
  }
}
</script>
