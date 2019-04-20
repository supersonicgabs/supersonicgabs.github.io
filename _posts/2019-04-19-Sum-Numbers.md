---
title: Sum only numbers in array using .flat()
date: 2019-04-17 00:00:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- flat array
excerpt: 'Using Flat array to sum every number in an array, even if the number is inside an object.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Using Flat array to sum every number in an array, even if the number is inside an object.

```javacript
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
console.log(result);
});
```
<div data-grid="small-spacing row">
    <a data-btn data-sum="">sum all elements</a>
</div>