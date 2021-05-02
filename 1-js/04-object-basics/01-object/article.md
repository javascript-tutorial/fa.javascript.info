
# شیءها

همانطور که از فصل <info:types> می‌دانیم، 8 نوع داده در جاوااسکریپت وجود دارد. 7 مورد "اولیه یا اصلی" نامیده می‌شوند، به این دلیل که مقدارهای آنها فقط دارای یک چیز است (رشته یا عدد یا هر چیزی).

در مقابل، شیءها برای ذخیره‌سازی مجموعه‌ای از داده‌های گوناگون و چیزهای پیچیده‌تر استفاده می‌شوند. در جاوااسکریپت، شیءها تقریبا به تمام جنبه‌های زبان نفوذ کرده‌اند. پس ما باید قبل از اینکه عمیقا به موضوع دیگری وارد شویم شیءها را بشناسیم.

یک شیء می‌تواند با آکولادها `{...}` و همراه یک لیست اختیاری از *ویژگی‌ها(property)* ساخته شود. یک ویژگی یعنی یک جفت از "key: value"، که در آن `key` یک رشته است (به آن "اسم ویژگی" هم می‌گویند) و `value` هر چیزی می‌تواند باشد.

می‌توانیم یک شیء را به عنوان یک قفسه‌ی دارای پرونده‌های علامت‌دار فرض کنیم. هر داده در پرونده‌ی خودش توسط key ذخیره شده است. پیدا کردن یا حذف/اضافه کردن یک پرونده با اسم آن راحت می‌شود.

![](object.svg)

یک شیء خالی یا empty ("قفسه خالی") می‌تواند با استفاده از دو سینتکس ساخته شود:

```js
let user = new Object(); // "سینتکس "سازنده شیء
let user = {};  // "سینتکس "شیء لیترال
```

![](object-user-empty.svg)

معمولا، سینتکس آکولاد استفاده می‌شود. یک شیء که به این صورت تعریف شده باشد را *شیء لیتِرال* می‌نامند.

## لیترال‌ها و ویژگی‌ها

ما می‌توانیم بلافاصله ویژگی‌هایی را به صورت جفت‌هایی از "key: value" داخل `{...}` قرار دهیم:

```js
let user = {     // یک شیء
  name: "John",  // را ذخیره کنید "John" مقدار "name" توسط
  age: 30        // مقدار 30 را ذخیره کنید "age" توسط
};
```

یک ویژگی، قبل از `":"` دارای یک key (همچنین به عنوان "اسم" یا "شناسه" هم شناخته می‌شود) و یک مقدار در سمت راست دو نقطه است.

در شیء `user`، دو ویژگی وجود دارد:

1. اولین ویژگی، اسم `"name"` و مقدار `"John"` را دارد.
2. دومین ویژگی، اسم `"age"` و مقدار `30` را دارد.

شیء `user` بدست آمده می‌تواند به عنوان یک قفسه با دو پرونده‌ی علامت دار با برچسب‌های "name" و "age" فرض شود.

![user object](object-user.svg)

ما می‌توانیم در هر زمانی پرونده‌ها را اضافه یا کم کنیم یا آنها را بخوانیم.

مقدارهای ویژگی‌ها با استفاده از نقطه قابل دسترسی هستند:

```js
// مقدارهای ویژگی‌های شیء را دریافت کنید:
alert( user.name ); // John
alert( user.age ); // 30
```

مقدار می‌تواند هر چیزی باشد. بیایید یک مقدار از نوع boolean اضافه کنیم:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

برای حذف یک ویژگی، از عملگر `delete` استفاده می‌کنیم:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

همچنین می‌توانیم از اسم‌های چند کلمه‌ای برای ویژگی استفاده کنیم، اما آنها باید درون کوتیشن قرار بگیرند:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // اسم‌های چند کلمه‌ایِ ویژگی باید درون کوتیشن باشند
};
```

![](object-user-props.svg)


آخرین ویژگی درون لیست هم می‌تواند با کاما پایان یابد:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
به این کامای "دنباله‌دار" یا "معلق" می‌گویند. این کاما اضافه/حذف/کار کردن با ویژگی‌ها را آسان‌تر می‌کند، چون همه‌ی خطوط یکسان می‌شوند.

## براکت‌ها

برای ویژگی‌های چند کلمه‌ای، دسترسی داشتن با نقطه ممکن نیست:

```js run
// این یک ارور سینتکسی می‌دهد
user.likes birds = true
```

جاوااسکریپت چنین چیزی را متوجه نمی‌شود. فکر می‌کند ما `user.likes` را مد نظر داریم، و سپس وقتی با کلمه غیرمنتظره‌ی `birds` روبرو می‌شود ارور سینتکسی می‌دهد.

نقطه نیاز دارد که key یک شناسه‌ی معتبر متغیر باشد. به این معنی که: هیچ فاصله‌ای بین آن نباشد، با عدد شروع نشود و شامل کاراکترهای خاص نباشد (`$` و `_` مجاز هستند).

یک شیوه‌ی جایگزین به نام "براکت" وجود دارد که با هر رشته‌ای کار می‌کند:

```js run
let user = {};

// ایجاد کردن
user["likes birds"] = true;

// دریافت کردن
alert(user["likes birds"]); // true

