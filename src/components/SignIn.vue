<template>
  <div class="container">
    <h1 v-t="'signIn.title'" />
    <alert v-if="error === true" type="danger" text="genericError" :dismiss="clearError" />
    <alert
      v-if="error === 401"
      type="warning"
      text="signIn.invalidCredentials"
      :dismiss="clearError"
    />
    <b-form @submit.prevent="submit">
      <b-form-group :label="$t('signIn.email')" label-for="email">
        <b-form-input
          type="email"
          id="email"
          v-model="user.email"
          :placeholder="$t('signIn.emailPlaceholder')"
        />
      </b-form-group>
      <b-form-group :label="$t('signIn.password')" label-for="password">
        <b-form-input
          type="password"
          id="password"
          ref="password"
          v-model="user.password"
          :placeholder="$t('signIn.passwordPlaceholder')"
        />
      </b-form-group>
      <icon-button
        icon="sign-in-alt"
        text="signIn.submit"
        type="submit"
        variant="primary"
        :disabled="!isValid"
      />
    </b-form>
    <div class="my-2">
      <router-link :to="{ name: 'SignUp' }" v-t="'signIn.signUpLink'" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Alert from '@/components/shared/Alert.vue'
import IconButton from '@/components/shared/IconButton.vue'
import { logIn } from '@/api/users'

export default {
  name: 'SignIn',
  components: {
    Alert,
    IconButton
  },
  data() {
    return {
      error: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isValid() {
      return Boolean(this.user.email) && Boolean(this.user.password)
    }
  },
  methods: {
    ...mapActions(['login']),
    clearError() {
      this.error = null
    },
    onError(error, status) {
      console.error(error)
      this.error = status || true
      this.user.password = ''
      this.$refs.password.focus()
    },
    async submit() {
      this.error = false
      try {
        const data = await logIn(this.user)
        this.login(data)
        this.$router.push({ name: 'User' })
      } catch (e) {
        this.onError(e, e.status === 401 ? e.status : null)
      }
    }
  }
}
</script>
