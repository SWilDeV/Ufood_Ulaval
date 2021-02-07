<template>
  <button :type="type">
    <font-awesome-icon :icon="icon" />
    {{ displayText }}
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    displayText() {
      return this.$i18n.t(this.text) || this.text
    }
  }
}
</script>
