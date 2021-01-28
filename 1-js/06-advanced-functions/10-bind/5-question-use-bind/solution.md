خطا رخ میدهد زیرا `ask` توابع `liginOk/loginFail` را بدون شی میگرد.

زمانیکه آن ها را صدا میزند٬ آنها طبیعتا `this=undefined` را فرض میکنند.

اجازه دهید محتوا را `bind` کنیم:

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
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

حال این کار میکند.

راه حل جایگزین میتواند این باشد:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

معمولا این نیز کار میکند و خوب بنظر میرسد.

این روش در موارد پیچیده تر مثلا زمانیکه مقادیر `user` *بعد از *‌صدا زدن `askPassword` و *قبل از* اینکه بازدید کننده جواب بدهد و `() => user.loginOk()` را صدا بزند کمتر قابل اعتماد است.
