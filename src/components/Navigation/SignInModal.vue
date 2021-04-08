<template>
  <b-modal :id="id" :title="$t('signIn.title')">
    <alert v-if="error === true" text="genericError" variant="danger" @dismissed="clearError" />
    <alert
      v-if="error === 401"
      text="signIn.invalidCredentials"
      variant="warning"
      @dismissed="clearError"
    />
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
    <template #modal-footer="{ cancel, ok }">
      <div class="my-2" v-if="$route.name !== 'SignUp'">
        <router-link :to="{ name: 'SignUp' }" v-t="'signIn.signUpLink'" />
      </div>
      <icon-button icon="ban" text="buttons.cancel" @click="clear(cancel)" />
      <icon-button icon="sign-in-alt" text="signIn.submit" variant="primary" @click="submit(ok)" />
    </template>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import Alert from '@/components/shared/Alert.vue'
import IconButton from '@/components/shared/IconButton.vue'
import { logIn } from '@/api/users'

export default {
  name: 'SignInModal',
  components: {
    Alert,
    IconButton
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      email: '',
      error: null,
      errors: {},
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    clear(callback) {
      this.email = ''
      this.errors = {}
      this.password = ''
      this.clearError()
      if (callback) {
        callback()
      }
    },
    clearError() {
      this.error = null
    },
    async submit(callback) {
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
          this.clear(callback)
        } catch (e) {
          console.error(e)
          this.error = e.status === 401 ? e.status : true
          this.password = ''
          this.$refs.password.focus()
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
