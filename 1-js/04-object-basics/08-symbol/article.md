
# نوع سمبل (Symbol type)

<<<<<<< HEAD
با توجه به خصوصیات زبان، کلیدهای ویژگی‌های شیء می‌توانند یا از نوع رشته باشند، یا از نوع سمبل (symbol). نه از نوع اعداد و نه boolean، فقط رشته یا سمبل، همین دو نوع.

تا اینجا ما فقط از رشته‌ها استفاده می‌کردیم. حال بیایید مزایایی که سمبل‌ها به ما می‌دهند را ببینیم.
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

## سمبل‌ها (Symbols)

یک «سمبل» نشان دهنده‌ی شناسه‌ای یکتا است.

یک مقدار از این نوع می‌تواند با استفاده از `Symbol()` ساخته شود:

```js
<<<<<<< HEAD
// یک سمبل جدید است id
let id = Symbol();
```

بعد از ساختن، می‌توانیم به سمبل یک سری توضیحات بدهیم (همچنین به آن اسم سمبل هم می‌گویند)، که اکثرا برای رفع خطا استفاده می‌شود:
=======
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

```js
// است "id" یک سمبل به همراه توضیحات id
let id = Symbol("id");
```

<<<<<<< HEAD
سمبل‌ها برای یکتا بودن تضمین‌شده هستند. حتی اگر ما چند سمبل را با توضیحات یکسان بسازیم، آنها مقدارهایی متفاوت هستند. توضیحات فقط یک برچسب است که روی چیزی تاثیر نمی‌گذارد.
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

برای مثال، اینجا دو سمبل با توضیحات یکسان داریم -- آنها برابر نیستند:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

اگر شما با Ruby یا زبان دیگری که یک جورایی "سمبل" دارد آشنایی دارید -- لطفا گمراه نشوید. سمبل‌های جاوااسکریپت متفاوت هستند.

<<<<<<< HEAD
````warn header="سمبل‌ها به صورت خودکار به رشته تبدیل نمی‌شوند"
اکثر مقدارهای در جاوااسکریپت تبدیل به رشته به صورت ضمنی را انجام می‌دهند. برای مثال، ما می‌توانیم هر مقداری را `alert` کنیم، و این کار خواهد کرد. سمبل‌ها خاص هستند. آنها به صورت خودکار تبدیل نمی‌شوند.
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

برای مثال، این `alert` یک ارور را نمایش می‌دهد:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

این موضوع یک "گارد زبان" در برابر خرابکاری کردن است، چون رشته‌ها و سمبل‌ها از پایه متفاوت هستند و نباید به صورت تصادفی به یکدیگر تبدیل شوند.

