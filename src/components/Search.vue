<template>
  <div class="container">
    <h1 v-t="'search.title'" />
    <div>
      <h3 v-t="'search.restaurants'" />
      <template v-if="restaurants.length">
        <restaurant-list :items="restaurants" />
        <div v-if="totalRestaurants > restaurants.length" class="text-center">
          <router-link class="btn btn-primary" :to="{ name: 'Home', query: { search } }">
            <font-awesome-icon icon="search" />
            {{ $t('search.moreResults') }}
          </router-link>
        </div>
      </template>
      <div v-else v-t="'search.noResult'" />
    </div>
    <div v-if="user">
      <h3 v-t="'members.title'" />
      <template v-if="members.length">
        <member-list class="row" :items="members" />
        <div v-if="totalMembers > members.length" class="text-center">
          <router-link class="btn btn-primary" :to="{ name: 'Members', query: { search } }">
            <font-awesome-icon icon="search" />
            {{ $t('search.moreResults') }}
          </router-link>
        </div>
      </template>
      <div v-else v-t="'search.noResult'" />
    </div>
  </div>
</template>

<script>
import MemberList from '@/components/Members/MemberList.vue'
import RestaurantList from '@/components/Search/RestaurantList.vue'
import { mapState } from 'vuex'
import { getMembers } from '@/api/members'
import { getRestaurants } from '@/api/restaurants'

export default {
  name: 'Search',
  components: {
    MemberList,
    RestaurantList
  },
  data() {
    return {
      members: [],
      restaurants: [],
      totalMembers: 0,
      totalRestaurants: 0
    }
  },
  computed: {
    ...mapState(['user']),
    search() {
      return this.$route.query.q
    }
  },
  methods: {
    async getMemberList(search) {
      try {
        const results = await getMembers({ count: 8, search })
        this.members = results.items
        this.totalMembers = results.total
      } catch (e) {
        console.error(e)
      }
    },
    async getRestaurantList(search) {
      try {
        const results = await getRestaurants({ count: 4, search })
        this.restaurants = results.items
        this.totalRestaurants = results.total
      } catch (e) {
        console.error(e)
      }
    }
  },
  created() {
    const search = this.$route.query.q
    if (search) {
      this.getRestaurantList(search)

      if (this.user) {
        this.getMemberList(search)
      }
    }
  },
  watch: {
    user(user) {
      if (user) {
        this.getMemberList(this.search)
      }
    }
  }
}
</script>
