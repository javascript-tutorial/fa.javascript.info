جواب: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

شیء بیگانه [تابع پیوند زده شده](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) که توسط `f.bind(...)` برگردانده شده، زمینه (و در صورت قرار دادن، آرگومان‌ها) را فقط در زمان ایجاد شدن به یاد می‌سپارد.

یک تابع نمی‌تواند دوباره پیوند زده شود.
