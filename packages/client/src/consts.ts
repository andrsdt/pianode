export const PUBLIC_URL = '/'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const SERVER_URL = IS_PRODUCTION ? '/' : 'http://localhost:3001'
