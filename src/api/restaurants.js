import { get } from './index'

export function getRestaurants(limit) {
  return get(`/unsecure/restaurants?limit=${limit}`)
}
