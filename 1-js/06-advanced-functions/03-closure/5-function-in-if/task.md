importance: 5

---
# تابعی درون if

به کد زیر نگاه بیاندازید. نتیجه فراخوانی در خط اخر چه چیزی خواهد بود؟

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```