دلیلش این است که تابع سازنده فرزند باید `super()` را فراخوانی کند.

اینجا کد درست را داریم:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("خرگوش سفید"); // الان مشکلی نیست
*/!*
alert(rabbit.name); // خرگوش سفید
```
