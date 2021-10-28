# بازدید دوباره از تابع‌های کمانی

بیایید از تابع‌های کمانی دوباره بازدید کنیم.

تابع‌های کمانی فقط «کوتاه‌نویسی» برای نوشتن چیزهای کوچک نیستند. آن‌ها ویژگی‌هایی خاص و کاربردی دارند.

جاوااسکریپت پر از موقعیت‌هایی است که ما نیاز به نوشتن یک تابع کوچک داریم تا جایی دیگر اجرا شود.

برایی مثال:

- `arr.forEach(func)` -- `func` برای هر المان آرایه توسط `forEach` اجرا می‌شود.
- `setTimeout(func)` -- `func` توسط زمان‌بند درونی اجرا می‌شود.
- ...و چیزهای دیگر

اینکه تابعی را بسازیم و آن را جایی دیگر پاس دهیم در ذات جاوااسکریپت است.

و معمولا ما نمی‌خواهیم زمینه کنونی را درون چنین تابع‌هایی از دست دهیم. اینجا جایی است که تابع‌های کمانی بدرد می‌خورند.

## تابع‌های کمانی "this" ندارند

همانطور که از فصل <info:object-methods> به یاد داریم، تابع‌های کمانی `this` ندارند. اگر به `this` دسترسی پیدا کنیم، از بیرون دریافت می‌شود.

برای مثال، ما می‌توانیم از آن برای حلقه زدن درون یک متد شیء استفاده کنیم:

```js run
let group = {
  title: "گروه ما",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

اینجا درون `forEach`، تابع کمانی استفاده شده است پس `this.title` درون آن انگار دقیقا درون متد بیرونی `showList` است. یعنی: `group.title`.

اگر ما یک تابع «معمولی» استفاده می‌کردیم، یک ارور دریافت می‌کردیم:

```js run
let group = {
  title: "گروه ما",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // را خواند undefined از 'title' ارور: نمی‌توان ویژگی
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

به دلیل اینکه به طور پیش‌فرض `forEach` با `this=undefined` تابع را اجرا می‌کند ارور ایجاد می‌شود پس سعی می‌شود که `undefined.title` دریافت شود.

این موضوع روی تابع‌های کمانی تاثیری ندارد چون آن‌ها `this` ندارند.

```warn header="تابع‌های کمانی نمی‌توانند با `new` اجرا شوند"
نداشتن `this` به طور طبیعی به معنی محدودیت دیگری هم هست: تابع‌های کمانی نمی‌توانند به عنوان سازنده استفاده شوند. آن‌ها نمی‌توانند با `new` فراخوانی شوند.
```

```smart header="تابع‌های کمانی در مقابل bind"
یک تفاوت جزئی بین یک تابع کمانی `<=` و یک تابع معمولی که با `.bind(this)` فراخوانی شده وجود دارد:

- `.bind(this)` یک «نسخه پیوند زده شده» از تابع را می‌سازد.
- کمان `<=` چیزی را پیوند نمی‌زند. تابع حقیقتا `this` ندارد. جست‌و‌جوی `this` درست مانند جست‌و‌جوی یک متغیر معمولی انجام می‌شود: در محیط لغوی بیرونی.
```

## Arrows have no "arguments"

Arrow functions also have no `arguments` variable.

That's great for decorators, when we need to forward a call with the current `this` and `arguments`.

For instance, `defer(f, ms)` gets a function and returns a wrapper around it that delays the call by `ms` milliseconds:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
```

The same without an arrow function would look like:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

Here we had to create additional variables `args` and `ctx` so that the function inside `setTimeout` could take them.

## Summary

Arrow functions:

- Do not have `this`
- Do not have `arguments`
- Can't be called with `new`
- They also don't have `super`, but we didn't study it yet. We will on the chapter <info:class-inheritance>

That's because they are meant for short pieces of code that do not have their own "context", but rather work in the current one. And they really shine in that use case.
