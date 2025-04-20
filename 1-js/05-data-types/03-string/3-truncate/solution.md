بیشترین طول باید `maxlength` باشد، پس ما نیاز داریم که آن را کمتر کنیم، تا برای کاراکتر حذف جا باز شود.

در نظر داشته باشید در واقع یک کاراکتر Unicode برای کاراکتر حذف وجود دارد. این کاراکتر سه نقطه نیست.

```js run
function truncate(str, maxlength) {
  return (str.length > maxlength) ? 
    str.slice(0, maxlength - 1) + '…' : str;
}
```

