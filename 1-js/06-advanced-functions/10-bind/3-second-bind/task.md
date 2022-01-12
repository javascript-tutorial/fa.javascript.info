importance: 5

---

# متد bind دوم

آیا می‌توانیم با پیوند زدن اضافی `this` را تغییر دهیم؟

خروجی چه خواهد بود؟

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

