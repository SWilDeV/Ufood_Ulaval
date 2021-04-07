<template>
  <div class="container">
    <div class="mt-3" v-if="member">
      <div class="row">
        <sidebar
          class="col-sm-12 col-md-6 col-lg-4 col-sm-3"
          :favorites="favorites"
          :member="member"
          :user="user"
        />
        <div class="col-sm-12 col-md-6 col-lg-8 col-sm-9">
          <b-tabs content-class="mt-3">
            <b-tab :title="$t('member.followers')">
              <follow-table :items="member.followers" />
            </b-tab>
            <b-tab :title="$t('member.following')">
              <follow-table
                :items="member.following"
                :editable="user.id === member.id"
                @unfollowed="removeFollowing($event)"
              />
            </b-tab>
            <b-tab :title="$t('member.favorites')">
              <div id="favoriteLists" role="tablist">
                <favorite-list
                  v-for="favorite in favorites"
                  :key="favorite.id"
                  :item="favorite"
                  accordion="favoriteLists"
                />
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FavoriteList from '@/components/Member/FavoriteList.vue'
import FollowTable from '@/components/shared/FollowTable.vue'
import Sidebar from '@/components/Member/Sidebar.vue'
import { mapState } from 'vuex'
import { getFavorites, getMember } from '@/api/members'
import { getRestaurants } from '@/api/restaurants'

export default {
  name: 'Member',
  components: {
    FavoriteList,
    FollowTable,
    Sidebar
  },
  data() {
    return {
      favorites: [],
      member: null,
      restaurants: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    removeFollowing(id) {
      Vue.set(
        this.member,
        'following',
        this.member.following.filter(member => member.id !== id)
      )
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      async handler(id) {
        try {
          this.member = await getMember(id)
          const results = await getFavorites(id, { count: 1000 })
          if (this.restaurants === null) {
            this.restaurants = Object.fromEntries(
              (await getRestaurants({ count: 1000 })).items.map(item => [item.id, item.name])
            )
          }
          this.favorites = results.items
            .map(list => ({
              id: list.id,
              name: list.name,
              restaurants: list.restaurants
                .map(restaurant => ({
                  id: restaurant.id,
                  name: this.restaurants[restaurant.id]
                }))
                .sort((a, b) => (a.name >= b.name ? 1 : -1))
            }))
            .sort((a, b) => (a.name >= b.name ? 1 : -1))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}
</script>
