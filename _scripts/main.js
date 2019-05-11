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

import {_createNode, _append, _toggleItself} from './util/myHelpers.js';

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
// function createNode(element){
//   return document.createElement(element); // Create the type of element you pass in the parameters
// }

// function append(parent, el){
//   return parent.appendChild(el); // Append the second parameter(element) to the first one
// }

const grid = document.getElementById('authors'); // Get the list where we will place our authors
const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users

fetch(url) // Call the fetch function passing the url of the API as a parameter
.then((resp)=> resp.json()) // Transform the data into JSON
.then(function(data){
  // Your code for handling the data you get from the API
  // Create and append the li's to the ul
  let authors = data.results; // Get the results
  return authors.map(function(author){
    let div = _createNode('div'), // Create the elements we need
        img = _createNode('img'),
        p = _createNode('p');
    img.src = author.picture.medium; 
    div.setAttribute('data-cell', 'shrink');
    div.setAttribute('data-text', 'center');
    // Add the source of the image to be the src of the img element
    p.innerHTML = `${author.name.first} ${author.name.last}`; 
    // Make the HTML of our p to be the first and last name of our author
    _append(div, img); // Append all our elements
    _append(div, p);
    _append(grid, div);
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

function makeObj(){
  return {
    nome: nome.value,
    cpf: pk.value,
    email: email.value
  }
}

let array = []
const clearForm = document.querySelector('.contact-form')
const btnEnviar = document.querySelector('.enviar');
const btnDeletar = document.querySelector('.deletar');

btnEnviar && btnEnviar.addEventListener('click', ()=>{
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
})

function transformText(array){
  // const objectText = JSON.stringify({array}, null, " ")
  // const dataContainer = document.querySelector('.results_display');
  // dataContainer.textContent = objectText;
  const objectText = array.reduce((acc, item, index) =>{
    acc+= `<ul><li>${item.nome}</li><li>${item.cpf}</li><li>${item.email}</li></ul>`
    return acc
  }, '')
  const dataContainer = document.querySelector('.results_display');
  dataContainer.innerHTML = objectText;
}

function arrayRemove(arr, value){ //retorna todos os elementos do array menos o que você passar
  return arr.filter((ele, index) => {return index != value})
}

btnDeletar && btnDeletar.addEventListener('click', ()=> {
  let indexArray = array.findIndex(elem => {
    return elem.cpf === pk.value
  })

  if(indexArray > -1){
    array = arrayRemove(array, indexArray)
  }
  transformText(array);
  clearForm.reset();
})

// ------TOGGLE BUTTON------
// const toggleBtn = document.querySelector('[data-toggle]');
// const toggleContent = document.querySelector('[data-content]');

// toggleBtn && toggleBtn.addEventListener('click', ()=>{

//   if(toggleContent.hasAttribute('hidden')){
//     toggleContent.removeAttribute('hidden')
//   }
//   else{
//     toggleContent.setAttribute('hidden', '')
//   }
// })
_toggleItself(document.querySelector('[data-toggle]'), document.querySelector('[data-content]'))

// ------ MAP AND FILTER ------
let data = [
  {
    name: 'Butters',
    age: 3,
    type: 'dog'
  },
  {
    name: 'Lizzy',
    age: 6,
    type: 'dog'
  },
  {
    name: 'Red',
    age: 1,
    type: 'cat'
  },
  {
    name: 'Joey',
    age: 3,
    type: 'dog'
  }
]

let dogs = data.filter((animal)=>{
  return animal.type === 'dog'
})

dogs.map((animal)=>{
  return animal.age *= 7
})

const calcAge = dogs.reduce((sum, animal)=>{
  return sum + animal.age
}, 0)

console.log(dogs);
console.log(calcAge);

// ------ FILTER FETCH RESULTS ------

const dataGrid = document.querySelector('[data-characters]')
const dataGridFilter = document.querySelector('[data-characters-filter]')
const swapi = 'https://swapi.co/api/people/'

fetch(swapi)
.then((resp)=> resp.json())
.then(function(data){
  console.log(data.results);
  let people = data.results
  const peopleMap = people.map((item)=>{
    let div = _createNode('div'),
        p = _createNode('p');
    div.setAttribute('data-cell', 'shrink');
    div.setAttribute('data-text', 'center');
    p.innerHTML = `${item.name}`;
    _append(div, p);
    _append(dataGrid, div)
  })  

  const peopleFilter = people.filter((item)=>{
    return item.hair_color === 'blond';
  })

  const peopleFilterMap = peopleFilter.map((item)=>{
    let div = _createNode('div'),
        p = _createNode('p');
    div.setAttribute('data-cell', 'shrink');
    div.setAttribute('data-text', 'center');
    p.innerHTML = `${item.name}`;
    _append(div, p);
    _append(dataGridFilter, div)
  })

  return {peopleMap, peopleFilterMap}
})
.catch((error)=>{
  console.log(error);  
})

