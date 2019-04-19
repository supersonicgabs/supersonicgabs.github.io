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
  console.log(content);
  content.appendChild(newList);
  newList.innerHTML = '<li>teste1</li><li>teste2</li>';
});
