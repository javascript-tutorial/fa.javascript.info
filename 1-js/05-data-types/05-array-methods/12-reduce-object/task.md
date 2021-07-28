importance: 4

---

# شیءهای کلیددار از آرایه بسازید

<<<<<<< HEAD
بیایید فرض کنیم که ما یک آرایه از کاربران به شکل `{id:..., name:..., age:... }` دریافت کرده‌ایم.
=======
Let's say we received an array of users in the form `{id:..., name:..., age:... }`.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

یک تابع `groupById(arr)` بسازید که یک شیء از آن ایجاد می‌کند، که `id` به عنوان کلید و المان‌های آرایه به عنوان مقدار موجود هستند.

برای مثال:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// بعد از فراخوانی ما باید این را داشته باشیم:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

چنین تابعی هنگام کار کردن با داده سرور خیلی به کار می‌آید.

در این تکلیف ما فرض می‌کنیم که `id` یکتا است. هیچ دو المانی از آرایه وجود ندارد که `id` یکسانی داشته باشند.

لطفا از متد `.reduce` در راه حل استفاده کنید.
