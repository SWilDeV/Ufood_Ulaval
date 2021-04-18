<template>
  <div class="container">
    <h1 v-t="'signIn.title'" />
    <alert
      v-if="message === 'signed-out'"
      text="signIn.signedOut"
      variant="success"
      @dismissed="clearMessage"
    />
    <alert
      v-if="message === 'expired'"
      text="signIn.expired"
      variant="warning"
      @dismissed="clearMessage"
    />
    <alert
      v-if="error"
      text="signIn.invalidCredentials"
      variant="warning"
      @dismissed="error = null"
    />
    <b-form @submit.prevent="submit">
      <b-form-group
        :label="$t('fields.email.label')"
        label-for="email"
        :invalid-feedback="errors.email"
        :state="errors.email ? false : null"
      >
        <b-form-input
          type="email"
          id="email"
          v-model="email"
          :placeholder="$t('fields.email.placeholder')"
          :state="errors.email ? false : null"
        />
      </b-form-group>
      <b-form-group
        :label="$t('fields.password.label')"
        label-for="password"
        :invalid-feedback="errors.password"
        :state="errors.password ? false : null"
      >
        <b-form-input
          type="password"
          id="password"
          ref="password"
          v-model="password"
          :placeholder="$t('fields.password.placeholder')"
          :state="errors.password ? false : null"
        />
      </b-form-group>
      <div class="mb-3">
        <router-link :to="{ name: 'SignUp' }" v-t="'signIn.signUpLink'" />
      </div>
      <icon-button icon="sign-in-alt" text="signIn.submit" type="submit" variant="primary" />
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Alert from '@/components/shared/Alert.vue'
import IconButton from '@/components/shared/IconButton.vue'
import { logIn } from '@/api/users'

export default {
  name: 'SignUp',
  components: {
    Alert,
    IconButton
  },
  data() {
    return {
      email: '',
      error: null,
      errors: {},
      message: null,
      password: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['login']),
    clearMessage() {
      this.message = null
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
        try {
          const data = await logIn({ email: this.email, password: this.password })
          this.login(data)
          const redirect = this.$route.query.redirect
          this.$router.push(redirect || { name: 'Member', params: { id: this.user.id } })
        } catch (e) {
          console.error(e)
          this.error = true
          this.clearMessage()
          this.password = ''
          this.$refs.password.focus()
        }
      }
    }
  },
  created() {
    if (this.user) {
      this.$router.push({ name: 'Member', params: { id: this.user.id } })
    }
    const hash = this.$route.hash.substr(1)
    if (hash === 'expired' || hash === 'signed-out') {
      this.message = hash
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
