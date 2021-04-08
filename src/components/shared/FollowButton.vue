<template>
  <icon-button :icon="icon" :text="text" :variant="variant" @click="clicked" />
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'
import { follow, unfollow } from '@/api/members'

export default {
  name: 'FollowButton',
  components: {
    IconButton
  },
  props: {
    id: {
      type: String,
      required: true
    },
    followed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    icon() {
      return this.followed ? 'user-times' : 'user-plus'
    },
    text() {
      return this.followed ? 'followButton.unfollow' : 'followButton.follow'
    },
    variant() {
      return this.followed ? 'outline-warning' : 'warning'
    }
  },
  methods: {
    async clicked(event) {
      try {
        if (this.followed) {
          await unfollow(this.id)
        } else {
          await follow(this.id)
        }
        this.$emit('click', event)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
