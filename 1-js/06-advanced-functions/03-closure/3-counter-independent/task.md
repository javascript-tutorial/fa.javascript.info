importance: 5

---

# آیا شمارنده‌ها مستقل هستند؟

اینجا ما دو شمارنده می‌سازیم: `counter` و `counter2` با استفاده از تابع یکسان `makeCounter`.

آیا آنها مستقل هستند؟ دومین شمارنده چه چیزی را نمایش خواهد داد؟ `0,1` یا `2,3` یا چیز دیگری؟

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

