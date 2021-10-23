importance: 5

---

# تابعی که "this" را از دست می‌دهد را تصحیح کنید

فراخوانی `askPassword()` در کد پایین باید رمز یا چک کند و سپس با توجه به جواب `user.loginOk/loginFail` را فراخوانی کند.

اما به ارور برمی‌خورد. چرا؟

خط برجسته شده را تصحیح کند تا همه چیز به درستی کار کند (بقیه خطوط نیازی به تغییر ندارند).

```js run
function askPassword(ok, fail) {
  let password = prompt("رمز؟", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} وارد شد`);
  },

  loginFail() {
    alert(`${this.name} نتوانست وارد شود`);
  },

};

*!*
askPassword(user.loginOk, user.loginFail);
*/!*
```
