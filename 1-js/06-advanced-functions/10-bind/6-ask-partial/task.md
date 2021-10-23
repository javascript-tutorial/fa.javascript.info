importance: 5

---

# کاربرد تابع جزئی برای وارد شدن
 
این تمرین نوع پیچیده‌تر <info:task/question-use-bind> است.

شیء `user` تغییر داده شد. حالا به جای دو تابع `loginOk/loginFail`، یک تابع `user.login(true/false)` دارد.

برای اینکه `askPassword` در کد پایین، تابع `user.login(true)` را به عنوان `ok` و `user.login(false)` را به عنوان `fail` فراخوانی کند باید چه کار کنیم؟

```js
function askPassword(ok, fail) {
  let password = prompt("رمز؟", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' وارد شد' : ' نتوانست وارد شود') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

تغییرات شما فقط باید قطعه برجسته شده را تغییر دهد.

