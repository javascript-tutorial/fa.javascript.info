# مرجع شیء و کپی کردن

یکی از تفاوت‌های اساسی بین شیءها و مقدارهای اصلی(primitives) این است که شیءها "توسط مرجع" ذخیره و کپی می‌شوند، در حالی که مقدارهای اصلی مانند رشته‌ها، اعداد، مقدارهای boolean و غیره، همیشه "به عنوان یک مقدار کلی" ذخیره می‌شوند.

اگر ما بدانیم زمانی که مقداری را کپی می‌کنیم چه اتفاقی می‌افتد، این موضوع را بهتر متوجه می‌شویم.

بیایید با یک مقدار اصلی مانند رشته شروع کنیم.

اینجا ما یک کپی از `message` را درون `phrase` قرار می‌دهیم:

```js
let message = "Hello!";
let phrase = message;
```

در نتیجه ما دو متغیر مستقل داریم که هر کدام رشته‌ی `"Hello!"` را ذخیره می‌کنند.

![](variable-copy-value.svg)

نتیجه خیلی بدیهی است نه؟

شیءها اینگونه نیستند.

**متغیری که یک شیء به آن تخصیص داده شده باشد خود شیء را ذخیره نمی‌کند، بلکه "آدرس آن در حافظه" را ذخیره می‌کند. به عبارتی دیگر "یک مرجع" را ذخیره می‌کنند.**

بیایید به مثالی از چنین متغیری نگاه کنیم:

```js
let user = {
  name: "John"
};
```

اینکه در واقع چگونه ذخیره می‌شود را اینجا گفتیم:

![](variable-contains-reference.svg)

شیء در جایی از حافظه ذخیره شده است (سمت راست تصویر)، در حالی که متغیر `user` (سمت چپ) به شیء "رجوع می‌کند".

می‌توانیم به متغیری که شیءای را ذخیره می‌کند، مانند `user`، به عنوان یک ورق کاغذ که شامل آدرس شیء است نگاه کنیم.

زمانی که ما با شیء کاری انجام می‌دهیم، برای مثال یک ویژگی را می‌گیریم `user.name`، موتور جاوااسکریپت به آدرس نگاه می‌کند که چه چیزی درون آن قرار دارد و عملیات را روی شیء واقعی انجام می‌دهد.

حال دلیل اهمیت آن اینجا آمده است.

**زمانی که یک متغیر حاوی شیء کپی می‌شود، مرجع آن کپی شده‌است نه خود شیء.**

برای مثال:

```js no-beautify
let user = { name: "John" };

let admin = user; // کپی شدن مرجع
```

حالا ما دو متغیر داریم که هر کدام یک مرجع به شیء یکسان را ذخیره می‌کنند:

![](variable-copy-reference.svg)

همانطور که می‌بینید، هنوز یک شیء وجود دارد، اما حالا دو متغیر داریم که به آن رجوع می‌کنند.

برای دسترسی به شیء و تغییر محتوای آن می‌توانیم از هر دو متغیر استفاده کنیم:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // "admin" تغییر داده شده توسط مرجع
*/!*

alert(*!*user.name*/!*); // 'Pete' :هم قابل مشاهده هستند "user" تغییرات توسط مرجع
```

درست مانند این است که ما یک کمد با دو کلید داشته باشیم و با استفاده از یکی از کلیدها (`admin`) آن را باز کنیم و درون آن تغییراتی انجام دهیم. سپس، اگر بعدا از کلید دیگر (`user`) استفاده کردیم، هنوز هم کمد یکسانی را باز کرده‌ایم و به محتوای تغییر داده شده دسترسی داریم.

## مقایسه توسط مرجع

دو شیء تنها در حالتی که یک شیء یکسان باشند برابر هستند.

برای مثال، اینجا `a` و `b` به یک شیء یکسان رجوع می‌کنند، بنابراین برابر هستند:

```js run
let a = {};
let b = a; // کپی کردن مرجع

