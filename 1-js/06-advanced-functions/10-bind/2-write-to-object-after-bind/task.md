importance: 5

---

# تابع پیوند زده شده به عنوان متد

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

