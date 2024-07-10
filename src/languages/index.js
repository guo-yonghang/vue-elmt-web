import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const I18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: 'zh',
  messages: { zh, en },
})

export default I18n
