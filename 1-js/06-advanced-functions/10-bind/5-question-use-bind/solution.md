
<<<<<<< HEAD
به دلیل اینکه `ask` تابع‌های `loginOk/loginFail` را بدون شیء دریافت می‌کند ارور ایجاد می‌شود.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

زمانی که این تابع آن‌ها را فرا می‌خواند، به طور طبیعی آن‌ها `this=undefined` را فرض می‌کنند.

بیایید زمینه را با `bind` پیوند بزنیم:

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
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

حالا کار می‌کند.

راه‌حل جایگزین می‌تواند این باشد:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

معمولا این راه‌حل هم کار می‌کند و ظاهر خوبی دارد.

اگرچه این کد در موقعیت‌های پیچیده‌تر کمتر قابل اطمینان است، زمانی که متغیر `user` ممکن است *بعد از* اینکه `askPassword` فراخوانی شود و *قبل از* اینکه کاربر جواب بدهد و `() => user.loginOk()` را فرا بخواند، تغییر کند.
