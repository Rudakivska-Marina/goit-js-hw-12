export function getPicture(value) {
  const BASIC_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const KEY = '42798997-7eb979f96087e0185c9def0a6';
  
  const parameters = new URLSearchParams({
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 21,
  });

  return fetch(`${BASIC_URL}${END_POINT}?${parameters}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}