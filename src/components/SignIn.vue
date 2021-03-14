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
    <u-form
      :canSubmit="isValid"
      submitIcon="sign-in-alt"
      submitText="signIn.submit"
      @submit="submit"
    >
      <form-field
        type="email"
        label="signIn.email"
        placeholder="signIn.emailPlaceholder"
        v-model="user.email"
      ></form-field>
      <form-field
        type="password"
        ref="password"
        label="signIn.password"
        placeholder="signIn.passwordPlaceholder"
        v-model="user.password"
      ></form-field>
    </u-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Alert from '@/components/shared/Alert.vue'
import FormField from '@/components/shared/FormField.vue'
import UForm from '@/components/shared/UForm.vue'
import { post } from '@/api'

export default {
  components: {
    Alert,
    FormField,
    UForm
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
      return Boolean(this.user.email && this.user.password)
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
<<<<<<< HEAD
        const response = await post('/login', new URLSearchParams(this.user))
        if (response.ok) {
          const data = await response.json()
          this.login(data)
          this.$router.push({ name: 'UserPage' })
        } else {
          this.onError(response, response.status === 401 ? response.status : null)
        }
=======
        const data = await post('/login', new URLSearchParams(this.user))
        this.$router.push({ name: 'User' })
        this.login(data)
>>>>>>> 805a84d295df6a947fa7dc37a3dd8071590ddd83
      } catch (e) {
        this.onError(e, e.status === 401 ? e.status : null)
      }
    }
  }
}
</script>
