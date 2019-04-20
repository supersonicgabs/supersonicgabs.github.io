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

