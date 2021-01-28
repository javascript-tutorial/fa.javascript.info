جواب: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

محتوان تابع بسته شده تثبیت شده است. هیچ راهی برای تغییر آن وجود ندارد.

پس زمانیکه `user.g()` را اجرا میکنیم٬ تابع اولیه با `this=null` صدا زده میشود.