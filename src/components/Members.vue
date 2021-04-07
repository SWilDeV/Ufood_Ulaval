<template>
  <div class="container">
    <h1 v-t="'members.title'" />
    <div class="row mb-3">
      <search :value="search" @input="setSearch($event)" @clear="setSearch('')" />
    </div>
    <member-list class="row" :items="items" />
    <pager class="mb-3" v-model="page" :count="count" :total="total" />
  </div>
</template>

<script>
import MemberList from '@/components/Members/MemberList.vue'
import Pager from '@/components/shared/Pager.vue'
import Search from '@/components/Members/Search.vue'
import { getMembers } from '@/api/members'

export default {
  name: 'Members',
  components: {
    MemberList,
    Pager,
    Search
  },
  data() {
    return {
      count: 20,
      items: [],
      page: 1,
      search: '',
      total: 0
    }
  },
  computed: {
    params() {
      return {
        limit: this.count,
        page: this.page - 1,
        search: this.search
      }
    }
  },
  methods: {
    setSearch(search) {
      this.page = 1
      this.search = search
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      async handler(params) {
        try {
          const results = await getMembers(params)
          this.items = results.items
          this.total = results.total
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}
</script>