// حذف کردن
delete user["likes birds"];
```

حالا همه چیز درست است. لطفا در نظر داشته باشید که رشته درون براکت‌ها به درستی درون کوتیشن قرار گرفته باشد (هر نوع کوتیشنی قابل قبول است).

براکت‌ها، بدست آوردن اسم ویژگی از نتیجه‌ی یک عبارت را هم فراهم می‌کنند، یعنی یک رشته‌ی ثابت نباشد، مثلا از یک متغیر که به این شکل انجام می‌گیرد:

```js
let key = "likes birds";

// user["likes birds"] = true; مشابه است با
user[key] = true;
```

اینجا، متغیر `key` شاید هنگام اجرای کد بدست آید یا وابسته به چیزی که کاربر وارد می‌کند باشد. سپس ما از آن برای دسترسی به ویژگی استفاده می‌کنیم. استفاده از براکت به ما انعطاف خیلی زیادی می‌دهد.

برای مثال:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("چه چیزی را می‌خواهید درباره کاربر بدانید؟", "name");

// دسترسی توسط متغیر
alert( user[key] ); // John :وارد شود "name" اگر
```

نقطه نمی‌تواند به این شکل استفاده شود:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### ویژگی‌های محاسباتی

ما می‌توانیم زمانی که یک شیء لیترال تعریف می‌کنیم، از براکت‌ها درون آن استفاده کنیم. این کار سبب ایجاد *ویژگی‌های محاسباتی* می‌شود.

برای مثال:

```js run
let fruit = prompt("قصد خرید کدام میوه را دارید؟", "apple");

let bag = {
*!*
  [fruit]: 5, // گرفته می‌شود fruit اسم ویژگی از متغیر
*/!*
};

alert( bag.apple ); // 5 :باشد fruit="apple" اگر
```

معنی ویژگی محاسباتی ساده است: `[fruit]` به این معنی است که اسم ویژگی باید از متغیر `fruit` گرفته شود.

بنابراین اگر یک بازدیدکننده `"apple"` را وارد کند، `bag` اینگونه خواهد شد: `{apple: 5}`.

در اصل، کد بالا مانند کد پایین کار می‌کند:
```js run
let fruit = prompt("قصد خرید چه میوه‌ای دارید؟", "apple");
let bag = {};

// گرفته می‌شود fruit اسم ویژگی از متغیر
bag[fruit] = 5;
```

...اما زیباتر به نظر می‌رسد.

ما می‌توانیم از عبارات پیچیده‌تری درون براکت استفاده کنیم:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

براکت‌ها قدرت بسیار بیشتری نسبت به نقطه دارند. آنها هر نوع اسم ویژگی و متغیر را ممکن می‌سازند. اما آنها برای نوشتن سخت‌تر هستند.

پس اکثر اوقات، زمانی که اسم‌های ویژگی‌ها شناخته شده و ساده هستند، نقطه استفاده می‌شود. اگر ما به چیزی پیچیده‌تر نیاز داشته باشیم، سپس به سراغ براکت‌ها می‌رویم.

## نوشتن مختصر مقدار ویژگی

در کدنویسی واقعی معمولا نیاز داریم که از متغیرهای موجود به عنوان مقدار برای ویژگی‌ها استفاده کنیم.

برای مثال:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...ویژگی‌های دیگر
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

در مثال بالا، وِیژگی‌ها اسمی مشابه با متغیرها دارند. این موضوع که یک ویژگی را از یک متغیر بسازیم بسیار رایج است، به همین دلیل یک *خلاصه‌نویسی مقدار ویژگی* برای کوتاه‌تر کردن آن وجود دارد.

به جای `name: name` می‌توانیم فقط بنویسیم `name`، مثل کد پایین:

```js
function makeUser(name, age) {
*!*
  return {
    name, // name: name مشابه با
    age,  // age: age مشابه با
    // ...
  };
*/!*
}
```

ما می‌توانیم در یک شیء، هم از خلاصه‌نویسی استفاده کنیم هم از ویژگی‌های نرمال:

```js
let user = {
  name,  // name: name مشابه با
  age: 30
};
```


## Property names limitations

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"
```

There's also a special operator `"in"` for that.

The syntax is:
```js
"key" in object
```

For instance:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
```

Please note that on the left side of `in` there must be a *property name*. That's usually a quoted string.

If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.

It's when an object property exists, but stores `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!
```

In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.


## The "for..in" loop

To walk over all keys of an object, there exists a special form of the loop: `for..in`. This is a completely different thing from the `for(;;)` construct that we studied before.

The syntax:

```js
for (key in object) {
  // executes the body for each key among object properties
}
```

For instance, let's output all properties of `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

Note that all "for" constructs allow us to declare the looping variable inside the loop, like `let key` here.

Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.

### Ordered like an object

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

The short answer is: "ordered in a special fashion": integer properties are sorted, others appear in creation order. The details follow.

As an example, let's consider an object with the phone codes:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

The object may be used to suggest a list of options to the user. If we're making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture:

- USA (1) goes first
- then Switzerland (41) and so on.

The phone codes go in the ascending sorted order, because they are integers. So we see `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
The "integer property" term here means a string that can be converted to-and-from an integer without a change.

So, "49" is an integer property name, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not:

```js run
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
```
````

...On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

*!*
// non-integer properties are listed in the creation order
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

So, to fix the issue with the phone codes, we can "cheat" by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Now it works as intended.

## Summary

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

What we've studied in this chapter is called a "plain object", or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- ...And so on.

They have their special features that we'll study later. Sometimes people say something like "Array type" or "Date type", but formally they are not types of their own, but belong to a single "object" data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
