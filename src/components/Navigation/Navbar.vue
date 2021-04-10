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
        <b-nav-text v-else>
          <icon-button
            class="ml-3"
            icon="sign-in-alt"
            text="signIn.title"
            variant="light"
            v-b-modal.signModal
          />
          <sign-in-modal id="signModal" />
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import IconButton from '@/components/shared/IconButton.vue'
import Search from '@/components/Navigation/Search.vue'
import SignInModal from '@/components/Navigation/SignInModal.vue'

export default {
  name: 'Navbar',
  components: {
    IconButton,
    Search,
    SignInModal
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
