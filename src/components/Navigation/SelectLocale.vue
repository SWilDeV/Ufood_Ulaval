<template>
  <b-nav-item href="#" @click="setLocale()">
    {{ otherLocale }}
  </b-nav-item>
</template>

<script>
export default {
  name: 'SelectLocale',
  computed: {
    otherLocale() {
      return this.$i18n.availableLocales.filter(l => l !== this.$i18n.locale)[0]
    }
  },
  methods: {
    setLocale() {
      this.$i18n.locale = this.otherLocale
    }
  }
}
</script>
