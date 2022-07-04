importance: 5

<<<<<<< HEAD
# تابعی درون if
=======
---
# Function in if
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

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
