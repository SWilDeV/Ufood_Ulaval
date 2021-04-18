import { get } from './index'

export function getRestaurant(id) {
  return get(`/unsecure/restaurants/${id}`)
}

export function getRestaurants({ coords, count, genre, page, price, search }) {
  const params = []
  if (coords) {
    params.push(`lon=${coords.longitude}`)
    params.push(`lat=${coords.latitude}`)
  }
  if (count) {
    params.push(`limit=${count}`)
  }
  if (genre) {
    params.push(`genres=${genre}`)
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
