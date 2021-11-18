اگر مطمئن باشیم که ویژگی `"constructor"` مقدار صحیحی دارد، می‌توانیم از چنین رویکردی استفاده کنیم.

برای مثال، اگر `"prototype"` پیش‌فرض را تغییر ندهیم، این کد مطمئناً کار می‌کند:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (کار کرد!)
```

کار کرد، زیرا `User.prototype.constructor == User`. 

..اما اگر شخصی، به اصطلاح، `User.prototype` را بازنویسی کند و فراموش کند `constructor` را برای ارجاع به `User` بازآفرینی کند، آنگاه شکست خواهد خورد.

برای مثال:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

چرا `user2.name` برابر با `undefined` است؟

در اینجا نحوه عملکرد `new user.constructor('Pete')` وجود دارد:

1. ابتدا، به دنبال `constructor` در `user` می‌گردد. هیچ چیز.
2. سپس از زنجیره پروتوتایپ پیروی می‌کند. پروتوتایپ `user` برابر با `User.prototype` است، و همچنین `constructor` ندارد (زیرا ما «فراموش کردیم» آن را درست تنظیم کنیم!).
3. در ادامه زنجیره، `User.prototype` یک شیء ساده است، پروتوتایپ آن `Object.prototype` داخلی است.
4. در نهایت، برای `Object.prototype` داخلی، `Object.prototype.constructor == Object` داخلی وجود دارد. بنابراین استفاده می‌شود.

سر‌انجام، در پایان، `let user2 = new Object('Pete')` را داریم.

احتمالاً این چیزی نیست که ما می‌خواهیم. ما می‌خواهیم `new User` ایجاد کنیم، نه `new Object`. این نتیجه `constructor` گم شده است.

(فقط در صورتی که کنجکاو باشید، فراخوانی `new Object(...)` آرگومان خود را به یک شیء تبدیل می‌کند. این یک چیز تئوری است، در عمل هیچ کس `new Object` را با مقدار نمی‌نامد، و عموما ما اصلاً از `new Object` برای ساختن اشیا استفاده نمی‌کنیم).