<template>
  <div class="container">
    <h1 v-t="'signIn.title'" />
    <alert v-if="error === true" text="genericError" variant="danger" @dismissed="clearError" />
    <alert
      v-if="error === 401"
      text="signIn.invalidCredentials"
      variant="warning"
      @dismissed="clearError"
    />
    <b-form @submit.prevent="submit">
      <b-form-group
        :label="$t('signIn.email')"
        label-for="email"
        :invalid-feedback="errors.email"
        :state="errors.email ? false : null"
      >
        <b-form-input
          type="email"
          id="email"
          v-model="email"
          :placeholder="$t('signIn.emailPlaceholder')"
          :state="errors.email ? false : null"
        />
      </b-form-group>
      <b-form-group
        :label="$t('signIn.password')"
        label-for="password"
        :invalid-feedback="errors.password"
        :state="errors.password ? false : null"
      >
        <b-form-input
          type="password"
          id="password"
          ref="password"
          v-model="password"
          :placeholder="$t('signIn.passwordPlaceholder')"
          :state="errors.password ? false : null"
        />
      </b-form-group>
      <icon-button icon="sign-in-alt" text="signIn.submit" type="submit" variant="primary" />
    </b-form>
    <div class="my-2">
      <router-link :to="{ name: 'SignUp' }" v-t="'signIn.signUpLink'" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
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
      email: '',
      error: false,
      errors: {},
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    clearError() {
      this.error = false
    },
    onError(error, status) {
      console.error(error)
      this.error = status || true
      this.password = ''
      this.$refs.password.focus()
    },
    async submit() {
      if (this.email === '') {
        Vue.set(this.errors, 'email', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'email')
      }

      if (this.password === '') {
        Vue.set(this.errors, 'password', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'password')
      }

      if (!Object.keys(this.errors).length) {
        this.clearError()
        try {
          const data = await logIn({ email: this.email, password: this.password })
          this.login(data)
          this.$router.push({ name: 'User' })
        } catch (e) {
          this.onError(e, e.status === 401 ? e.status : null)
        }
      }
    }
  },
  watch: {
    email() {
      Vue.delete(this.errors, 'email')
    },
    password() {
      Vue.delete(this.errors, 'password')
    }
  }
}
</script>
