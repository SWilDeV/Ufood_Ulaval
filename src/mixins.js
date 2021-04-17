export default {
  methods: {
    formatDate(value) {
      const date = new Date(value)
      const formatter = new Intl.DateTimeFormat(this.$i18n.locale, {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
      return formatter.format(date)
    },
    formatRating(value) {
      const formatter = new Intl.NumberFormat(this.$i18n.locale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
        style: 'decimal'
      })
      return formatter.format(value)
    },
    getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position.coords), reject)
      })
    }
  }
}
