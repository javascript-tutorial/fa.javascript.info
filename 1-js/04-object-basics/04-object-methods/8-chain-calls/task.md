importance: 2

---

# زنجیره‌ای

<<<<<<< HEAD
یک شیء `ladder` وجود دارد که بالا و پایین رفتن را ممکن می‌کند:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // قدم کنونی را نشان می‌دهد
    alert( this.step );
  }
};
```

<<<<<<< HEAD
حال اگر ما نیاز داشته باشیم که برای چند بار متوالی صدا بزنیم، می‌توانیم اینگونه این کار را انجام دهیم:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
کد `up`، `down` و `showStep` را تغییر دهید تا صدازدن‌ها را زنجیره‌ای کنید، مثل این:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
ladder.up().up().down().showStep().down().showStep(); // اول 1 را نشان می‌دهد سپس 0 را
```

<<<<<<< HEAD
چنین روشی در بین کتابخانه‌های جاوااسکریپت به طور گسترده استفاده می‌شود.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
