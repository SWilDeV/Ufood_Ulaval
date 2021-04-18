<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'Home' }">
      <img src="@/assets/logo.png" alt="UFood Logo" height="40" />
      UFood
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="user">
        <b-nav-item :to="{ name: 'Members' }">
          {{ $t('members.title') }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <Search v-if="!$route.meta.noSearch" />
        <SelectLocale />
        <b-nav-item-dropdown right v-if="user">
          <template #button-content>
            <v-gravatar class="rounded-circle" :email="user.email" :size="40" />
          </template>
          <b-dropdown-item :to="{ name: 'Member', params: { id: user.id } }">
            <strong v-text="user.name" />
            <br />
            <span v-text="user.email" />
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item :to="{ name: 'Favorites' }">
            <font-awesome-icon icon="star" />
            {{ $t('navigation.favorites') }}
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Visits' }">
            <font-awesome-icon icon="edit" />
            {{ $t('navigation.visits') }}
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'SignOut' }">
            <font-awesome-icon icon="sign-out-alt" />
            {{ $t('navigation.signOut') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <template v-else>
          <b-nav-item :to="{ name: 'SignIn' }">
            <font-awesome-icon icon="sign-in-alt" />
            {{ $t('signIn.title') }}
          </b-nav-item>
          <b-nav-item :to="{ name: 'SignUp' }">
            <font-awesome-icon icon="user" />
            {{ $t('signUp.title') }}
          </b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import SelectLocale from '@/components/Navigation/SelectLocale.vue'
import Search from '@/components/Navigation/Search.vue'

export default {
  name: 'Navbar',
  components: {
    Search,
    SelectLocale
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
