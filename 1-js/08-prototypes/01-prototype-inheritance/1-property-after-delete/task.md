importance: 5

---

# کار کردن با پروتوتایپ

اینجا کدی داریم که یک جفت از شیءها را ایجاد می‌کند و سپس آن‌ها را تغییر می‌دهد.

کدام مقدار در فرایند نمایش داده می‌شود؟

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

باید 3 جواب وجود داشته باشد.
