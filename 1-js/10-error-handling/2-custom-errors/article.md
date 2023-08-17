# ارورهای شخصی‌سازی شده، تعمیم دادن Error

زمانی که ما چیزی را توسعه می‌دهیم، اغلب اوقات به کلاس‌های ارور خودمان برای بازتاب دادن اشتباهات خاصی که ممکن است در کارهایمان رخ دهند نیاز داریم. برای ارورهای درون عملیات شبکه‌ای ممکن است به `HttpError` نیاز داشته باشیم، برای عملیات پایگاه داده به `DbError`، برای عملیات جستجو به `NotFoundError` و غیره.

ارورهای ما باید از ویژگی‌های اولیه ارور مانند `message`، `name` و ترجیحا `stack` هم پشتیبانی کنند. اما آن‌ها ممکن است ویژگی‌های خود را داشته باشند، برای مثال شیءهای `HttpError` ممکن است ویژگی `statusCode` را با مقداری مانند `404` یا `403` یا `500` داشته باشند.

جاوااسکریپت اجازه می‌دهد که از `throw` همراه با هر آرگومانی استفاده کنیم، پس از لحاظ فنی ارورهای شخصی‌سازی شده ما نیازی ندارند که از `Error` ارث‌بری کنند. اما اگر ما از آن ارث‌بری کنیم، سپس استفاده از `obj instanceof Error` برای شناسایی شیءهای ارور ممکن می‌شود. پس بهتر است از آن ارث‌بری کنیم. 

همانطور که برنامه رشد می‌کند، طبیعتا ارورهای ما یک سلسه مراتب تشکیل می‌دهند. برای مثال، `HttpTimeoutError` ممکن است از `HttpError` ارث‌بری کند و همینطور ادامه داشته باشد.

## تعمیم دادن Error

به عنوان یک مثال، بیایید تابع `readUser(json)` را در نظر بگیریم که جی‌سان حاوی داده کاربر را می‌خواند.

اینجا مثالی از اینکه یک `json` معتبر چگونه است داریم:
```js
let json = `{ "name": "John", "age": 30 }`;
```

از درون، ما از `JSON.parse` استفاده خواهیم کرد. اگر این متد یک `json` ناقص را دریافت کند، سپس `SyntaxError` پرتاب می‌کند. اما اگر `json` از لحاظ سینتکس درست باشد به معنی یک کاربر معتبر نیست نه؟ ممکن است که داده مهم را نداشته باشد. برای مثال، ممکن است ویژگی‌های `name` و `age` که برای کاربران ما ضروری است را نداشته باشد.

تابع `readUser(json)` نه تنها جی‌سان را می‌خواند بلکه داده را بررسی («اعتبارسنجی») می‌کند. اگر فیلدهای مورد نیاز وجود نداشته باشند یا شکل اشتباه باشد، پس یک ارور داریم. و این یک `SyntaxError` نیست چون داده از لحاظ سینتکس درست است بلکه نوع دیگری از ارور است. ما به آن `ValidationError` (ارور اعتبارسنجی) می‌گوییم و برای آن یک کلاس می‌سازیم. یک ارور از این نوع باید اطلاعاتی درباره فیلد متخلف را داشته باشد.

کلاس `ValidationError` ما باید از کلاس `Error` ارث‌بری کند.

کلاس `Error` درون‌ساخت است اما اینجا کد تقریبی آن را داریم تا بتوانیم متوجه شویم که چه چیزی را تعمیم می‌دهیم:

```js
// درون‌ساخت که توسط خود جاوااسکریپت تعریف شده است Error یک «شبه کد» برای کلاس
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (اسم‌های متفاوت برای کلاس‌های ارور درون‌ساخت متفاوت)
    this.stack = <call stack>; // غیر استاندارد، اما اکثر محیط‌های اجرا از آن پشتیبانی می‌کنند
  }
}
```

حالا بیایید با `ValidationError` آن را ارث‌بری کنیم و در عمل امتحانش کنیم:

```js run
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // لیستی از فراخوانی‌های تودرتو با شماره خطوط برای هر کدام از آن‌ها
}
```

لطفا توجه کنید: در خط `(1)` ما تابع سازنده والد را فراخوانی می‌کنیم. جاوااسکریپت از ما می‌خواهد که `super` را درون تابع سازنده فرزند فراخوانی کنیم پس این موضوع الزامی است. تابع سازنده والد ویژگی `message` را تنظیم می‌کند.

