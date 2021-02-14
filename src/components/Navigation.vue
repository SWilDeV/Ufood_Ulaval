<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'Home' }">
      <img src="@/assets/logo.png" height="48" alt="UFood Logo" />
      UFood
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <Search v-if="$route.name !== 'Home'" />
      <ul class="navbar-nav ml-auto">
        <template v-if="user">
          <li class="navbar-text">
            {{ $t('navigation.welcome', { name: user.name }) }}
          </li>
          <li class="nav-item">
            <icon-link icon="user" name="User" text="navigation.profile" class="nav-link" />
          </li>
          <li class="nav-item">
            <icon-link
              icon="sign-out-alt"
              name="SignOut"
              text="navigation.signOut"
              class="nav-link"
            />
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <icon-link icon="sign-in-alt" name="SignIn" text="navigation.signIn" class="nav-link" />
          </li>
          <li class="nav-item">
            <icon-link icon="user" name="SignUp" text="navigation.signUp" class="nav-link" />
          </li>
        </template>
      </ul>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import IconLink from '@/components/shared/IconLink.vue'
import Search from '@/components/Navigation/Search.vue'

export default {
  components: {
    IconLink,
    Search
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
