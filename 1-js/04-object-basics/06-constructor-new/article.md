# سازنده ، اپراتور "new"

سینتکس معمولی {...} اجازه ساخت یک شیء را می دهد. اما غالبا ما نیاز داریم که شیء های متشابه زیادی ایجاد کنیم، مثل چند کاربر یا آیتم های منو و... 

این می تواند با استفاده از تابع های سازنده و اپراتور `new` انجام شود.

## تابع سازنده

تابع های سازنده از لحاظ فنی همان تابع های معمولی هستند. با این حال دو قرارداد وجود دارد:

1. آنها با حرف بزرگ انگلیسی نامگذاری می شوند.
2. آنها باید فقط با اپراتور `new` اجرا شوند.

برای مثال:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // نادرست
```

زمانی که یک تابع با `new` اجرا می شود، مراحل زیر را انجام می دهد:

1. یک شیء خالی جدید ساخته می شود و به `this` اختصاص می یابد.
2. بدنه ی تابع اجرا می شود. معمولا `this` را تغییر می دهد، ویژگی های جدید را به آن اضافه می کند.
3. مقدار `this` برگردانده می شود.

به عبارتی دیگر، `new User(...)` چیزی مانند این را انجام می دهد:

```js
function User(name) {
*!*
  // this = {};  (به صورت ضمنی)
*/!*

  // add properties to this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (به صورت ضمنی)
*/!*
}
```

پس `let user = new User("Jack")` نتیجه مشابهی مانند کد زیر را می دهد:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

حالا اگر ما بخواهیم که user های دیگری بسازیم، می توانیم `new User("Ann")` ، `new User("Alice")` و ... را صدا بزنیم. این کار بسیار کوتاه تر از استفاده همیشگی از literal ها است، و همچنین برای خواندن آسان است.

این هدف اصلی سازنده ها است -- پیاده سازی کد قابل استفاده مجدد ساخت شیء.

بیایید دوباره به این موضوع اشاره کنیم -- از لحاظ فنی، هر تابعی می تواند به عنوان سازنده استفاده شود. به این معنی که: هر تابعی می تواند با `new` اجرا شود، و الگوریتم بالا را اجرا کند. "حرف اول بزرگ انگلیسی" یک قرارداد عمومی است، تا این موضوع را که یک تابع باید با `new` اجرا شود را شفاف سازی کند.

````smart header="new function() { ... }"
اگر ما خطوط زیادی از کد که همه آنها مربوط به ساخت یک شیء پیچیده هستند را داشته باشیم، می توانیم آنها را درون تابع سازنده بپیچیم، به این صورت:


```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ... کد های دیگر برای ساخت user
  // شاید شامل منطق و دستورالعمل عجیبی باشد
  // متغیرهای محلی و...
};
```

سازنده نمی تواند دوباره صدا زده شود، چون در جایی ذخیره نشده، فقط ساخته و صدا زده شده است. پس این ترفند، کپسول کردن کدی که یک شیء می سازد و در آینده استفاده نمی شود را مورد هدف قرار می دهد.
````

## سازنده هایی با سینتکس دوگانه: new.target

```smart header="مطالب پیشرفته"
سینتکس این بخش به ندرت استفاده می شود، آن را از قلم بندازید مگر اینکه بخواهید همه چیز را بدانید.
```

درون یک تابع، ما می توانیم چک کنیم که همراه با `new` صدا زده شده یا بدون آن، با استفاده از ویژگی `new.target`.

آن(new.target) برای مواقعی که تابع به صورت معمولی صدا زده می شود undefined است و درصورتی که همراه با `new` صدا زده شود برابر با تابع است:

```js run
function User() {
  alert(new.target);
}

// بدون "new":
*!*
User(); // undefined
*/!*

// همراه با "new":
*!*
new User(); // function User { ... }
*/!*
```

از آن می  توان استفاده کرد تا هم صدا زدن تابع با `new` و هم صدا زدن معمولی تابع به یک شکل کار کنند. یعنی اینکه شیء متشابه بسازند:

```js run
function User(name) {
  if (!new.target) { // اگر تو مرا بدون new اجرا کنی
    return new User(name); // ... من new را برای تو اضافه میکنم
  }

  this.name = name;
}

let john = User("John"); // فراخوانی را به new User هدایت میکند
alert(john.name); // John
```

این شیوه بعضی اوقات درون کتابخانه ها استفاده می شود تا سینتکس را منعطف تر کند. با این روش شاید مردم تابع را همراه با یا بدون `new` صدا بزنند، و آن همچنان کار میکند.

اگرچه شاید خوب نباشد همه جا استفاده شود، چون حذف کردن `new` مقداری از واضح بودن اینکه چه چیزی در حال رخ دادن است کم میکند. همراه با `new` همه ما میدانیم که شیء جدیدی در حال ساخته شدن است.

## برگرداندن از سازنده ها

معمولا، سازنده ها دستور `return` ندارند. وظیفه آنها این است که تمام چیزهای ضروری را داخل `this` بریزند، و آن(this) تبدیل به نتیجه می شود.

اما اگر دستور `return` وجود داشته باشد، سپس قاعده ساده است:

- اگر `return` همراه با شیء صدا زده شود، سپس شیء به جای `this` برگردانده می شود.
- اگر `return` همراه با یک primitive صدا شده شود، نادیده گرفته می شود.

به عبارتی دیگر، `return` همراه با یک شیء همان شیء را برمیگرداند، در دیگر موارد `this` برگردانده می شود.

برای مثال، اینجا `return` با برگرداندن یک شیء `this` را نادیده میگیرد:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- این شیء را برمیگرداند
}

alert( new BigUser().name );  // Godzilla, آن شیء را نتیجه داد
```

و اینجا هم یک مثال با یک `return` خالی داریم (یا می توانستیم بعد از آن یک primitive بگذاریم، فرقی ندارد): 

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- this را برمیگرداند
}

alert( new SmallUser().name );  // John
```

معمولا سازنده ها دستور `return` ندارند. اینجا ما این رفتار خاص برگرداندن شیء ها را تنها برای کامل بودن خاطر نشان کردیم.

````smart header="پنهان کردن پرانتزها"
راستی، اگر هیچ آرگومانی در کار نباشد، ما می توانیم پرانترهای بعد از `new` را پنهان کنیم:

```js
let user = new User; // <-- بدون پرانتر
// مشابه است با
let user = new User();
```

اینجا پنهان کردن پرانتزها به عنوان یک "سبک خوب" فرض نمی شود، اما سینتکس طبق خصوصیات مجاز است.
````

## Methods in constructor

Using constructor functions to create objects gives a great deal of flexibility. The constructor function may have parameters that define how to construct the object, and what to put in it.

Of course, we can add to `this` not only properties, but methods as well.

For instance, `new User(name)` below creates an object with the given `name` and the method `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

To create complex objects, there's a more advanced syntax, [classes](info:classes), that we'll cover later.

## Summary

- Constructor functions or, briefly, constructors, are regular functions, but there's a common agreement to name them with capital letter first.
- Constructor functions should only be called using `new`. Such a call implies a creation of empty `this` at the start and returning the populated one at the end.

We can use constructor functions to make multiple similar objects.

JavaScript provides constructor functions for many built-in language objects: like `Date` for dates, `Set` for sets and others that we plan to study.

```smart header="Objects, we'll be back!"
In this chapter we only cover the basics about objects and constructors. They are essential for learning more about data types and functions in the next chapters.

After we learn that, in the chapter <info:object-oriented-programming> we return to objects and cover them in-depth, including inheritance and classes.
```
