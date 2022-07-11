importance: 5

<<<<<<< HEAD
# تابعی درون if
=======
---
# Function in if
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

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
