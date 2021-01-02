importance: 5

---

# Destructuring assignment

در اینجا یک شی داریم:‌

```js
let user = {
  name: "John",
  years: 30
};
```

یک تخصیص ساختارشکنانه بنویسید که این شرایطرا داشته باشد: 

- `name` را متغیر اختصاص دهد `name`.
- `years` را متغیر اختصاص دهد `age`.
- `isAdmin` را متغیر اختصاص دهد `isAdmin` (false, اگر چنین ویژگی وجود نداشته باشد)

این هم یک مثال از مقدار ها برای اختصاص دادن به متغیرها:‌

```js
let user = { name: "John", years: 30 };

// کدهایتان را زیر این خط بنویسید:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
