<template>
  <!-- <b-form-select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
        {{ lang }}
      </option>
    </b-form-select> -->
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
