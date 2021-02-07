<template>
  <icon-button type="submit" :icon="icon" :text="text" />
</template>

<script>
import IconButton from '@/components/shared/IconButton'

export default {
  components: {
    IconButton
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String
    }
  }
}
</script>
