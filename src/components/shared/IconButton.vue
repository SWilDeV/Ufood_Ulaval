<template>
  <b-button :size="size" :type="type" :variant="variant" @click="$emit('click', $event)">
    <font-awesome-icon :icon="icon" />
    {{ $t(text) }}
  </b-button>
</template>

<script>
export default {
  name: 'IconButton',
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
