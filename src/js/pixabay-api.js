import axios from 'axios';
export const perPage = 15;

  axios.defaults.baseURL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const KEY = '42798997-7eb979f96087e0185c9def0a6';
  
  export async function getPicture(value, page) {
  const result =  await axios.get(`${END_POINT}`, {params: {
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page
  }})
  return result
}