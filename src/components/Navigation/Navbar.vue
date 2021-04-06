<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'Home' }">
      <img src="@/assets/logo.png" alt="UFood Logo" height="40" />
      UFood
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="user">
        <b-nav-item href="#">
          <!-- TODO: voir la liste des utilisateurs ref#61 -->
          Membres
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <Search v-if="$route.name !== 'Home'" />
        <b-nav-item-dropdown right v-if="user">
          <template #button-content>
            <!-- TODO: en mobile la taille ne doit pas être fixée -->
            <v-gravatar class="rounded-circle" :email="user.email" size="40" />
          </template>
          <b-dropdown-item href="#">
            <!-- TODO: navigation au profil public ref#64 -->
            <strong v-text="user.name" />
            <br />
            <span v-text="user.email" />
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item :to="{ name: 'User' }">
            <font-awesome-icon icon="user" />
            {{ $t('navigation.profile') }}
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'SignOut' }">
            <font-awesome-icon icon="sign-out-alt" />
            {{ $t('navigation.signOut') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <template v-else>
          <b-nav-item :to="{ name: 'SignIn' }">
            <font-awesome-icon icon="sign-in-alt" />
            {{ $t('navigation.signIn') }}
          </b-nav-item>
          <b-nav-item :to="{ name: 'SignUp' }">
            <font-awesome-icon icon="user" />
            {{ $t('navigation.signUp') }}
          </b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import Search from '@/components/Navigation/Search.vue'

export default {
  components: {
    Search
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
