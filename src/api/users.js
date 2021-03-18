import { post } from './index'

export function logIn({ email, password }) {
  return post('/login', new URLSearchParams({ email, password }))
}

export function signUp({ email, name, password }) {
  return post('/signup', new URLSearchParams({ email, name, password }))
}
