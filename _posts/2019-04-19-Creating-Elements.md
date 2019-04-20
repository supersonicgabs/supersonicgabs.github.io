---
title: Creating elements with Vanilla JS
date: 2019-04-17 00:00:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- create element
excerpt: 'Creating html elements only using vanilla JS.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Creating html elements only using vanilla JS.

```javacript
const btnCreateEl = document.querySelector('[data-create]');
btnCreateEl && btnCreateEl.addEventListener('click', ()=>{
  const newList = document.createElement('ul');
  const content = document.querySelector('[class="post-content"]');
  content.appendChild(newList);
  newList.innerHTML = '<li>teste1</li><li>teste2</li>';
});
```
<div data-grid="small-spacing row">
    <a data-btn data-create="">Create Element</a>
</div>