<template>
  <div class="form-group">
    <label v-if="label" :for="id" v-text="getDisplayText(label)" />
    <input
      ref="input"
      class="form-control"
      :id="id"
      :placeholder="getDisplayText(placeholder)"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    value: String
  },
  data() {
    return { id: uuidv4() }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    getDisplayText(text) {
      return this.$i18n.t(text) || text
    }
  }
}
</script>
