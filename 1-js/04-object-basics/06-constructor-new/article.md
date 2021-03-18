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

بیایید دوباره به این موضوع اشاره کنیم -- از لحاظ فنی، هر تابعی می تواند به عنوان سازنده استفاده شود. به این معنی که: هر تابعی می تواند با `new` اجرا شود، و الگوریتم بالا را اجرا کند. "حرف اول بزرگ انگلیسی" یک قرارداد عمومی است، تا اینکه یک تابع باید با `new` اجرا شود را شفاف سازی کند.

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

## Dual-syntax constructors: new.target

```smart header="Advanced stuff"
The syntax from this section is rarely used, skip it unless you want to know everything.
```

Inside a function, we can check whether it was called with `new` or without it, using a special `new.target` property.

It is undefined for regular calls and equals the function if called with `new`:

```js run
function User() {
  alert(new.target);
}

// without "new":
*!*
User(); // undefined
*/!*

// with "new":
*!*
new User(); // function User { ... }
*/!*
```

That can be used to allow both `new` and regular calls to work the same. That is, create the same object:

```js run
function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John
```

This approach is sometimes used in libraries to make the syntax more flexible. So that people may call the function with or without `new`, and it still works.

Probably not a good thing to use everywhere though, because omitting `new` makes it a bit less obvious what's going on. With `new` we all know that the new object is being created.

## Return from constructors

Usually, constructors do not have a `return` statement. Their task is to write all necessary stuff into `this`, and it automatically becomes the result.

But if there is a `return` statement, then the rule is simple:

- If `return` is called with an object, then the object is returned instead of `this`.
- If `return` is called with a primitive, it's ignored.

In other words, `return` with an object returns that object, in all other cases `this` is returned.

For instance, here `return` overrides `this` by returning an object:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object
```

And here's an example with an empty `return` (or we could place a primitive after it, doesn't matter):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- returns this
}

alert( new SmallUser().name );  // John
```

Usually constructors don't have a `return` statement. Here we mention the special behavior with returning objects mainly for the sake of completeness.

````smart header="Omitting parentheses"
By the way, we can omit parentheses after `new`, if it has no arguments:

```js
let user = new User; // <-- no parentheses
// same as
let user = new User();
```

Omitting parentheses here is not considered a "good style", but the syntax is permitted by specification.
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
