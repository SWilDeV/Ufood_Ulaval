<template>
  <router-link :to="{ name }">
    <font-awesome-icon :icon="icon" />
    {{ displayText }}
  </router-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String
    }
  },
  computed: {
    displayText() {
      return this.$i18n.t(this.text) || this.text
    }
  }
}
</script>
