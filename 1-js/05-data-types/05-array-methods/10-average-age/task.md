importance: 4

---

# دریافت میانگین سن

تابع `getAverageAge(users)` بنویسید که آرایه‌ای از اشیای دارای ویژگی `age` می‌گیرد و میانگین سن را برمی‌گرداند.

فرمول میانگین به این صورت است: `(age1 + age2 + ... + ageN) / N`.

برای مثال:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
