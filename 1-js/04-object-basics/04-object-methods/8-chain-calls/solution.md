راه حل این است که خود شیء را با هربار صدازدن برگردانیم.

```js run
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

همچنین می‌توانیم به ازای هر خط یک بار صدا بزنیم. برای زنجیره‌های طولانی این روش خوانایی بیشتری دارد:

```js 
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```
