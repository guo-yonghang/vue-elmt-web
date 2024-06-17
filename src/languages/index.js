import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {},
    en: {},
  },
})

export default i18n
