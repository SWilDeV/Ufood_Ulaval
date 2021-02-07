<template>
  <div>
    <h1 v-t="'signUp.title'" />
    <div class="alert alert-danger" v-t="'genericError'" v-if="error === true" />
    <div class="alert alert-success" v-if="success">
      {{ $t('signUp.success') }}
      <br />
      <router-link :to="{ name: 'SignIn' }" v-t="'navigation.signIn'" />
    </div>
    <form @submit.prevent="submit" v-else>
      <div>
        <label for="email" v-t="'signUp.email'" />
        <input
          type="email"
          id="email"
          v-model="user.email"
          :placeholder="$t('signUp.emailPlaceholder')"
        />
      </div>
      <div>
        <label for="name" v-t="'signUp.name'" />
        <input
          type="text"
          id="name"
          v-model="user.name"
          :placeholder="$t('signUp.namePlaceholder')"
        />
      </div>
      <div>
        <label for="password" v-t="'signUp.password'" />
        <input
          type="password"
          id="password"
          ref="password"
          v-model="user.password"
          :placeholder="$t('signUp.passwordPlaceholder')"
        />
      </div>
      <icon-submit icon="user" text="signUp.submit" :disabled="!isValid" />
    </form>
  </div>
</template>

<script>
import IconSubmit from '@/components/shared/IconSubmit.vue'
import { post } from '@/api'

export default {
  components: {
    IconSubmit
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
      return this.user.email && this.user.name && this.user.password
    }
  },
  methods: {
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

<style scoped>
.alert {
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  position: relative;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}
</style>
