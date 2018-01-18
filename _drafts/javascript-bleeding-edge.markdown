---
title: 'JavaScript: The Bleeding Edge'
date: '2009-05-05 20:54:00'
tags:
- Mozilla
---

JavaScript is an amazing language. We all know that it has it's quirks and some of us have even managed to learn to love them. Some use only use the good parts and some are just as happy to use the bad parts. Some love JavaScript and some hate it. Well, love it or hate it, JavaScript is here to stay.

Extension developers tend to learn very quickly that they are not limited by having to make their JavaScript work with multiple browsers. In fact, they are completely free to use many JavaScript features that do not exist in other browsers. For me this is like a breath of fresh air. In many ways extension and browser developers are seeing the future of JavaScript.

In this post I would like to give you to a few tips and show you some new features that you may not be familiar with. I will add these tips roughly in the order that they were added to JavaScript so you may know the first few:

**Display a number to x decimal places** `5.123456.toPrecision(5) // Displays 5.1235`

**Getters and setters**
```
var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  }
};
```

In the above example o.a == 7 and o.b == 8. Setting o.c = 8 would set a to 4.

**Constants**
`const SOMECONST = 1;`

Constants can be declared anywhere and are read only versions of normal variables.

**Array.every(), Array.filter(), Array.forEach(), Array.map() and Array.some()**

Array.every() runs a function on items in the array while that function is returning true. It returns true if the function returns true for every item it could visit. The below code returns assigns true to x if the array contents are all even numbers.

```
var x = [2, 4, 6].every(function(el) {
  return el % 2 == 0;
});
```

Array.filter() runs a function on every item in the array and returns an array of all items for which the function returns true. The following code assigns an array to x containing only the odd numbers from the original array.

```
var x = [2, 3, 6, 7, 10].filter(function(el) {
  return el % 2 == 1;
});
```
