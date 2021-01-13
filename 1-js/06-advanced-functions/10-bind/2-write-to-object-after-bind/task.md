importance: 5

---

# بستن یک تابع به عنوان متد

خروجی چه خواهد بود؟

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

