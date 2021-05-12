importance: 2

---

# زنجیره‌ای

یک شیء `ladder` وجود دارد که بالا و پایین رفتن را ممکن می‌کند:

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

حال اگر ما نیاز داشته باشیم که برای چند بار متوالی صدا بزنیم، می‌توانیم اینگونه این کار را انجام دهیم:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

کد `up`، `down` و `showStep` را تغییر دهید تا صدازدن‌ها را زنجیره‌ای کنید، مثل این:

```js
ladder.up().up().down().showStep(); // 1
```

چنین روشی در بین کتابخانه‌های جاوااسکریپت به طور گسترده استفاده می‌شود.
