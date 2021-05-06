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

alert(*!*user.name*/!*); // 'Pete'، هم قابل مشاهده هستند "user" تغییرات توسط مرجع
```

درست مانند این است که ما یک کمد با دو کلید داشته باشیم و با استفاده از یکی از کلیدها (`admin`) آن را باز کنیم و درون آن تغییراتی انجام دهیم. سپس، اگر بعدا از کلید دیگر (`user`) استفاده کردیم، هنوز هم کمد یکسانی را باز کرده‌ایم و به محتوای تغییر داده شده دسترسی داریم.

## Comparison by reference

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though they look alike (both are empty):

```js run
let a = {};
let b = {}; // two independent objects

alert( a == b ); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- The first argument `dest` is a target object.
- Further arguments `src1, ..., srcN` (can be as many as needed) are source objects.
- It copies the properties of all source objects `src1, ..., srcN` into the target `dest`. In other words, properties of all arguments starting from the second are copied into the first object.
- The call returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the copied property name already exists, it gets overwritten:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to replace `for..in` loop for simple cloning:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

It copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

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
