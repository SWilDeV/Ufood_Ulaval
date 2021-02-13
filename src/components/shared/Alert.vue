<template>
  <div :class="classes" role="alert">
    <slot name="before" />
    <strong v-if="important" v-text="important" />
    {{ description }}
    <slot name="after" />
    <button v-if="dismiss" type="button" class="close" aria-label="Close" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
const types = ['danger', 'success', 'warning']

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: types[0]
    },
    dismiss: Function
  },
  computed: {
    classes() {
      if (!types.includes(this.type)) {
        throw new Error(`The alert type is not valid: ${this.type}`)
      }

      const classes = ['alert', `alert-${this.type}`] // fade show

      if (this.dismiss) {
        classes.push('alert-dismissible')
      }

      return classes
    },
    important() {
      const text = this.$i18n.t(this.text) || this.text
      const parts = text.split('|')
      return parts.length > 1 ? parts[0] : ''
    },
    description() {
      const text = this.$i18n.t(this.text) || this.text
      const parts = text.split('|')
      return parts.length > 1 ? parts[1] : parts[0]
    }
  }
}
</script>
