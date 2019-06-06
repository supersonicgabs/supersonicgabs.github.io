---
title: Tabs Itself
date: 2019-06-05 00:00:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- tabs
excerpt: 'Creating tabs who hide and show, using a css style in the button clicked to indicate wich tab is active.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Creating tabs who hide and show, using a css style in the button clicked to indicate wich tab is active.

```javacript
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
```
<div data-grid="small-spacing row">
    <a data-btn data-link="tab-1" class="active">Tab 1</a>
    <a data-btn data-link="tab-2" class="">Tab 2</a>
    <a data-btn data-link="tab-3" class="">Tab 3</a>
    <a data-btn data-link="tab-4" class="">Tab 4</a>
</div>
<section>
    <div data-section="tab-1">tab 1</div>
    <div data-section="tab-2" hidden>tab 2</div>
    <div data-section="tab-3" hidden>tab 3</div>
    <div data-section="tab-4" hidden>tab 4</div>
</section>