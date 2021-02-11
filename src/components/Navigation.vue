<template>
  <nav>
    <router-link :to="{ name: 'Home' }">
      <Brand />
    </router-link>
    <Search />
    <div v-if="user">
      <span>{{ $t('navigation.welcome', { name: user.name }) }}</span>
      <icon-link icon="user" name="User" text="navigation.profile" />
      <icon-link icon="sign-out-alt" name="Home" text="navigation.signOut" />
    </div>
    <div v-else>
      <icon-link icon="sign-in-alt" name="SignIn" text="navigation.signIn" />
      <icon-link icon="user" name="SignUp" text="navigation.signUp" />
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import Brand from '@/components/Navigation/Brand.vue'
import IconLink from '@/components/shared/IconLink.vue'
import Search from '@/components/Navigation/Search.vue'

export default {
  components: {
    Brand,
    IconLink,
    Search
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
