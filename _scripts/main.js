import Slider from './lib/Slider';
import Carousel from './lib/Carousel';
import Lightbox from './lib/Lightbox';
import {configSlider} from './lib/configSlider';
import mascaras from './util/maks';
import {
  _map,
  screen,
  _toggle,
  _show,
  createElement,
  _hide
} from './util/helpers';

// ------ TABS ------
const allTargets = document.querySelectorAll('[data-target]');
const links = Array.prototype.slice.call(allTargets);

links.forEach(function (link){
  const linkTarget = link.getAttribute('data-target')
  const allTabs = document.querySelectorAll('[data-tab]')

  link.addEventListener('click', function(){
    const targets = Array.prototype.slice.call(allTabs);      
    targets.forEach(function (target){
      target.setAttribute('hidden', '');

      if(linkTarget === target.getAttribute('data-tab')){
        target.removeAttribute('hidden');
        links.forEach(btn =>{
          btn.classList.remove('active');
        })
        link.classList.add('active');
      }
    })
  });
});

// ------ CREATE ELEMENT ------
const btnCreateEl = document.querySelector('[data-create]');
btnCreateEl && btnCreateEl.addEventListener('click', ()=>{
  const newList = document.createElement('ul');
  const content = document.querySelector('[class="post-content"]');
  content.appendChild(newList);
  newList.innerHTML = '<li>teste1</li><li>teste2</li>';
});

// ------ SUMREDUCER WITH FLAT ------
function sumReducer() {
  //converter arguments em array
  const args = Array.prototype.slice.call(arguments);
  // achatar args
  const flatArgs = args.flat(Infinity);
  //filtar números
  const numberArgs = flatArgs.filter(n => typeof n === 'number');
  // somar
  return numberArgs.reduce((sum, n) => sum + n, 0);
}

// function flattenDeep(arr1){
//   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
// }

const result = sumReducer([0, 3, 7], [null, 'ema watson', 82], 5, [[3, 0], [1], null], [])

const resultSum = document.querySelector('[data-sum]');
resultSum && resultSum.addEventListener('click', ()=>{
  const newDiv = document.createElement('div');
  const content = document.querySelector('[class="post-content"]');
  content.appendChild(newDiv);
  newDiv.innerHTML = `${result}`
})

// ------ FETCH ------
function createNode(element){
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el){
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

const ul = document.getElementById('authors'); // Get the list where we will place our authors
const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users

fetch(url) // Call the fetch function passing the url of the API as a parameter
.then((resp)=> resp.json()) // Transform the data into JSON
.then(function(data){
  // Your code for handling the data you get from the API
  // Create and append the li's to the ul
  let authors = data.results; // Get the results
  return authors.map(function(author){
    let li = createNode('li'), // Create the elements we need
        img = createNode('img'),
        span = createNode('span');
    img.src = author.picture.medium; 
    // Add the source of the image to be the src of the img element
    span.innerHTML = `${author.name.first} ${author.name.last}`; 
    // Make the HTML of our span to be the first and last name of our author
    append(li, img); // Append all our elements
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error){
  console.log(error);
})

// ------ SLIDER WITH LIGHTBOX ------
window.sliders = _map('.slider', parent => {
  const slider = new Slider({
    parent
  });
  configSlider(slider, parent);
});

window.carousels = _map('.carousel', parent => {
  const size = parent.getAttribute('data-size') | 0;
  const carousel = new Carousel({
    parent,
    size
  });
  configSlider(carousel, parent);
  return carousel;
});

var lightbox = new Lightbox("[data-lightbox]");

// ------ MASKS ------
const each = (i, f) => Array.prototype.forEach.call(i, f);
const form = document.querySelectorAll('form');

if (form.length) each(form, FormMask);
function FormMask(f) {
  (Array.from(f.elements))
      .filter(el => el.hasAttribute('data-mask'))
      .forEach(campo => campo.addEventListener('input', function () {
        const metodo = this.getAttribute('data-mask');
        if (!mascaras[metodo]) return console.log(`A máscara do tipo "${metodo}" não foi definida.`);

        mascaras[metodo](this);
  }));
}

// ------ CRUD WITH JS ------
const nome = document.querySelector('#nome')
const pk = document.querySelector('#cpfcnpj')
const email = document.querySelector('#email')

function makeObj(data){
  return {
    nome: nome.value,
    cpf: pk.value,
    email: email.value
  }
}

let array = []
const clearForm = document.querySelector('.contact-form')

document.querySelector('.enviar').onclick = function(){
  if(nome.value!=null, nome.value!="" && pk.value!=null, pk.value!="" && email.value!=null, email.value!=""){
    let indexArray = array.findIndex(elem => {
      return elem.cpf===pk.value
    })
    if(indexArray > -1){
      array[indexArray] = makeObj()
    }
    else{
      array.push(makeObj())
    }
    transformText(array);
    clearForm.reset();
  }
  else{
    alert('Preencha todos os campos!')
  }
}

function transformText(array){
  // const objectText = JSON.stringify({array}, null, " ")
  // const dataContainer = document.querySelector('.results_display');
  // dataContainer.textContent = objectText;
  const objectText = array.reduce((acc, item, index) =>{
    acc+= `<ul><li>${item.nome}</li><li>${item.cpf}</li><li>${item.email}</li></ul>`
    return acc
  }, '')
  const dataContainer = document.querySelector('.results_display');
  dataContainer.textContent = objectText;
}

function arrayRemove(arr, value){ //retorna todos os elementos do array menos o que você passar
  return arr.filter((ele, index) => {return index != value})
}

document.querySelector('.deletar').onclick = function(){
  let indexArray = array.findIndex(elem => {
    return elem.cpf === pk.value
  })

  if(indexArray > -1){
    array = arrayRemove(array, indexArray)
  }
  transformText(array);
  clearForm.reset();
}