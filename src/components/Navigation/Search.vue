<template>
  <form class="form-inline" @submit.prevent="submit">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :placeholder="$t('navigation.searchPlaceholder')"
        v-model="search"
      />
      <div class="input-group-append">
        <icon-button
          type="submit"
          icon="search"
          class="btn btn-success"
          :disabled="!Boolean(search)"
        />
      </div>
    </div>
  </form>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  components: {
    IconButton
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    submit() {
      this.$router.push({ name: 'Home', query: { search: this.search } })
    }
  }
}
</script>
