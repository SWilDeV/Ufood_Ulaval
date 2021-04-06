export default {
  methods: {
    formatDate(value) {
      const date = new Date(value)
      const formatter = new Intl.DateTimeFormat(this.$i18n.locale, {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
      return formatter.format(date)
    }
  }
}
