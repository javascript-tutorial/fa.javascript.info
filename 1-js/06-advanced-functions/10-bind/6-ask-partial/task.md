importance: 5

---

# برنامه جزیی برای لاگین

سوال نسخه کمی پیچیده تر از <info:task/question-use-bind> است.

شی `user` تغییر کرده است. حال به جای دو تابع `loginOk/loginFail` یک تابع `user.login(true/false)` دارد.

در قطعه کد زیر چه چیزی باید به `askPassword` بدهیم که `user.login(true)` را برای `ok` و `user.login(false)` را برای `fail` صدا بزند؟

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

تغییرات شما باید فقط در قطعه مشخص شده صورت بگیرد.
