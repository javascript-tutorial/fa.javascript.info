
مسلما به درستی کار خواهد کرد.

هر دو تابع تودرتو در محیط لغوی بیرونی یکسانی ساخته شده‌اند پس آنها به متغیر `count` یکسان دسترسی دارند:

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
