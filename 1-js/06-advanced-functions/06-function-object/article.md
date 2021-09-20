
# شیء تابع، NFE

همانطور که می‌دانیم، یک تابع در جاوااسکریپت یک مقدار است.

هر مقداری در جاوااسکریپت نوع دارد. تابع از چه نوعی است؟

در جاوااسکریپت، تابع‌ها شیء هستند.

یک راه خوب برای تصور کردن تابع‌ها، فکر کردن به آنها به عنوان «شیءهای عملکردی» قابل فراخوانی است. ما نه تنها می‌توانیم آنها را فرا بخوانیم بلکه می‌توانیم با آنها مانند شیءها رفتار کنیم: ویژگی‌ها را اضافه/حذف کنیم، آنها را توسط مرجع رد و بدل کنیم و غیره.


## ویژگی "name"

شیء تابع‌ها چند ویژگی قابل استفاده دارند.

برای مثال، اسم یک تابع با ویژگی "name" قابل دسترس است:

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

منطق مقداردهی اسم، هوشمندانه و جالب است. حتی زمانی که یک تابع بدون اسم ساخته و سریعا تخصیص داده شود، اسم درستی را برای مقداردهی استفاده می‌کند:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (!یک اسم دارد)
```

اگر مقداردهی توسط یک مقدار پیش‌فرض انجام شود هم کار می‌کند:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (!کار می‌کند)
}

f();
```

در مشخصات، این خاصیت «اسم زمینه‌ای» نامیده شده است. اگر تابع اسمی نداشته باشد، سپس در مقداردهی، از زمینه موجود پیدا می‌شود.

متدهای شیءها هم اسم دارند:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

اگرچه هیچ جادویی وجود ندارد. مواردی وجود دارند که راهی برای فهمیدن اسم درست وجود ندارد. در این صورت، ویژگی اسم (name) خالی است، مثل اینجا:

```js run
// تابع درون آرایه ساخته شده است
let arr = [function() {}];

alert( arr[0].name ); // <رشته خالی>
// موتور راهی برای دریافت اسم درست ندارد، پس هیچی وجود ندارد
```

اگرچه در عمل، اکثر تابع‌ها اسم دارند.

## ویژگی "length"

یک ویژگی درون‌ساخت دیگر به نام "length" وجود دارد که تعداد پارامترهای تابع را برمی‌گرداند، برای مثال:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

اینجا می‌بینیم که پارامترهای رِست شمرده نمی‌شوند.

