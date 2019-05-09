---
title: Toggle button
date: 2019-05-02 19:12:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- toggle
- button
excerpt: 'Simple toggle button with js.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Simple toggle button with js.

```javacript
const toggleBtn = document.querySelector('[data-toggle]');
const toggleContent = document.querySelector('[data-content]');

toggleBtn && toggleBtn.addEventListener('click', ()=>{
  if(toggleContent.hasAttribute('hidden')){
    toggleContent.removeAttribute('hidden')
  }
  else{
    toggleContent.setAttribute('hidden', '')
  }
})
```

<a data-btn data-toggle>toggle</a>

<p data-content hidden>Hello World!<p>

<section data-grid="cols-3 spacing" data-characters></section>
<section data-grid="cols-3 spacing" data-characters-filter></section>