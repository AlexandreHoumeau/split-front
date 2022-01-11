const API_DOMAIN = process.env.DOMAIN || 'http://localhost:3002'
const JWT_TOKEN = 'authToken'
const I18N_LANGUAGE = 'i18nextLng'
const STRIPE_PUBLIC = process.env.REACT_APP_STRIPE_PUBLIC

export {
  API_DOMAIN,
  JWT_TOKEN,
  I18N_LANGUAGE,
  STRIPE_PUBLIC
}
