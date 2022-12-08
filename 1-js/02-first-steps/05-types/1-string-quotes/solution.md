
Backticks عبارت داخل `{...}$` را در رشته قرار می‌دهد.

```js run
let name = "Ilya";

// عبارت، عدد 1 است
alert( `hello ${1}` ); // hello 1

// است "name" عبارت، رشته
alert( `hello ${"name"}` ); // hello name

// عبارت، یک متغیر است، مقدار آن را داخل رشته قرار می‌دهد
alert( `hello ${name}` ); // hello Ilya
```
