import store from '@/store'
import { get, post } from './index'

export async function createVisit({ comment, date, rating, restaurantId }) {
  return post(`/unsecure/users/${store.state.user.id}/restaurants/visits`, {
    comment,
    date,
    rating,
    restaurant_id: restaurantId
  })
}

export async function getVisits(limit) {
  return get(`/unsecure/users/${store.state.user.id}/restaurants/visits?limit=${limit || 100}`)
}
