

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// آن را بررسی کنید
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // بعد از 1 ثانیه 3 را نمایش می‌دهد
```

لطفا توجه کنید: ما در `f.apply` از `this` استفاده کردیم تا کاری کنیم که دکور کردن برای متدهای شیء هم کار کند.

پس اگر تابع دربرگیرنده به عنوان متد شیء فراخوانی شود، سپس `this` به متد اصلی `f` پاس داده می‌شود.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
