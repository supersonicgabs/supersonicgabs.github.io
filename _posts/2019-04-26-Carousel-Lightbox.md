---
title: Carousel with Lightbox
date: 2019-04-26 00:00:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- fetch
- api
- data
excerpt: 'Carousel with Lightbox using pure vanilla js.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Carousel with Lightbox using pure vanilla js.

```javacript
  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById('authors');
  const url = 'https://randomuser.me/api/?results=10';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let authors = data.results;
    return authors.map(function(author) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = author.picture.medium;
      span.innerHTML = `${author.name.first} ${author.name.last}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(JSON.stringify(error));
  });
```
<h1>Authors</h1>
<div class="container-carousel">
    <section data-grid="row center" class="page-content">
        <button type="button" data-btn="link" data-control="#oculos-sol" class="icon" data-action="prev">
            <svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129">
                <path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8 0l-54 53.9c-1.6 1.6-1.6 4.2 0 5.8l54 53.9z" />
            </svg>
        </button>
        <section id="oculos-sol" class="carousel" data-size="3" data-grid="row center justify" data-options="">
            <div class="slide" data-cell="shrink">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/black-panther.jpg" />
                </div>
            </div>
            <div class="slide" data-cell="shrink">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/profile-2.JPG" />
                </div>
            </div>
            <div class="slide" data-cell="shrink">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/profile.JPG" />
                </div>
            </div>
            <div class="slide">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/vanilla-js.jpg" />
                </div>
            </div>
            <div class="slide">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/black-panther.jpg" />
                </div>
            </div>
            <div class="slide">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/profile.jpg" />
                </div>
            </div>
        </section>
        <button type="button" data-btn="link" data-control="#oculos-sol" class="icon" data-action="next">
            <svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129">
                <path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z" />
            </svg>
        </button>
    </section>
</div>
