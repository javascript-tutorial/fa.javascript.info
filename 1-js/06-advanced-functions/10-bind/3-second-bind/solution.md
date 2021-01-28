جواب: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

شی عجیب [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) را با `f.bind(...)` را برمیگرداند. به یاد داشته باشید که محتوا(و اگر آرگومان ها نیز آماده باشند) فقط بار اول اعمال میشوند.

یک تابع نمیواند دو بار بسته شود.