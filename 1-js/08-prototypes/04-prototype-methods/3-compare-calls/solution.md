
اولین فراخوانی `this == rabbit` دارد، سایر فراخوانی‌ها `this` برابر با `Rabbit.prototype` دارند، زیرا در واقع شیء قبل از نقطه است.

بنابراین فقط اولین تماس `خرگوش` را نشان می‌دهد، سایر تماس‌ها `undefined` را نشان می‌دهند:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("خرگوش");

rabbit.sayHi();                        // خرگوش
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