ویژگی `length` بعضی اوقات برای [درون‌نگری](https://en.wikipedia.org/wiki/Type_introspection) در تابع‌هایی که بر روی تابع‌های دیگر کاری انجام می‌دهند استفاده می‌شود.

برای مثال، در کد زیر تابع `ask` یک `question` (سوال) برای پرسیدن و تعدادی تابع `handler` (کنترل‌کننده) برای فراخوانی دریافت می‌کند.

زمانی که کاربر جواب خود را وارد کرد، تابع کنترل‌کننده‌ها را فراخوانی می‌کند. ما می‌توانیم دو نوع کنترل‌کننده را رد کنیم:

- یک تابع با صفر آرگومان که فقط زمانی که کاربر یک جواب مثبت می‌دهد فراخوانی شود.
- یک تابع با چند آرگومان که در هر شرایطی فراخوانی می‌شود و یک جواب برمی‌گرداند.

برای اینکه `handler` را به درستی فراخوانی کنیم، ویژگی `handler.length` را بررسی می‌کنیم.

ایده این است که ما یک سینتکس کنترل‌کننده ساده و بدون آرگومان برای موارد مثبت داریم (نوعی که بیشتر اتفاق می‌افتد) اما می‌توانیم کنترل‌کننده‌های کلی را هم پوشش دهیم:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// برای جواب مثبت، هر دو کنترل‌کننده فراخوانی می‌شوند
// برای جواب منفی، فقط دومی
ask("سوال؟", () => alert('شما بله گفتید'), result => alert(result));
```

این یک مورد استفاده از [چندریختی](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) است -- رفتار متفاوت با آرگومان‌ها با توجه به نوع آنها یا در این مورد ما با توجه به `length`. این ایده در کتابخانه‌های جاوااسکریپت استفاده می‌شود.

## ویژگی‌های سفارشی

ما می‌توانیم ویژگی‌هایی از خودمان را هم اضافه کنیم.

اینجا می‌توانیم ویژگی `counter` را اضافه کنیم تا تعداد تمام فراخوانی‌ها را پیگیری کنیم:

```js run
function sayHi() {
  alert("سلام");

  *!*
  // بیایید تعداد اجرا کردن را بشماریم
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // مقدار اولیه

sayHi(); // سلام
sayHi(); // سلام

alert( `${sayHi.counter} بار فراخوانی شد` ); // دو بار فراخوانی شد
```

```warn header="ویژگی متغیر نیست"
یک ویژگی که به یک تابع تخصیص داده شود مانند `sayHi.counter = 0`، متغیر محلی `counter` را درون آن تعریف *نمی‌کند*. به عبارتی دیگر، یک ویژگی `counter` و متغیر `let counter` دو چیز غیر مرتبط هستند.

ما می‌توانیم با یک تابع به عنوان یک شیء رفتار کنیم، ویژگی‌هایی را درون آن ذخیره کنیم اما این موضوع روی اجرا شدن آن هیچ تاثیری ندارد. متغیرها هیچوقت از ویژگی‌های تابع استفاده نمی‌کنند و برعکس. اینها فقط دنیاهای موازی هستند.
```

ویژگی‌های تابع می‌توانند بعضی اوقات جایگزین کلوژرها شوند. برای مثال، ما می‌توانیم مثال تابع شمارنده را از فصل <info:closure> بازنویسی کنیم تا از ویژگی تابع استفاده کند:

```js run
function makeCounter() {
  // :به جای این
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count` حالا در به صورت مستقیم در خود تابع ذخیره شده است نه در محیط لغوی بیرونی آن.

این روشِ استفاده از کلوژر بهتر است یا بدتر؟

تفاوت اصلی این است که اگر مقدار `count` در یک متغیر بیرونی وجود داشته باشد، سپس کد بیرونی نمی‌تواند به آن دسترسی داشته باشد. تنها تابع‌های تودرتو ممکن است آن را تغییر دهند. و اگر فقط به یک تابع متصل باشد، سپس چنین چیزی امکان دارد:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

پس انتخاب نحوه پیاده‌سازی به اهداف ما بستگی دارد.

## Function Expression نام‌گذاری شده

Function Expression نام‌گذاری شده، یا NFE، یک عبارت برای Function Expressionهایی است که یک اسم دارند.

برای مثال، بیایید یک Function Expression معمولی را فرض کنیم:

```js
let sayHi = function(who) {
  alert(`${who} سلام،`);
};
```

و یک اسم به آن بدهیم:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`سلام، ${who}`);
};
```

آیا ما اینجا چیزی بدست آوردیم؟ هدف اسم اضافی `"func"` چیست؟

در ابتدا بیایید این را در نظر بگیریم که ما هنوز هم یک Function Expression داریم. اضافه کردن اسم `"func"` بعد از `function` آن را تبدیل به Function Declaration نکرد چون هنوز هم به عنوان بخشی از یک مقداردهی ساخته شده است.

اضافه کردن چنین اسمی چیزی را خراب نکرد.

تابع هنوز هم با `sayHi()` قابل دسترس است:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`سلام، ${who}`);
};

sayHi("John"); // John ،سلام
```

دو چیز خاص درباره اسم `func` وجود دارد که دلیل‌هایی برای آن داریم:

1. این اسم به تابع اجازه می‌دهد که به صورت درونی به خودش رجوع کند.
2. این اسم بیرون از تابع قابل رویت نیست.

برای مثال، تابع `sayHi` پایین اگر هیچ مقداری برای `who` تعیین نشود، خودش را با `"Guest"` صدا می‌زند:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`سلام، ${who}`);
  } else {
*!*
    func("Guest"); // از تابع برای اینکه خودش را دوباره صدا بزند استفاده کنید
*/!*
  }
};

sayHi(); // Guest ،سلام

// :اما این کار نخواهد کرد
func(); // تعریف نشده است (بیرون از تابع قابل رویت نیست) func ،ارور
```

چرا ما از `func` استفاده می‌کنیم؟ شاید فقط از `sayHi` برای فراخوانی تودرتو باید استفاده کنیم؟

در واقع، در اکثر موارد ما می‌توانیم این کار را انجام دهیم:

```js
let sayHi = function(who) {
  if (who) {
    alert(`سلام، ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

مشکل این کد، امکان تغییر `sayHi` در کد بیرونی است. اگر تابع به یک متغیر دیگر تخصیص داده شود، کد شروع به ایجاد ارور می‌کند:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`سلام، ${who}`);
  } else {
*!*
    sayHi("Guest"); // تابع نیست sayHi :ارور
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // !دیگر کار نمی‌کند sayHi ارور، فراخوانی تودرتوی
```

دلیل بروز ارور این است که تابع `sayHi` را از محیط لغوی بیرونی دریافت می‌کند. هیچ `sayHi` محلی وجود ندارد پس متغیر بیرونی استفاده می‌شود. و در زمان فراخوانی `sayHi` بیرونی برابر با `null` است.

اسم اختیاری که ما می‌توانیم در Function Expression قرار می‌دهیم قرار است که دقیقا این دسته از مشکلات را حل کند.

بیایید از آن برای رفع مشکل کد خود استفاده کنیم:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`سلام، ${who}`);
  } else {
*!*
    func("Guest"); // حالا همه چیز درست است
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // (فراخوانی تودرتو کار می‌کند) Guest ،سلام
```

حالا کار می‌کند چون اسم `"func"` یک تابع محلی است. این اسم از بیرون دریافت نمی‌شود (و آنجا هم قابل رویت نیست). مشخصات زبان تضمین می‌کند که این اسم همیشه به تابع کنونی رجوع می‌کند.

کد بیرونی هنوز هم متغیر `sayHi` یا `welcome` خود را دارد. و `func` یک «اسم تابع درونی» است، جوری که تابع می‌توانند از درون خودش را فراخوانی کند.

```smart header="چنین چیزی برای Function Declaration وجود ندارد"
خصوصیت «اسم درونی» که اینجا توضیح داده شد فقط برای Function Expessionها قابل استفاده است نه برای Function Declarationها. برای Function Declarationها، سینتکسی برای اضاف کردن اسم «درونی» وجود ندارد.

بعضی‌اوقات، نیاز به یک اسم درونی قابل، دلیلی برای نوشتن دوباره‌ی یک Function Declaration به Function Expression نام‌گذاری‌شده است.
```

## Summary

Functions are objects.

Here we covered their properties:

- `name` -- the function name. Exists not only when given in the function definition, but also for assignments and object properties.
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.


So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
