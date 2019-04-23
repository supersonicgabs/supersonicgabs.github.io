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

const btnCreateEl = document.querySelector('[data-create]');
btnCreateEl && btnCreateEl.addEventListener('click', ()=>{
  const newList = document.createElement('ul');
  const content = document.querySelector('[class="post-content"]');
  content.appendChild(newList);
  newList.innerHTML = '<li>teste1</li><li>teste2</li>';
});

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