<<<<<<< HEAD
اگر ما واقعا نیاز داریم که یک سمبل را نمایش دهیم، باید به طور ضمنی همراه آن `.toString()` را هم صدا بزنیم، مثل اینجا:
=======
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id)، حالا کار می‌کند
*/!*
```

<<<<<<< HEAD
یا فقط ویژگی `symbol.description` را برای نمایش توضیحات دریافت کنیم:
=======
Or get `symbol.description` property to show the description only:

>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## ویژگی‌های «مخفی»

<<<<<<< HEAD
سمبل‌ها به ما این امکان را می‌دهند که در یک شیء ویژگی‌های "مخفی" بسازیم، که هیچ کجای کد نتواند به صورت تصادفی به آن دسترسی داشته باشد یا آن را تغییر دهد.
=======

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

برای مثال، اگر ما در حال کار کردن با شیءهای `user` که متعلق به یک شخص ثالث است باشیم. ما می‌خواهیم شناسه‌هایی به آنها اضافه کنیم.

بیایید از یک کلید سمبلی برای این کار استفاده کنیم:

```js run
let user = { // به یک کد دیگر تعلق دارد
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // می‌توانیم با استفاده سمبل به عنوان کلید به داده دسترسی داشته باشیم
```

مزیت استفاده از `Symbol("id")` به جای رشته `"id"` چیست؟

<<<<<<< HEAD
به دلیل اینکه شیءهای `user` به کد دیگری تعلق دارند، آن کد هم با آنها کار می‌کند، ما نباید همینجوری به آن چیزی اضافه کنیم. این کار ایمن نیست. اما نمی‌توان به طور تصادفی به یک سمبل دسترسی پیدا کرد، کد شخص ثالث احتمالا آن را نمی‌بیند، پس انجام دادن این کار احتمالا مشکلی ندارد.

همچنین تصور کنید که یک اسکریپت دیگر بنا به دلایلی، بخواهد شناسه خودش را درون `user` داشته باشد. ممکن است یک کتابخانه‌ی جاوااسکریپت دیگر باشد، پس اسکریپت‌ها از یکدیگر بی‌خبر هستند.
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

سپس آن اسکریپت می‌تواند `Symbol("id")` خودش را بسازد، مثل این:

```js
// ...
let id = Symbol("id");

user[id] = "آنها id مقدار";
```

هیچ تعارضی بین شناسه ما و آنها وجود نخواهد داشت، چون سمبل‌ها همیشه متفاوت هستند، حتی اگر اسم یکسانی داشته باشند.

...اما اگر ما از رشته `"id"` به جای سمبل برای مقصود مشابه استفاده می‌کردیم، آنگاه تعارضی *وجود داشت*:

```js
let user = { name: "John" };

// استفاده می‌کند "id" اسکریپت ما از ویژگی
user.id = "ما id مقدار";

// ...می‌خواهد "id" یک اسکریپت دیگر هم بنا به دلیلی...

user.id = "آنها id مقدار"
// !بوم! توسط یک اسکریپت دیگر بازنویسی شد
```

### سمبل‌ها در یک شیء لیترال

اگر ما بخواهیم از یک سمبل در شیء لیترال `{...}` استفاده کنیم، باید دور آن براکت قرار دهیم.

مثل این:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // "id": 123 نه
*/!*
};
```
به این دلیل که ما به مقدار متغیر `id` به عنوان کلید نیاز داریم، نه رشته‌ی "id".

### سمبل‌ها توسط for..in رد می‌شوند

ویژگی‌های سمبلی در حلقه `for..in` شرکت نمی‌کنند.

برای مثال:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (بدون سمبل)
*/!*

// دسترسی مستقیم به سمبل کار می‌کند
alert( "به طور مستقیم: " + user[id] );
```

همچنین `Object.keys(user)` هم آنها را نادیده می‌گیرد. این بخشی از اصل کلی «مخفی‌سازی ویژگی‌های سمبلی» است. اگر یک اسکریپت یا کتابخانه دیگر در شیء ما حلقه بزند، به تصادفی به ویژگی سمبلی ما دسترسی نخواهد داشت.

در مقابل، [Object.assign](mdn:js/Object/assign) هم ویژگی‌های رشته و هم سمبل را کپی می‌کند:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

هیچ تناقضی اینجا وجود ندارد. طراحی آن اینگونه است. زمانی که ما یک شیء را شبیه‌سازی می‌کنیم یا شیءها را ادغام می‌کنیم، معمولا می‌خواهیم که *تمام* ویژگی‌ها کپی شوند (شامل سمبل‌هایی مثل `id`).

## سمبل‌های Global

همانطور که دیدیم، معمولا تمام سمبل‌ها متفاوت هستند، حتی اگر اسم یکسان داشته باشند. اما گاهی اوقات ما می‌خواهیم که سمبل‌های هم نام با یکدیگر برابر باشند. برای مثال، قسمت‌های مختلف برنامه ما می‌خواهند به سمبل `"id"` که ویژگی یکسانی است دسترسی داشته باشند.

برای بدست آوردن آن، یک *رجیستری ثبت سمبل global* وجود دارد. ما می‌توانیم سمبل‌ها را درون آن بسازیم و بعدا به آن دسترسی داشته باشیم، و تضمین می‌کند که دسترسی تکراری با استفاده از یک اسم به ما دقیقا سمبل یکسان را برمی‌گرداند.

برای خواندن (یا در صورت ناموجود بودن، ساختن) یک سمبل از رجیستری ثبت، از `Symbol.for(key)` استفاده کنید.

این صدازدن رجیستری ثبت global را بررسی می‌کند، و اگر یک سمبل توصیف شده به عنوان `key` موجود باشد، آن را برمی‌گرداند، در غیر این صورت یک سمبل جدید `Symbol(key)` می‌سازد و آن را در رجیستری ثبت با استفاده از `key` داده شده ذخیره می‌کند.

برای مثال:

```js run
// global خواندن از رجیستری ثبت
let id = Symbol.for("id"); // اگر سمبل وجود نداشته باشد، ساخته می‌شود

// دوباره آن را می‌خواند (شاید از یک جای دیگر کد باشد)
let idAgain = Symbol.for("id");

// سمبل یکسان
alert( id === idAgain ); // true
```

سمبل‌های درون رجیستری ثبت *سمبل‌های global* نامیده می‌شوند. اگر ما یک سمبل در تمام سطح برنامه بخواهیم که در همه جای کد قابل دسترس باشد -- این سمبل‌ها مناسب هستند.

```smart header="به نظر می‌رسد مثل Ruby باشد"
در بعضی از زبان‌های برنامه‌نویسی، مثل Ruby، به ازای هر اسم فقط یک سمبل وجود دارد.

<<<<<<< HEAD
در جاوااسکریپت، همانطور که می‌بینیم، برای سمبل‌های global این موضوع صدق می‌کند.
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
```

### متد Symbol.keyFor

<<<<<<< HEAD
برای سمبل‌های global، نه تنها `Symbol.for(key)` یک سمبل را بر اساس اسم برمی‌گرداند، بلکه یک عمل برعکس هم وجود دارد: `Symbol.keyFor(sym)`، که کار برعکس را انجام می‌دهد: یک اسم را بر اساس یک سمبل global برمی‌گرداند.
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

برای مثال:

```js run
// گرفتن سمبل بر اساس اسم
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// گرفتن اسم بر اساس سمبل
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

متد `Symbol.keyFor` درون خود از رجیستری ثبت سمبل global برای پیدا کردن کلید (key) سمبل استفاده می‌کند. پس برای سمبل‌های غیر global کار نمی‌کند. اگر سمبل global نباشد، قادر به پیدا کردن آن نخواهد بود و `undefined` را برمی‌گرداند.

<<<<<<< HEAD
همانطور که گفته شد، هر سمبل ویژگی `description` را دارد.
=======
That said, all symbols have the `description` property.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

برای مثال:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```

## سمبل‌های سیستمی

تعداد زیادی سمبل "سیستمی" وجود دارد که جاوااسکریپت درون خود از آنها استفاده می‌کند، و ما می‌توانیم از آنها برای ایجاد تغییرات کوچک در جنبه‌های متنوع شیءها استفاده کنیم.

آنها در مشخصات زبان در جدول [سمبل‌های شناخته‌شده](https://tc39.github.io/ecma262/#sec-well-known-symbols) لیست شده‌اند:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...و غیره.

برای مثال، `Symbol.toPrimitive` به ما امکان توصیف تبدیل شیء به مقدار اصلی (primitive) را می‌دهد. ما کاربرد آن را به زودی می‌بینیم.

شما با بقیه سمبل‌ها هم زمانی که ویژگی زبان مربوط به آنها را مطالعه کنیم آشنا می‌شوید.

## خلاصه

`Symbol` یک نوع مقدار اصلی (primitive) برای شناسه‌های یکتا است.

سمبل‌ها با صدازدن `Symbol()` به همراه توضیحات (اسم) اختیاری ساخته می‌شوند.

سمبل‌ها همیشه مقدارهای متفاوت دارند، حتی اگر اسم یکسان داشته باشند. اگر بخواهیم که سمبل‌های همنام برابر باشند، باید از رجیستری ثبت global استفاده کنیم: `Symbol.for(key)` یک سمبل global را با استفاده از `key` به عنوان اسم برمی‌گرداند (اگر نیاز باشد آن را می‌سازد). چند مرتبه صدازدن `Symbol.for` با `key` یکسان دقیقا سمبل یکسان را برمی‌گرداند.

سمبل‌ها در دو مورد زیاد استفاده می‌شوند:

<<<<<<< HEAD
1. ویژگی‌های «مخفی» شیء.
    اگر ما بخواهیم یک ویژگی را درون یک شیء که به اسکریپت یا کتابخانه دیگری "تعلق دارد" اضافه کنیم، می‌توانیم یک سمبل بسازیم و از آن به عنوان کلید ویژگی استفاده کنیم. یک ویژگی سمبلی در `for..in` نمایان نمی‌شود، پس با ویژگی‌های دیگر به طور تصادفی روی آن فرایندی انجام نمی‌گیرد. همچنین دسترسی مستقیم به آن وجود ندارد، چون اسکریپت دیگر سمبل ما را ندارد. پس ویژگی از استفاده یا بازنویسی تصادفی در امان می‌ماند.
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

    پس ما می‌توانیم با استفاده از ویژگی‌های سمبلی، به صورت "مخفیانه" چیزی را که نیاز داریم درون شیءها پنهان کنیم، اما بقیه آن را نباید ببینند.

2. سمبل‌های سیستمی زیادی وجود دارند که توسط جاوااسکریپت استفاده می‌شوند و با `Symbol.*` قابل دسترس هستند. ما می‌توانیم از آنها برای تغییر بعضی از رفتارهای درون زبان استفاده کنیم. برای مثال، بعدا در همین آموزش ما از `Symbol.iterator` برای [قابل تکرارها (iterables)](info:iterable)، `Symbol.toPrimitive` برای ایجاد [تبدیل شیء به مقدار اصلی](info:object-toprimitive) و غیره استفاده خواهیم کرد.

<<<<<<< HEAD
از لحاظ فنی، سمبل‌ها 100% مخفی نیستند. یک متد درون‌ساخت [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) وجود دارد که به ما امکان دریافت تمام سمبل‌ها را می‌دهد. همچنین یک متد به نام [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) وجود دارد که *تمام* کلیدهای یک شیء که شامل کلیدهای سمبلی هم هست را برمی‌گرداند. پس آنها در واقع پنهان نیستند. اما اکثر کتابخانه‌ها، توابع درون‌ساخت و ساختارهای سینتکس از این متدها استفاده نمی‌کنند.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
