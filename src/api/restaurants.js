import { get } from './index'

export function getRestaurants({ count, genre, page, price, search }) {
  const params = []
  if (genre) {
    params.push(`genres=${genre}`)
  }
  if (count) {
    params.push(`limit=${count}`)
  }
  if (page) {
    params.push(`page=${page - 1}`)
  }
  if (price) {
    params.push(`price_range=${price}`)
  }
  if (search) {
    params.push(`q=${search}`)
  }
  const query = params.length ? `?${params.join('&')}` : ''
  return get(`/unsecure/restaurants${query}`)
}

export function getOneRestaurant(id) {
  return get(`/unsecure/restaurants/${id}`)
}
