<template>
  <div class="container">
    <h1 v-t="'signUp.title'" />
    <alert v-if="error === true" type="danger" text="genericError" :dismiss="clearError" />
    <alert v-if="success" type="success" text="signUp.success">
      <template v-slot:after>
        <br />
        <router-link :to="{ name: 'SignIn' }" v-t="'navigation.signIn'" />
      </template>
    </alert>
    <b-form v-else @submit.prevent="submit">
      <b-form-group
        :label="$t('signUp.email')"
        label-for="email"
        :invalid-feedback="errors.email"
        :state="errors.email ? false : null"
      >
        <b-form-input
          type="email"
          id="email"
          v-model="user.email"
          :placeholder="$t('signUp.emailPlaceholder')"
          :state="errors.email ? false : null"
        />
      </b-form-group>
      <b-form-group
        :label="$t('signUp.name')"
        label-for="name"
        :invalid-feedback="errors.name"
        :state="errors.name ? false : null"
      >
        <b-form-input
          id="name"
          v-model="user.name"
          :placeholder="$t('signUp.namePlaceholder')"
          :state="errors.name ? false : null"
        />
      </b-form-group>
      <b-form-group
        :label="$t('signUp.password')"
        label-for="password"
        :invalid-feedback="errors.password"
        :state="errors.password ? false : null"
      >
        <b-form-input
          type="password"
          id="password"
          ref="password"
          v-model="user.password"
          :placeholder="$t('signUp.passwordPlaceholder')"
          :state="errors.password ? false : null"
        />
      </b-form-group>
      <icon-button icon="user" text="signUp.submit" type="submit" variant="primary" />
      <div class="my-2">
        <router-link :to="{ name: 'SignIn' }" v-t="'signUp.signInLink'" />
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Alert from '@/components/shared/Alert.vue'
import IconButton from '@/components/shared/IconButton.vue'
import { signUp } from '@/api/users'

export default {
  name: 'SignUp',
  components: {
    Alert,
    IconButton
  },
  data() {
    return {
      error: false,
      errors: {},
      success: false,
      user: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    clearError() {
      this.error = null
    },
    onError(error) {
      console.error(error)
      this.error = true
      this.user.password = ''
      this.$refs.password.focus()
    },
    async submit() {
      if (this.user.email === '') {
        Vue.set(this.errors, 'email', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'email')
      }

      if (this.user.name === '') {
        Vue.set(this.errors, 'name', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'name')
      }

      if (this.user.password === '') {
        Vue.set(this.errors, 'password', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'password')
      }

      if (!Object.keys(this.errors).length) {
        this.error = false
        try {
          await signUp(this.user)
          this.success = true
        } catch (e) {
          this.onError(e)
        }
      }
    }
  }
}
</script>
