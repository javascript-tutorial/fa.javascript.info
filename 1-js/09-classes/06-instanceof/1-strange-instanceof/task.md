importance: 5

---

# یک instanceof عجیب

در ک پایین، چرا `instanceof` مقدار `true` را برمی‌گرداند؟ ما می‌توانیم به راحتی ببینیم که `a` توسط `B()` ساخته نشده است.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
