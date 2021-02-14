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
    <u-form
      v-else
      :canSubmit="isValid"
      submitIcon="user"
      submitText="signUp.submit"
      @submit="submit"
    >
      <form-field
        type="email"
        label="signUp.email"
        placeholder="signUp.emailPlaceholder"
        v-model="user.email"
      />
      <form-field label="signUp.name" placeholder="signUp.namePlaceholder" v-model="user.name" />
      <form-field
        type="password"
        ref="password"
        label="signUp.password"
        placeholder="signUp.passwordPlaceholder"
        v-model="user.password"
      />
    </u-form>
  </div>
</template>

<script>
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
      return Boolean(this.user.email && this.user.name && this.user.password)
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
        const response = await post('/signup', new URLSearchParams(this.user))
        if (response.ok) {
          this.success = true
        } else {
          this.onError(response)
        }
      } catch (e) {
        this.onError(e)
      }
    }
  }
}
</script>