alert( a == b ); // true :هر دو متغیر به شیء یکسان رجوع می‌کنند پس
alert( a === b ); // true
```

در کد پایین دو شیء مستقل داریم و با اینکه مشابه بنظر می‌رسند اما برابر نیستند (هر دو خالی هستند):

```js run
let a = {};
let b = {}; // دو شیء مستقل

alert( a == b ); // false
```

برای مقایسه‌هایی مانند `obj1 > obj2` یا مقایسه شیء با یک مقدار اصلی `obj == 5`، شیءها به مقدارهای اصلی تبدیل می‌شوند. ما چگونگی تبدیل شیءها را به زودی مطالعه می‌کنیم، اما اگر بخواهیم حقیقت را بگوییم، چنین تبدیل‌هایی به ندرت نیاز می‌شوند -- آنها معمولا به عنوان نتیجه‌ی یک اشتباه برنامه‌نویسی ظاهر می‌شوند. 

## کپی و ادغام کردن، Object.assign [#cloning-and-merging-object-assign]

پس کپی کردن یک متغیر حاوی شیء باعث ساخت یک مرجع اضافی به همان شیء می‌شود.

اما اگر ما نیاز داشته باشیم که چند نسخه از یک شیء بسازیم چه کار کنیم؟ ساخت یک کپی مستقل، یک شیء مشابه؟

این هم شدنی است، اما کمی سخت‌تر است، چون هیچ متد درون‌سازی برای چنین کاری در جاوااسکریپت وجود ندارد. اما نیاز به انجام چنین کاری کم پیش می‌آید و کپی کردن مرجع اکثر اوقات کار مناسبی است.

اگر واقعا چنین چیزی را بخواهیم، باید یک شیء جدید بسازیم و ساختار شیءای که از قبل موجود است را با حلقه زدن بین ویژگی‌های آن و کپی کردن آنها در سطح مقدارهای اصلی، در شیء جدید کپی کنیم.

مانند این کد:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // شیء خالی جدید

// را درون آن کپی کنیم user بیایید تمام ویژگی‌های
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// حال شیء کپی شده یک شیء کاملا مستقل با محتوای یکسان است
clone.name = "Pete"; // تغییر دادن داده‌ی درون آن

alert( user.name ); // است John هنوز در شیء اصلی برابر با
```

همچنین ما می‌توانیم از متد [Object.assign](mdn:js/Object/assign) برای این کار استفاده کنیم.

سینتکس آن اینگونه است:

```js
Object.assign(dest, [src1, src2, src3...])
```

- اولین آرگومان `dest` همان شیء مقصود است.
- آرگومان‌های بعدی `src1, ..., srcN` (ممکن است هر تعدادی باشد) شیءها منبع هستند.
- این متد ویژگی‌های تمام شیءها منبع `src1, ..., srcN` را درون `dest` کپی می‌کند. به عبارتی دیگر، ویژگی‌های تمام آرگومان‌های بعد از دومین آرگومان، درون شیء اول کپی می‌شوند.
- متد صدازده شده `dest` را برمی‌گرداند.

برای مثال، می‌توانیم از این متد برای ادغام چند شیء و ریختن آنها درون یک شیء استفاده کنیم:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// کپی می‌کند user درون permissions2 و permissions1 تمام ویژگی‌ها را از
Object.assign(user, permissions1, permissions2);
*/!*

// user = { name: "John", canView: true, canEdit: true } :حالا داریم
```

اگر ویژگی کپی‌شده از قبل وجود داشته باشد، دوباره مقداردهی می‌شود:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // user = { name: "Pete" } :حالا داریم
```

همچنین می‌توانیم برای کپی کردن‌های ساده از `Object.assign` به جای حلقه‌ی `for..in` استفاده کنیم:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

تمام ویژگی‌های `user` درون شیء خالی کپی و برگردانده می‌شوند.

همچنین متدهای دیگری برای کپی یک شیء وجود دارد مانند استفاده کردن از [سینتکس spread](info:rest-parameters-spread) `clone = {...user}` که بعدا در این آموزش پوشش داده می‌شود.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
