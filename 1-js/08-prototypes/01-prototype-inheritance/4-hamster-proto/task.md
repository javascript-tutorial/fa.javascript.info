importance: 5

---

# چرا هر دو دو همستر سیر هستند؟
 
ما دو همستر داریم: `speedy` و `lazy` که از شیء عمومی `hamster` ارث‌بری می‌کنند.

زمانی که ما به یکی از آن‌ها غذا می‌دهیم، دیگری هم سیر می‌شود. چرا؟ چگونه می‌توانیم این مشکل را رفع کنیم؟

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// این همستر غذا را پیدا کرد
speedy.eat("سیب");
alert( speedy.stomach ); // سیب

// این همستر هم غذا را دارد، چرا؟ لطفا این را درست کنید.
alert( lazy.stomach ); // سیب
```

