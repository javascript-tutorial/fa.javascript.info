بله، امکان دارد.

اگر یک تابع یک شیء را برگرداند سپس `new` آن را به جای `this` برمی گرداند.

پس آنها می توانند، برای مثال، شیء تعریف شده خارجی مشابه را برگردانند. 

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // درست
```
