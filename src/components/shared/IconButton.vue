<template>
  <b-button :size="size" :type="type" :variant="variant">
    <font-awesome-icon :icon="icon" />
    {{ $t(text) }}
  </b-button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    size: String,
    text: String,
    type: String,
    variant: String
  }
}
</script>
