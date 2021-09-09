importance: 5

---

# شیء شمارنده

اینجا یک شیء شمارنده با کمک تابع سازنده ساخته شده است.

آیا کار می‌کند؟ چه چیزی را نمایش خواهد داد؟

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

