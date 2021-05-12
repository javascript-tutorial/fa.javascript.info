importance: 5

---

# استفاده از "this" در شیء لیترال

در اینجا تابع `makeUser` یک شیء را برمی‌گرداند.

نتیجه دسترسی داشتن به `ref` چیست؟ چرا؟

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // نتیجه چیست؟
```

