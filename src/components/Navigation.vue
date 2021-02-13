<template>
  <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <router-link :to="{ name: 'Home' }" class="navbar-brand">
      <Brand />
    </router-link>
    <button
      type="button"
      class="navbar-toggler"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <Search />
      <span v-if="user" class="navbar-text">
        {{ $t('navigation.welcome', { name: user.name }) }}
      </span>
      <ul class="navbar-nav">
        <template v-if="user">
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
    </div>
  </nav>
</template>

<script>
/* TODO:
 * Collapsible
 * Mobile Navigation
 */

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
