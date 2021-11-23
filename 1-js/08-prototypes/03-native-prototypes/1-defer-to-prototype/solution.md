

```js run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Hello!");
}

f.defer(1000); // را نشان می‌دهد "Hello!" بعد از 1 ثانیه
```
