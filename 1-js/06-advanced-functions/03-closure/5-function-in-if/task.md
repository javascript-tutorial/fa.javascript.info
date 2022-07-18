importance: 5

<<<<<<< HEAD
# تابعی درون if
=======
---
# Function in if
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

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
