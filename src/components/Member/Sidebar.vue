<template>
  <div>
    <div class="form-inline justify-content-center">
      <v-gravatar :email="member.email" :size="260" />
    </div>
    <h1 v-text="member.name" />
    <div class="mb-2">
      <router-link
        v-if="user.id === member.id"
        :to="{ name: 'User' }"
        class="btn btn-primary w-100"
      >
        <font-awesome-icon icon="user" />
        {{ $t('member.editProfile') }}
      </router-link>
      <follow-button
        v-else
        class="w-100"
        :followed="followed"
        :id="member.id"
        @click="toggleFollow"
      />
    </div>
    <p>
      <font-awesome-icon icon="user-friends" />
      {{ member.followers.length }}
      {{ followerText }}
      &middot;
      {{ member.following.length }}
      {{ $t('member.followingFormat') }}
      &middot;
      <font-awesome-icon icon="star" />
      {{ favorites }}
    </p>
    <p>
      <member-rating :rating="member.rating" />
      <br />
      <span>
        <font-awesome-icon icon="envelope" />
        &nbsp;
        <a :href="`mailto:${member.email}`" v-text="member.email" />
      </span>
    </p>
  </div>
</template>

<script>
import Vue from 'vue'
import FollowButton from '@/components/shared/FollowButton.vue'
import MemberRating from '@/components/shared/MemberRating.vue'

export default {
  name: 'Sidebar',
  components: {
    FollowButton,
    MemberRating
  },
  props: {
    favorites: {
      type: Number,
      required: true
    },
    member: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    followed() {
      return this.member.followers.some(user => user.id === this.user.id)
    },
    followerText() {
      return this.member.followers.length > 1
        ? this.$i18n.t('member.followersFormat')
        : this.$i18n.t('member.followerFormat')
    }
  },
  methods: {
    toggleFollow() {
      if (this.followed) {
        Vue.set(
          this.member,
          'followers',
          this.member.followers.filter(user => user.id !== this.user.id)
        )
      } else {
        this.member.followers.push(this.user)
      }
    }
  }
}
</script>

<style scoped>
h1 {
  overflow-wrap: break-word;
}
</style>
