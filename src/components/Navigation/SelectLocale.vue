<template>
  <b-nav-item href="#" @click="setLocale(otherLocale)">
    {{ otherLocale.toUpperCase() }}
  </b-nav-item>
</template>

<script>
export default {
  name: 'SelectLocale',
  computed: {
    otherLocale() {
      const current = this.$i18n.locale
      return this.$i18n.availableLocales.filter(locale => locale !== current)[0]
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>
