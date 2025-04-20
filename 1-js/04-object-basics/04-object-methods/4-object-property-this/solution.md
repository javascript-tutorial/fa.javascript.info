**جواب: یک ارور**

آن را امتحان کنید:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

دلیلش این است که قواعدی که `this` را تشکیل می‌دهند به تعریف شیء نگاه نمی‌کنند. فقط لحظه‌ی صدازدن مهم است.

اینجا مقدار `this` درون `makeUser()` برابر با `undefined` است، چون به عنوان تابع صدا زده شده است نه به عنوان یک متد با سینتکس نقطه.

مقدار `this` برای تمام تابع یکی است و بلوک‌های کد و شیءهای لیترال روی آن تاثیری نمی‌گذارند.

بنابراین `ref: this` در واقع `this` کنونی تابع را می‌گیرد.

ما می‌توانیم تابع را بازنویسی کنیم و `this` یکسان را با مقدار `undefined` برگردانیم:

```js run
function makeUser(){
  return this; // این بار هیچ شیء لیترالی وجود ندارد
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
همانطور که می‌بینید نتیجه `alert( makeUser().name )` با نتیجه `alert( user.ref.name )` از مثال قبل یکسان است.

کد پایین متضاد قبلی است:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

حالا کار می‌کند، چون `user.ref()` یک متد است. مقدار `this` برابر با شیء قبل از نقطه `.` است.
