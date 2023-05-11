import { createI18n } from 'vue-i18n'

import { messages } from '../Helpers/Languages'

export const i18n = createI18n({
	locale: 'en', // set locale
	fallbackLocale: 'sk', // set fallback locale
	messages, // set locale messages
	// If you need to specify other options, you can set other options
	// ...
})

import * as validators from '@vuelidate/validators'
// or import { createI18nMessage } from '@vuelidate/validators'
const { createI18nMessage } = validators

// Create your i18n message instance. Used for vue-i18n@9
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

// wrap each validator.
export const required = withI18nMessage(validators.required)
export const email = withI18nMessage(validators.email)
export const sameAs = withI18nMessage(validators.sameAs, { withArguments: true })
// validators that expect a parameter should have `{ withArguments: true }` passed as a second parameter, to annotate they should be wrapped
export const minLength = withI18nMessage(validators.minLength, { withArguments: true })
// or you can provide the param at definition, statically
export const maxLength = withI18nMessage(validators.maxLength(10))