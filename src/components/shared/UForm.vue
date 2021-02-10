<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    <icon-button type="submit" :icon="submitIcon" :text="submitText" :disabled="!canSubmit" />
  </form>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  components: {
    IconButton
  },
  props: {
    canSubmit: {
      type: Boolean,
      default: true
    },
    submitIcon: {
      type: String,
      required: true
    },
    submitText: String
  }
}
</script>
