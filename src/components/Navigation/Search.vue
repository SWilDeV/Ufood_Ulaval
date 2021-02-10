<template>
  <div>
    <u-form :canSubmit="Boolean(searchText)" submitIcon="search" @submit="search">
      <input type="text" :placeholder="$t('navigation.searchPlaceholder')" v-model="searchText" />
    </u-form>
  </div>
</template>

<script>
import UForm from '@/components/shared/UForm.vue'

export default {
  components: {
    UForm
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
