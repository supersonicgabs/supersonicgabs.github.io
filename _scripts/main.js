  const allTargets = document.querySelectorAll('[data-target]');
  const links = Array.prototype.slice.call(allTargets);

  links.forEach(function (link){
    const linkTarget = link.getAttribute('data-target')
    const allTabs = document.querySelectorAll('[data-tab]')

    link.addEventListener('click', function(){
      const targets = Array.prototype.slice.call(allTabs);
      link.classList.remove('active');
      targets.forEach(function (target){
        target.setAttribute('hidden', '');

        if(linkTarget === target.getAttribute('data-tab')){
          target.removeAttribute('hidden');
          link.classList.add('active');
        }
      })
    });    
  });
