<template>
  <b-alert
    :variant="variant"
    show
    fade
    :dismissible="dismissible"
    @dismissed="$emit('dismissed', $event)"
  >
    <strong v-if="important" v-text="important" />
    {{ description }}
  </b-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    text: {
      type: String,
      required: true
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    variant: String
  },
  computed: {
    important() {
      const parts = this.$i18n.t(this.text).split('|')
      return parts.length > 1 ? parts[0] : ''
    },
    description() {
      const parts = this.$i18n.t(this.text).split('|')
      return parts.length > 1 ? parts[1] : parts[0]
    }
  }
}
</script>
