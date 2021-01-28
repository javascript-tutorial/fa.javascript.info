importance: 5

---

# بستن دوم

آیا میتواینم `this` را با یک بستن اضافه تغییر دهیم؟

خروجی چه خواهد بود؟

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

