importance: 5

---

# کجا می‌نویسد؟

ما `rabbit` را داریم که از `animal` ارث‌بری می‌کند.

اگر ما `rabbit.eat()` را فراخوانی کنیم، کدام شیء ویژگی `full` را دریافت می‌کند: `animal` یا `rabbit`؟

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
