برای اینکه پرانتز دوم کار کند، پرانتز اول باید یک تابع برگرداند.

مانند این:

```js run
function sum(a) {

  return function(b) {
    return a + b; // را از محیط لغوی بیرونی می‌گیرد "a" متغیر
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

