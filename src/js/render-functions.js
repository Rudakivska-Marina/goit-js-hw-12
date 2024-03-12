export const list = document.querySelector(".gallery")

export function createMarkup(array){
    return array.map(element => `<li class="gallery-item">
    <a href="${element.largeImageURL}" class="gallery-link">
    <img class="gallery-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy"/>
    </a>
    <div class="gallery-container">
    <p class="gallery-text">Likes<span>${element.likes}</span></p>
      <p class="gallery-text">Views<span>${element.views}</span></p>
      <p class="gallery-text">Comments<span>${element.comments}</span></p>
      <p class="gallery-text">Downloads<span>${element.downloads}</span></p>
    </div>
  </li>`).join(' ')
}
  
  export function rendering(array){
    list.insertAdjacentHTML("beforeend", createMarkup(array))
}