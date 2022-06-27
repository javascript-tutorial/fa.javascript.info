importance: 5

<<<<<<< HEAD
# تابعی درون if
=======
---
# Function in if
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

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
