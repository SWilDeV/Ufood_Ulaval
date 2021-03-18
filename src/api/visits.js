import store from '@/store'
import { post } from './index'

export async function createVisit({ comment, date, rating, restaurantId }) {
  return post(`/unsecure/users/${store.state.user.id}/restaurants/visits`, {
    comment,
    date,
    rating,
    restaurant_id: restaurantId
  })
}
