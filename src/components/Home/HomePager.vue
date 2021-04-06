<template>
  <div class="form-inline justify-content-center mb-4">
    <icon-button
      class="m-1"
      icon="fast-backward"
      variant="primary"
      :disabled="page === 1"
      @click="page = 1"
    />
    <icon-button
      class="m-1"
      icon="step-backward"
      variant="primary"
      :disabled="page === 1"
      @click="page--"
    />
    <b-form-input class="m-1" :value="page" disabled />
    <icon-button
      class="m-1"
      icon="step-forward"
      variant="primary"
      :disabled="page === pageCount"
      @click="page++"
    />
    <icon-button
      class="m-1"
      icon="fast-forward"
      variant="primary"
      :disabled="page === pageCount"
      @click="page = pageCount"
    />
  </div>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  name: 'HomePager',
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
    }
  },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.count)
    }
  },
  watch: {
    page(value) {
      this.$emit('page-changed', value)
    }
  }
}
</script>
