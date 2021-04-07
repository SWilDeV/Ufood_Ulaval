<template>
  <div class="form-inline justify-content-center">
    <icon-button
      class="m-1"
      icon="fast-backward"
      variant="primary"
      :disabled="value === 1"
      @click="goToPage(1)"
    />
    <icon-button
      class="m-1"
      icon="step-backward"
      variant="primary"
      :disabled="value === 1"
      @click="goToPage(value - 1)"
    />
    <b-form-input class="m-1" :value="value" disabled />
    <icon-button
      class="m-1"
      icon="step-forward"
      variant="primary"
      :disabled="value >= pageCount"
      @click="goToPage(value + 1)"
    />
    <icon-button
      class="m-1"
      icon="fast-forward"
      variant="primary"
      :disabled="value >= pageCount"
      @click="goToPage(pageCount)"
    />
  </div>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  name: 'Pager',
  components: {
    IconButton
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.count)
    }
  },
  methods: {
    goToPage(page) {
      this.$emit('input', page)
    }
  }
}
</script>
