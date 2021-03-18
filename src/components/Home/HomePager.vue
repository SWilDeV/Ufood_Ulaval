<template>
  <div class="form-inline justify-content-center mb-4">
    <button class="btn btn-primary m-1" :disabled="page === 1" @click="page = 1">
      <font-awesome-icon icon="fast-backward" />
    </button>
    <button class="btn btn-primary m-1" :disabled="page === 1" @click="page--">
      <font-awesome-icon icon="step-backward" />
    </button>
    <input type="text" class="form-control m-1" v-model="page" disabled />
    <button class="btn btn-primary m-1" :disabled="page === pageCount" @click="page++">
      <font-awesome-icon icon="step-forward" />
    </button>
    <button class="btn btn-primary m-1" :disabled="page === pageCount" @click="page = pageCount">
      <font-awesome-icon icon="fast-forward" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomePager',
  props: {
    total: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      default: 12
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
