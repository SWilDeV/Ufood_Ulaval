<template>
  <nav>
    <router-link to="/">
      <Brand />
    </router-link>
    <Search />
    <div v-if="token">
      <span>{{ $t('navigation.welcome', { name: token.name }) }}</span>
      <icon-link icon="user" name="User" text="navigation.profile" />
      <icon-link icon="sign-out-alt" name="Home" text="navigation.signOut" />
    </div>
    <div v-else>
      <icon-link icon="sign-in-alt" name="User" text="navigation.signIn" />
    </div>
  </nav>
</template>

<script>
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
    token() {
      return this.$route.name === 'User'
        ? {
            email: 'john.smith@mail.com',
            name: 'John Smith',
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1M2VjMWVhMmQ3N2FhZmU3N2Q4YzM3YjgiLCJleHAiOjE0MDg2NzI4ODI4ODV9.5wLLC8kqaQyPGWKAidYZpsMz5XJtwk2Np1KmYEusizY',
            id: '53ec1ea2d7121fe77d8c37b8'
          }
        : null
    }
  }
}
</script>
