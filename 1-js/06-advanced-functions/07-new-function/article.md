
# سینتکس "new Function"

یک راه دیگر برای ساخت یک تابع وجود دارد. به ندرت استفاده می‌شود، اما گاهی اوقات راه دیگری وجود ندارد.

## سینتکس

سینتکس آن برای ساخت یک تابع به صورت زیر است:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

تابع ساخته شده دارای آرگومان‌های `arg1...argN` و بدنه‌ی `functionBody` خواهد بود.

این روش با نگاه به یک مثال قابل درک‌تر است. در زیر تابعی با دو آرگومان ساخته شده:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

و این هم یک تابع بدون آرگومان است، که فقط بدنه دارد:

```js run
let sayHi = new Function('alert("سلام")');

sayHi(); // سلام
```

تفاوت اصلی از روش‌های دیگری که دیدیم این است که تابع در واقع از یک رشته‌‌ای ساخته می‌شود که در زمان اجرا (ران‌تایم) وارد تابع می‌شود.

همه‌ی روش‌های تعریف تابع قبلی ما برنامه‌نویس‌ها را ملزم به نوشتن کد تابع می‌کرد.

اما `new Function` به ما این امکان را می‌دهد که هر رشته‌ی دلخواه را به تابع تبدیل کنیم. برای مثال می‌توانیم یک تابع را از یک سرور دریافت و سپس آنرا اجرا کنیم:

```js
let str = ... کد را به صورت زنده از سرور دریافت کن ...

let func = new Function(str);
func();
```

از این روش در روش شرایط خیلی خاص، برای مثال زمانی که کد را از یک سرور دریافت می‌کنیم، یا کامپایل یک تابع از روی یک الگو به صورت پویا، در وب‌اپلیکیشن‌های پیچیده استفاده می‌شود.

## بستار

معمولا، یک تابع به واسطه ویژگی `[[Environment]]` به یاد دارد که کجا متولد شده. این ویژگی به محیط لغوی (lexical environment) از جایی که ساخته شده ارجاع می‌دهد (در این باره قبلا در بخش <info:closure> صحبت کرده‌ایم).

اما زمانی که تابعی با `new Function` ساخته شود، `[[Environment]]` آن نه به محیط لغوی بلکه به محیط سراسری یا گلوبال اشاره می‌شود.

در نتیجه، تابع به متغیرهای بیرونی خودش دسترسی ندارد، بلکه فقط به متغیرهای گلوبایل دسترسی دارد.

```js run
function getFunc() {
  let value = "تست";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

این را با رفتار عادی مقایسه کنید:

```js run
function getFunc() {
  let value = "تست";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, از محیط لغوی تابع getFunc
```

این قابلیت ویژه‌ی `new Function` عجیب به نظر می‌رسد، اما در عمل بسیار کارا است.

تصور کنید که ما مجبور هستیم تابعی از یک رشته بسازیم. کد آن تابع در زمان نوشتن کد معلوم نیست (به همین دلیل است در این موقعیت از تابع معمولی استفاده نمی‌کنیم) ، اما در زمان اجرا کد تابع معلوم خواهد شد. شاید آنرا از سرور یا یک منبع دیگری دریافت کرده‌ایم.

تابع جدید ما نیاز دارد که با کدهای سند اصلی ما تعامل داشته باشد.

اما چه اتفاقی می‌افتد اگر به متغیرهای بیرونی دسترسی داشته باشد؟

مشکل این است که قبل از این که جاوااسکریپت برای استفاده منتشر شود، توسط یک *minifier* -- یک برنامه مخصوص که کد را با حذف کامنت‌ها، فاصله‌گذاری‌ها و ... فشرده می‌کند -- فشرده می‌کند. چیزی که مهم است این است که نام متغیرهای محلی به کلمات کوتاه‌تری تغییر داده‌ می‌شوند.

برای مثال، اگر یک تابع در بدنه‌اش شامل `let userName` باشد، آن برنامه کوچک‌ساز (minifier) آن‌را با چیزی شبیه `let a` (یا حرفی که تا کنون استفاده نشده باشد) جایگزین می‌کند. این کار معمولا بدون خطر خواهد بود، زیرا متغیر محلی است و در هیچ‌کجا خارج از تابع به آن دسترسی نخواهند داشت. و درون تابع، کوچک‌ساز هر اسمی از آن را جایگزین می‌کند. کوچک‌سازها باهوش عمل می‌کنند، آنها ساختار کد را ارزیابی می‌کنند، تا مطمئن شوند چیزی خراب نمی‌شود. آنها فقط یک پیداکن و جایگزین‌کن احمق نیستند.

پس اگر `new Function` به متغیرهای بیرونی دسترسی داشته باشد، عملا نمی‌تواند متغیر تغییرنام یاقته‌ی `userName` را پیدا کند.

**اگر `new Function` به متغیرهای بیرونی دسترسی داشت, با کوچک‌سازها دچار تداخل و ناسازگاری می‌شد.**

غیر از این، چنین کدی از نظر معماری بد و دارای ضعف بوده و احتمالا باعث بروز مشکلاتی می‌شود.

برای دادن ورودی به یک تابعی که به وسیله `new Function` ساخته شده، باید از آرگومان‌های آن استفاده کنیم.

## خلاصه

سینتکس:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

به دلایلی،‌ آرگومان‌ها می‌توانند به صورت یک لیست که با کاما جدا شده نیز معرفی شوند.

تعاریف زیر، همگی شبیه هم است و یک معنی خواهد داشت:

```js
new Function('a', 'b', 'return a + b'); // سینتکس معمولی
new Function('a,b', 'return a + b'); // جدا شده با کاما
new Function('a , b', 'return a + b'); // جدا شده با کاما - و وجود فاصله گذاری
```

توابعی که با `new Function` ساخته می‌شوند، ‍`[[Environment]]` آنها به محیط لغوی گلوبال اشاره دارد، نه بیرونی. به همین دلیل، نمی‌توانند از متغیرهای بیرونی استفاده کنند، که در واقع چیز خوبی‌است، به ما اطمینان می‌دهد که به اروری برنخواهیم خورد. اینکه به صورت واضح از پارامترهای ورودی استفاده کنیم، از نظر معماری روش بهتری است و هیچ مشکلی را هم رابطه با کوچک‌سازها ایجاد نخواهد کرد.
