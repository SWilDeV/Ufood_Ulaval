import { get } from './index'

export function getRestaurants(limit) {
  return get(`/unsecure/restaurants?limit=${limit}`)
}

export function getFilteredRestaurants(count, genre, page, price, search) {
  const query = [`limit=${count}`, `page=${page - 1}`]
  if (genre) {
    query.push(`genres=${genre}`)
  }
  if (price) {
    query.push(`price_range=${price}`)
  }
  if (search) {
    query.push(`q=${search}`)
  }

  const queryString = query.join('&')
  return get(`/unsecure/restaurants?${queryString}`)
}
