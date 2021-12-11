importance: 3

---

# آیا Class، Object را تعمیم می‌دهد؟

همانطور که می‌دانیم، تمام شیءهای به صورت طبیعی از `Object.prototype` ارث‌بری می‌کنند و به متدهای «عموnode می» مثل `hastOwnProperty` و بقیه آن‌ها دسترسی دارند.

برای مثل:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// است Object.prototype از hasOwnProperty متد
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

اما اگر ما به طور واضح `"class Rabbit extends Object"` را بیان کنیم، سپس نتیجه از یک کلاس ساده `"class Rabbit"` متفاوت خواهد بود؟

تفاوت در چیست؟

اینجا مثالی از چنین کدی داریم (این کد کار نمی‌کند -- چرا؟ آن را درست کنید):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // ارور
```
