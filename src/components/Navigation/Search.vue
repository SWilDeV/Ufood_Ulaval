<template>
  <div>
    <form @submit.prevent="search">
      <input type="text" v-model="searchText" :placeholder="$t('navigation.searchPlaceholder')" />
      <icon-button icon="search" type="submit" :disabled="!searchText" />
    </form>
  </div>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  components: {
    IconButton
  },
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    search() {
      alert(this.searchText)
    }
  }
}
</script>
