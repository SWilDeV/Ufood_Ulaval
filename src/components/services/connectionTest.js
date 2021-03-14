export async function getListRestaurants() {
    const API_KEY = 'a393e29bbeeb482f9382ec57d1a3fb9f';
    const URL = `https://ufoodapi.herokuapp.com/unsecure/restaurants`;

    const response = await fetch(URL);
    return await response.json();
}

export default {
    getListRestaurants,
}