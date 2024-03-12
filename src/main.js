// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


import {getPicture, perPage} from "./js/pixabay-api"
import {rendering} from "./js/render-functions";
import {list} from "./js/render-functions";
const form = document.querySelector("form");
const input = document.querySelector("input");
const PaddingButton = document.querySelector(".padding-button");
const loader = document.querySelector(".loader");
let page = 1;

function scrollOn(element){
  const value = element.getBoundingClientRect();
  const scrollHeight = value.height*2;
  window.scrollBy({
    top: scrollHeight,
    behavior: "smooth"
  });
}

function showLoader() {
  loader.classList.remove("is-hidden");
  }
  function hideLoader() {
    loader.classList.add("is-hidden");
    }
    function showButton() {
      PaddingButton.classList.remove("is-hidden");
      }
      function hideButton() {
        PaddingButton.classList.add("is-hidden");
        }
        function theEnd(length, page){
          if(length < page){
            iziToast.warning({
              message: 'We are sorry, but youve reached the end of search results.!'
            }); 
            hideButton();
        }}

async function forListener(element){
  element.preventDefault();
  page = 1;
  showLoader();
  list.innerHTML = "";
  const inputValue = form.elements.field.value;
 if(inputValue){ 
  try{ 
   const result = await getPicture(inputValue, page);
    if(result.data.total !== 0){
    rendering(result.data.hits);
    modal.refresh();
    showButton();
    theEnd(result.data.hits.length, perPage)
  }else{
  iziToast.warning({
    message: 'Sorry, there are no images matching your search query. Please try again!'
  })
      
input.value = ""
hideButton();
    }
  }
   
 catch(error){
      iziToast.warning({
        message: 'Ups, something wrong bad. Please try again!'
    })  
     }
     finally{hideLoader()} 
}else{iziToast.warning({
  message: 'Please enter the name of the picture!'
})}}

async function forPaddingButton(element){
 page++;
  element.preventDefault();
  showLoader();
  const inputValue = form.elements.field.value;
  try{ 
    const result = await getPicture(inputValue, page);
    rendering(result.data.hits);
    modal.refresh();
    const item = document.querySelector(".gallery-item");
scrollOn(item);
theEnd(result.data.hits.length, perPage)}
catch(error){
  iziToast.warning({
    message: 'Ups, something wrong bad. Please try again!'
})}  
finally{hideLoader()}  }

form.addEventListener("submit", forListener);
PaddingButton.addEventListener("click", forPaddingButton); 
const modal = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: '250'});