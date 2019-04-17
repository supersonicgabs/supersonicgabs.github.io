
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-target]'));
  links.forEach(function (link){

    var linkTarget = link.getAttribute('data-target');

    link.addEventListener('click', function(){
      var targets = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
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
