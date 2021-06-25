نتیجه `4` است:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

به این دلیل که آرایه‌ها شیء هستند. پس هر دوی `shoppingCart` و `fruits` به یک آرایه رجوع می‌کنند.

