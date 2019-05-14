---
title: AJAX Request
date: 2019-05-02 19:12:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- ajax
- request
excerpt: 'Making requisition in SWAPI using AJAX.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Making requisition in SWAPI using AJAX.

```javacript
const Http = new XMLHttpRequest();
const url1='https://swapi.co/api/people/';
Http.open('GET', url1);
Http.send();

Http.onreadystatechange=function(){
  if(this.readyState==4 && this.status==200){
    console.log(JSON.parse(Http.responseText));
    console.log(JSON.parse(Http.responseText).results);
  }
}
```