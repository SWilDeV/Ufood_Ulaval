<template>
  <div class="container">
    <h1 v-t="'signUp.title'" />
    <alert v-if="success" text="signUp.success" variant="success" :dismissible="false" />
    <b-form v-else @submit.prevent="submit">
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
        :label="$t('fields.name.label')"
        label-for="name"
        :invalid-feedback="errors.name"
        :state="errors.name ? false : null"
      >
        <b-form-input
          id="name"
          v-model="name"
          :placeholder="$t('fields.name.placeholder')"
          :state="errors.name ? false : null"
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
        <router-link :to="{ name: 'SignIn' }" v-t="'signUp.signInLink'" />
      </div>
      <icon-button icon="user" text="signUp.submit" type="submit" variant="primary" />
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
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
      email: '',
      errors: {},
      name: '',
      password: '',
      success: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async submit() {
      if (this.email === '') {
        Vue.set(this.errors, 'email', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'email')
      }

      if (this.name === '') {
        Vue.set(this.errors, 'name', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'name')
      }

      if (this.password === '') {
        Vue.set(this.errors, 'password', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'password')
      }

      if (!Object.keys(this.errors).length) {
        try {
          await signUp({ email: this.email, name: this.name, password: this.password })
          this.success = true
        } catch (e) {
          console.error(e)
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
  },
  watch: {
    email() {
      Vue.delete(this.errors, 'email')
    },
    name() {
      Vue.delete(this.errors, 'name')
    },
    password() {
      Vue.delete(this.errors, 'password')
    }
  }
}
</script>
