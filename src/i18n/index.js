import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en-US.json'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en-US',
  messages: { 'en-US': enUS }
})
