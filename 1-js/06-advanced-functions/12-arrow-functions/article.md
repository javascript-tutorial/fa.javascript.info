# سرکشی دوباره از تابع‌های کمانی

بیایید دوباره سری به تابع‌های کمانی بزنیم.

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

## تابع‌های کمانی "arguments" ندارند

تابع‌های کمانی متغیر `arguments` هم ندارند.

زمانی که در دکوراتور ما باید یک فراخوانی را با `this` کنونی و `arguments` ارسال کنیم عالی است.

برای مثال، `defer(f, ms)` یک تابع دریافت می‌کند و دربرگیرنده‌ای دور آن که فراخوانی را به اندازه `ms` میلی‌ثانیه تاخیر می‌اندازد را برمی‌گرداند:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('سلام، ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // John ،بعد از دو ثانیه: سلام
```

کد یکسان بدون تابع کمانی می‌تواند اینگونه باشد:

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

اینجا ما باید متغیرهای اضافی `args` و `ctx` را ایجاد می‌کردیم تا تابع درون `setTimeout` بتواند آن‌ها را دریافت کند.

## خلاصه

تابع‌های کمانی:

- دارای `this` نیستند
- دارای `arguments` نیستند
- نمی‌توانند همراه با `new` فراخوانی شوند
- همچنین آن‌ها `super` ندارند اما هنوز آن را نخوانده‌ایم. در فصل <info:class-inheritance> آن را خواهیم خواند

به دلیل اینکه آن‌ها برای قطعه‌های کوتاهی از کد در نظر گرفته شده‌اند که «زمینه(context)» خودشان را ندارند و در زمینه کنونی کار می‌کنند. و آن‌ها واقعا در این مورد استفاده می‌درخشند.
