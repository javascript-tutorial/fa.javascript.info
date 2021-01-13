importance: 5

---

# تعمیر یک تابع که "this" را از دست داده

صدا زدن `askPassword()` در کد زیر باید به گونه ای باشد که کلمه عبور را بررسی کند و با توجه به جواب `user.loginOk/liginFail` را اجرا کند.

ولی این باعث بروز یک خطا میشود٬ چرا؟

خط های مشخص شده را درست کنید تا همه چیز برای شروع کار آماده شوند.(خط های دیگر نباید تغییر کنند)

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk, user.loginFail);
*/!*
```
