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
      <b-form-group :label="$t('signUp.email')" label-for="email">
        <b-form-input
          type="email"
          id="email"
          v-model="user.email"
          :placeholder="$t('signUp.emailPlaceholder')"
        />
      </b-form-group>
      <b-form-group :label="$t('signUp.name')" label-for="name">
        <b-form-input id="name" v-model="user.name" :placeholder="$t('signUp.namePlaceholder')" />
      </b-form-group>
      <b-form-group :label="$t('signUp.password')" label-for="password">
        <b-form-input
          type="password"
          id="password"
          ref="password"
          v-model="user.password"
          :placeholder="$t('signUp.passwordPlaceholder')"
        />
      </b-form-group>
      <icon-button
        icon="user"
        text="signUp.submit"
        type="submit"
        variant="primary"
        :disabled="!isValid"
      />
      <div class="my-2">
        <router-link :to="{ name: 'SignIn' }" v-t="'signUp.signInLink'" />
      </div>
    </b-form>
  </div>
</template>

<script>
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
      success: false,
      user: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  computed: {
    isValid() {
      return Boolean(this.user.email) && Boolean(this.user.name) && Boolean(this.user.password)
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
</script>
