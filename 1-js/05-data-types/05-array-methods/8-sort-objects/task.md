importance: 5

---

# مرتب‌سازی شیءها

تابع `sortByName(users)` را بنویسید که آرایه‌ای از شیءهای شامل `age` دریافت می‌کند و آنها را بر اساس `age` مرتب می‌کند.

برای مثال:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// now: [john, mary, pete]
alert(arr[0].name); // Mary
alert(arr[2].name); // Pete
```
