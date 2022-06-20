importance: 5

<<<<<<< HEAD
# تابعی درون if
=======
---
# Function in if
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

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
