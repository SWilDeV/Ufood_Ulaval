<template>
  <div>
    <form @submit.prevent="search">
      <input type="text" v-model="searchText" :placeholder="$t('navigation.search.placeholder')" />
      <button type="submit" :disabled="!searchText">
        <font-awesome-icon icon="search" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
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
