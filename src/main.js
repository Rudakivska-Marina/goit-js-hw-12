// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const loader = document.querySelector(".loader")
import {getPicture} from "./js/pixabay-api"
import {rendering} from "./js/render-functions"
export const list = document.querySelector(".gallery")
const form = document.querySelector("form")
const input = document.querySelector("input")

function showLoader() {
  loader.classList.remove("is-hidden");
  }

  function hideLoader() {
    loader.classList.add("is-hidden");
    }

const modal = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: '250'
})

form.addEventListener("submit", forListener)

function forListener(element){
  element.preventDefault()
  showLoader()
  list.innerHTML = ""
   const inputValue = element.currentTarget.elements.field.value
 if(inputValue){ 
  getPicture(inputValue).then((result) =>{ 
    if(result.total !== 0){
    rendering(result.hits)
    modal.refresh()
    input.value = ""
 }else{
  iziToast.warning({
    message: 'Sorry, there are no images matching your search query. Please try again!'
})
input.value = ""
 }
})
     .catch(error => {
      iziToast.warning({
        message: 'Ups, something wrong bad. Please try again!'
    })   
     }).finally(() => {hideLoader()})
     
}else{iziToast.warning({
  message: 'Please enter the name of the picture!'
})
}
}