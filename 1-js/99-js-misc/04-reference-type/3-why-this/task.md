importance: 3

---

# مقدار "this" را تشریح کنید.

در کد زیر قصد داریم متد `()obj.go` را در 4 موقعیت مختلف اجرا کنیم.

ولی پاسخ موقعیت (1) و (2) با موقعیت (3) و (4) متفاوت است. چرا؟

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

