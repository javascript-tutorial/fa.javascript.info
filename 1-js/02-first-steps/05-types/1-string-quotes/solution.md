
Backtick ها می‌توانند عبارات جاوا اسکریپتی را در یک رشته کاراکتر قرار دهند.

```js run
let name = "Ilya";

// the expression is a number 1
alert( `hello ${1}` ); // hello 1

// the expression is a string "name"
alert( `hello ${"name"}` ); // hello name

// the expression is a variable, embed it
alert( `hello ${name}` ); // hello Ilya
```
