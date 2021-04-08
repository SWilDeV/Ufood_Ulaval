const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export default {
  data() {
    return {
      latitude: 0,
      longitude: 0
    }
  },

  methods: {
    formatDate(value) {
      const date = new Date(value)
      const formatter = new Intl.DateTimeFormat(this.$i18n.locale, {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
      return formatter.format(date)
    },

    async getPosition() {
      try {
        const {
          coords: { latitude, longitude }
        } = await getCurrentPosition()
        this.latitude = latitude
        this.longitude = longitude
      } catch (e) {
        console.error(e)
      }
    }
  }
}
