---
title: Fetch with Filter
date: 2019-05-02 19:12:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- fetch
- filter
excerpt: 'Making requisition in SWAPI using Fetch and Filter.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Making requisition in SWAPI using Fetch and Filter.

```javacript
const dataGrid = document.querySelector('[data-characters]')
const dataGridFilter = document.querySelector('[data-characters-filter]')
const swapi = 'https://swapi.co/api/people/'

fetch(swapi)
.then((resp)=> resp.json())
.then(function(data){
  console.log(data.results);
  let people = data.results
  const peopleMap = people.map((item)=>{
    let div = createNode('div'),
        p = createNode('p');
    div.setAttribute('data-cell', 'shrink');
    div.setAttribute('data-text', 'center');
    p.innerHTML = `${item.name}`;
    append(div, p);
    append(dataGrid, div)
  })  

  const peopleFilter = people.filter((item)=>{
    return item.hair_color === 'blond';
  })

  const peopleFilterMap = peopleFilter.map((item)=>{
    let div = createNode('div'),
        p = createNode('p');
    div.setAttribute('data-cell', 'shrink');
    div.setAttribute('data-text', 'center');
    p.innerHTML = `${item.name}`;
    append(div, p);
    append(dataGridFilter, div)
  })

  return {peopleMap, peopleFilterMap}
})
.catch((error)=>{
  console.log(error);  
})
```
<h3>All Characters</h3>
<section data-grid="cols-3 spacing" data-characters></section>

<h3>Only Blod Characters</h3>
<section data-grid="cols-3 spacing" data-characters-filter></section>