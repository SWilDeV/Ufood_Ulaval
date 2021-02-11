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

<style scoped>
button {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  text-transform: none;
}

.alert {
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  position: relative;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.alert-dismissible .close {
  position: absolute;
  top: 0;
  right: 0;
}

.close {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
</style>
