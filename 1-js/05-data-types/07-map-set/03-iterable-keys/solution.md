
دلیلش این است که `map.keys()` یک حلقه‌پذیر را برمی‌گرداند نه یک آرایه.

ما می‌توانیم با استفاده از `Array.from` آن را به آرایه تبدیل کنیم:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