تابع سازنده والد همچنین ویژگی `name` را برابر با `"Error"` قرار می‌دهد پس در خط `(2)` ما آن را به مقدار درستش برمی‌گردانیم.

بیایید در `readUser(json)` از آن استفاده کنیم:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// کاربرد
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// try..catch مثال عملی با

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("داده نامعتبر: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("ارور سینتکس جی‌سان: " + err.message);
  } else {
    throw err; // کن rethrow ارور ناشناس، آن را (**)
  }
}
```

بلوک `try..catch` در کد بالا هم `ValidationError` ما و هم `SyntaxError` درون‌ساخت را از `JSON.parse` مدیریت می‌کند.

لطفا به اینکه ما چگونه از `instanceof` برای چک کردن یک نوع ارور خاص در خط `(*)` استفاده کردیم توجه کنید.

همچنین می‌توانستیم `err.name` را بررسی کنیم، مثلا اینگونه:

```js
// ...
// (err instanceof SyntaxError) به جای
} else if (err.name == "SyntaxError") { // (*)
// ...
```

نسخه `instanceof` خیلی بهتر است چون در آینده ما قرار است `ValidationError` را تعمیم دهیم، از آن انواع دیگر بسازیم، مثلا `PropertyRequiredError`. و بررسی `instanceof` برای کلاس‌های ارث‌بر جدید هم کار خواهد کرد. پس این روش بعید است که منسوخ شود.

همچنین مهم است که اگر `catch` یک ارور ناشناس را ملاقات کند، در خط `(**)` آن را rethrow کند. بلوک `catch` فقط می‌داند که چگونه ارورهای سینتکس و اعتبارسنجی را مدیریت کند، انواع دیگر (که به خاطر یک غلط املایی در کد یا هر دلیل دیگری ایجاد شده‌اند) باید از آن بیرون بیافتند.

## ارث‌بری بیشتر

کلاس `ValidationError` خیلی عام است. ممکن است چیزهای زیادی به درستی انجام نگیرند. ویژگی ممکن است وجود نداشته باشد یا شکل اشتباهی داشته باشد (مانند یک مقدار رشته‌ای برای `age` به جای یک عدد). بیایید دقیقا برای نبودن ویژگی‌ها، یک کلاس عینی‌تر `PropertyRequiredError` بسازیم. این کلاس شامل اطلاعات بیشتری درباره ویژگی‌ای که وجود ندارد است.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// کاربرد
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// try..catch مثال عملی با

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // کن rethrow ارور ناشناخته، آن را
  }
}
```

استفاده از کلاس جدید `PropertyRequiredError` آسان است: ما فقط باید اسم ویژگی را پاس دهیم: `new PropertyRequiredError(property)`. پیام `message` که برای انسان خوانا است توسط تابع سازنده تولید می‌شود.

لطفا توجه کنید که در تابع سازنده `PropertyRequiredError` مقدار `this.name` دوباره به صورت دستی مشخص می‌شود. این موضوع ممکن است کمی خسته‌کننده باشد -- مشخص کردن `this.name = <class name>` در هر کلاس شخصی‌سازی شده ارور. ما می‌توانیم با ایجاد کلاس «ارور پایه» خودمان که `this.name = this.constructor.name` را مشخص می‌کند از آن دوری کنیم. و سپس تمام ارور‌های شخصی‌سازی شده خودمان را از آن ارث‌بری کنیم.

بیایید به آن `MyError` بگوییم.

اینجا کد `MyError` و دیگر کلاس‌های ارور شخصی‌سازی شده را داریم، به صورت ساده‌شده:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// درست است name
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

حالا ارورهای شخصی‌سازی شده بسیار کوتاه‌تر هستند مخصوصا `ValidationError`، چون ما از خط `"this.name = ..."` در تابع سازنده خلاصی یافتیم.

## دربرگرفتن استثناءها

هدف تابع `readUser` در کد بالا «خواندن داده کاربر» است. ممکن است در حین این فرایند انواع مختلفی از ارور رخ دهد. هم اکنون ما `SyntaxError` و `ValidationError` را داریم اما در آینده تابع `readUser` ممکن است رشد کند و احتمالا انواع دیگری از ارورها را ایجاد کند.

کدی که `readUser` را فرا می‌خواند باید این ارورها را مدیریت کند. هم اکنون، این کد در بلوک `catch` از چند `if` استفاده می‌کند که کلاس را بررسی و ارورهای شناخته شده را مدیریت می‌کند و ارورهای ناشناخته را rethrow می‌کند.

رویه اینگونه است:

```js
try {
  ...
  readUser()  // منبع احتمالی ارور
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // مدیریت ارورهای اعتبارسنجی
  } else if (err instanceof SyntaxError) {
    // مدیریت ارورهای سینتکس
  } else {
    throw err; // می‌کنیم rethrow ارور ناشناخته، آن را
  }
}
```

در کد بالا می‌توانیم دو نوع از ارور را ببینیم اما بیشتر از آن هم می‌تواند وجود داشته باشد.

اگر تابع `readUser` چند نوع ارور تولید کند، سپس ما باید از خودمان بپرسیم: آیا واقعا می‌خواهیم هر بار برای تک تک ارورها بررسی انجام دهیم؟

اغلب اوقات جواب «خیر» است: ما می‌خواهیم «یک پله بالاتر از تمام آن‌ها» باشیم. ما فقط می‌خواهیم بدانیم آیا یک «ارور خواندن داده» وجود داشت یا خیر -- اینکه دقیقا چرا اتفاق افتاد اغلب اوقات نامربوط است (پیام ارور این موضوع را توضیح می‌دهد). یا، حتی بهتر، می‌خواهیم راهی برای دریافت جزئیات ارور داشته باشیم اما فقط در صورتی که نیاز ما باشد.

تکنیکی که ما اینجا شرح می‌دهیم «دربرگرفتن استثناءها (wrapping exceptions)» نام برده می‌شود.

1. ما کلاس جدیدی به نام `ReadError` برای نمایش یک ارور «خواندن داده» عام می‌سازیم.
2. تابع `readUser` ارورهای خواندن داده که درون آن اتفاق می‌افتند را می‌گیرد، مانند `ValidationError` و `SyntaxError`، و به جای آن‌ها یک `ReadError` تولید می‌کند.
3. شیء `ReadError` رجوع به ارور اصلی را درون ویژگی `cause` خودش حفظ خواهد کرد.

سپس کدی که `ReadUser` را فرا می‌خواند فقط باید برای وجود داشتن `ReadError` بررسی را انجام دهد نه برای هر نوع ارور خواندن داده. و اگر کد به اطلاعات بیشتری درباره یک ارور نیاز داشت، می‌تواند ویژگی `cause` آن را بررسی کند.

اینجا کدی داریم که `ReadError` را تعریف می‌کند و کاربرد آن در `readUser` و `try..catch` را نشان می‌دهد:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // SyntaxError: Unexpected token b in JSON at position 1 :ارور اصلی
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

در کد بالا، `readUser` دقیقا همانطور که توضیح داده شد کار می‌کند -- ارورهای سینتکس و اعتبارسنجی را می‌گیرد و به جای آن‌ها، ارورهای `ReadError` را پرتاب می‌کند (ارورهای ناشناخته طبق معمول دوباره پرتاب می‌شوند).

پس کد بیرونی `instanceof ReadError` را بررسی می‌کند و تمام. نیازی به لیست کردن تمام انواع ارور احتمالی نیست.

این روش «دربرگرفتن استثناءها» نامیده می‌شود چون ما استثناءهای «سطح پایین» را دریافت می‌کنیم و آن‌ها را درون `ReadError` که خلاصه‌تر است «دربرمی‌گیریم».

## خلاصه

- به طور طبیعی ما می‌توانیم از `Error` و سایر کلاس‌های ارور درون‌ساخت ارث‌بری کنیم. فقط باید حواسمان به ویژگی `name` باشد و فراخوانی `super` را فراموش نکنیم.
- می‌توانیم از `instanceof` برای بررسی وجود داشتن ارورهای به خصوص استفاده کنیم. این همراه با ارث‌بری نیز کار می‌کند. اما گاهی اوقات ما یک شیء ارور داریم که از یک کتابخانه شخص ثالث می‌آید و راه آسانی برای دریافت کلاس آن وجود ندارد. سپس ویژگی `name` می‌تواند برای چنین بررسی‌هایی استفاده شود.
- دربرگرفتن استثناءها یک تکنیک همه جانبه است: یک تابع استثناءهای سطح پایین را مدیریت می‌کند و به جای تعداد زیادی ارور سطح پایین، ارورهای سطح بالاتر می‌سازد. گاهی اوقات استثناءهای سطح پایین به ویژگی‌های آن شیء تبدیل می‌شوند مانند `err.cause` در مثال‌های بالا اما این موضوع ضروری نیست.
