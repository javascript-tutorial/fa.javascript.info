importance: 5

---

# مرتب‌سازی براساس حوزه

ما یک ارایه از شیءها را برای مرتب‌سازی دریافت کرده‌ایم:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

راه معمولی برای انجام آن می‌تواند این باشد:

```js
// (Ann، John، Pete) براساس اسم
users.sort((a, b) => a.name > b.name ? 1 : -1);

// (Pete، Ann، John) براساس سن
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

آیا می‌توانیم آن را کوتاه‌تر کنیم، مثلا اینگونه؟

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

پس به جای اینکه یک تابع بنویسیم، فقط `byField(fieldName)` را قرار می‌دهیم.

تابع `byField` را بنویسید که می‌تواند برای این کار استفاده شود.
