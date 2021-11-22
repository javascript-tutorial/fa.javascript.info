importance: 5

---

# تفاوت بین فراخوانی‌ها

بیایید یک شیء `rabbit` جدید ایجاد کنیم:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("خرگوش");
```

این فراخوانی‌ها همین کار را می‌کنند یا نه؟

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
