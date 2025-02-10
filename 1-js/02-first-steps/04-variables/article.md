# متغیرها

بیشتر اوقات، برنامه‌های جاوااسکریپت نیاز دارند تا با اطلاعات کار کنند. بطور نمونه: 
1. یک فروشگاه آنلاین -- اطلاعات ممکن است شامل كالاهایی شود که فروخته می‌شوند و در سبد خرید هستند. 
2. یک نرم‌افزار چت -- اطلاعات ممکن است شامل کاربران، پیام‌ها و دیگر موارد شود.

متغیرها برای ذخیره‌سازی این اطلاعات استفاده می‌شوند.

## متغیر

یک [متغیر](https://fa.wikipedia.org/wiki/متغیر_(برنامه%E2%80%8Cنویسی)) (variable) "حافظه‌ای نام گذاری شده" برای داده است. ما می‌توانیم از متغیرها برای ذخیره کالاها، بازدید کننده‌ها و داده‌های دیگر استفاده کنیم.

برای ساخت یک متغیر در جاوااسکریپت از `let` استفاده کنید.

عبارت زیر یک متغیر با نام "message" می‌سازد (یا به عبارتی دیگر: *تعریف می‌کند*):

```js
let message;
```

حالا می‌توانیم اطلاعاتی را از طریق عملگر `=` در این متغیر قرار دهیم :

```js
let message;

*!*
message = 'Hello'; // ذخیره کن message را در متغیر «Hello» رشته
*/!*
```

حال رشته‌ای که نوشتیم در بخشی از حافظه کامپیوتر که در اختیار این متغیر می‌باشد ذخیره شده است. ما می‌توانیم با استفاده از اسم متغیر به آن دسترسی داشته باشیم:

```js run
let message;
message = 'سلام!';

*!*
alert(message); // محتوای متغیر را نشان می‌دهد
*/!*
```

برای اختصار می‌توانیم تعریف متغیر و مقداردهی به آن را در یک خط قرار دهیم :

```js run
let message = 'Hello!'; // متغیر را تعریف کن و مقداردهی کن

alert(message); // !سلام
```

همینطور می‌توانیم چند متغیر را در یک خط تعریف کنیم :

```js no-beautify
let user = 'John', age = 25, message = 'سلام';
```

این مورد ممکن است کوتاه‌تر به نظر آید، اما آن را پیشنهاد نمی‌کنیم. بخاطر خوانایی بهتر، لطفا برای تعریف هر متغیر از خطوط جداگانه استفاده کنید:

تعریف کردن در چند خط کمی طولانی‌تر است، اما برای خواندن راحت تر است:

```js
let user = 'John';
let age = 25;
let message = 'سلام';
```

بعضی از برنامه‌نویسان متغیرهای متعدد را به این صورت در چند خط می‌نویسند:

```js no-beautify
let user = 'John',
  age = 25,
  message = 'سلام';
```

...یا حتی به صورت "comma-first" اینکار را انجام می‌دهند:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

از لحاظ فنی، همه این حالات یک کار را انجام می‌دهند. پس انتخاب آن‌ها به سلایق و زیبایی شناسی شخصی مربوط است.

````smart header="`var` بجای `let`"
در اسکریپت‌های قدیمی ممکن است بجای کلیدواژه `let` با کلیدواژه `var` برخورد کنید :

```js
*!*var*/!* message = 'سلام';
```

<<<<<<< HEAD
کلیدواژه `var` تقریبا* با* `let` یکسان است. آن هم یک متغیر را تعریف می‌کند، ولی روش کار آن قدیمی است.

تفاوت‌های کوچکی بین این دو وجود دارد که در حال حاضر به آن نمی‌پردازیم. در مبحث <info:var> با جزییات به آن خواهیم پرداخت.
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
````

## یک مقایسه‌ی واقعی

برای درک مفهوم متغیر، می‌توانیم آن را یک جعبه برای نگهداری اطلاعات تصور کنیم، که یک نام منحصربه‌فرد روی آن چسبانده‌ایم.

<<<<<<< HEAD
برای نمونه، تصور کنید متغیر "`message`" در جعبه‌ای با برچسب `message` و با مقدار "`سلام!`" داخل آن وجود دارد:
=======
For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

![](variable.svg)

ما می‌توانیم هر مقداری در آن قرار دهیم.

همینطور می‌توانیم هر چند بار که خواستیم این مقدار را تغییر دهیم:

```js run
let message;

message = 'سلام!';

message = 'World!'; // مقدار تغییر کرد

alert(message);
```

وقتی مقدار تغییر کرد، اطلاعات قبلی از آن پاک خواهند شد:

![](variable-change.svg)

ما همینطور می‌توانیم دو متغیر تعریف کرده و اطلاعات یکی را در دیگری کپی کنیم.

```js run
let hello = 'سلام دنیا!';

let message;

*!*
// کپی کن message در hello مقدار «سلام دنیا» را از
message = hello;
*/!*

// حالا هر دو متغیر یک مقدار دارند
alert(hello); // !سلام دنیا
alert(message); // !سلام دنیا
```

````warn header="دوبار تعریف کردن باعث ارور می‌شود"
یک متغیر باید فقط یک بار تعریف شود.

تعریف دوباره یک متغیر سبب ایجاد ارور می‌شود:

```js run
let message = "این";

// منجر به خطا می‌شود `let` تکرار کردن
let message = "آن"; // SyntaxError: Identifier 'message' has already been declared
```
بنابراین، ما باید متغیر را یک بار تعریف کنیم و سپس بدون `let` به آن رجوع کنیم.
````

```smart header="زبان‌های Functional"
جالب است بدانید زبان‌های [تمام functional](https://en.wikipedia.org/wiki/Purely_functional_programming) (تمام تابع‌محور) مانند [Haskell](https://fa.wikipedia.org/wiki/هسکل_(زبان_برنامه%E2%80%8Cنویسی)) وجود دارند که تغییر مقدار متغیر را ممنوع کرده است.

در این نوع زبان‌ها، یک بار که مقداری را "در جعبه" قرار می‌دهیم، تا ابد آنجا می‌ماند. اگر بخواهیم مقداری دیگر را ذخیره کنیم، زبان ما را مجبور می‌کند تا جعبه‌ای جدید بسازیم (متغیر جدیدی تعریف کنیم). نمی‌توانیم از متغیر قدیمی استفاده کنیم.

اگرچه در نگاه اول این زبان‌ها عجیب به نظر می‌رسند، ولی کاملا توانایی توسعه پروژه‌های جدی را دارند. مهم‌تر از آن، در زمینه‌هایی مانند محاسبات موازی (Parallel Computation) این محدودیت‌ها تبدیل به مزیت می‌شوند.```

## نام‌گذاری متغیرها [#variable-naming]

دو محدودیت برای نام‌گذاری متغیرها در جاوااسکریپت وجود دارد:

1. نام باید فقط از حروف، اعداد یا علامت `$` و `_` تشکیل شده باشد.
2. اولین کاراکتر نمی‌تواند عدد باشد.

مثال‌هایی از نام‌های قابل قبول:

```js
let userName;
let test123;
```

زمانی‌ که یک نام متشکل از چند کلمه است، عموما از روش [camelCase](https://fa.wikipedia.org/wiki/نگارش_شتری) استفاده می‌شود. به این صورت که کلمات یکی پس از دیگری پشت هم نوشته می‌شوند و حرف اول هر کلمه (به جز حرف اول کلمه اول)  به حرف بزرگ است: `myVeryLongName`.

همینطور از `'$'` و `'_'` نیز می‌توان استفاده کرد. آنها فقط علامت هستند و معنی خاصی ندارند و همانند حروف قابل استفاده هستند.

این نام‌ها معتبر هستند :

```js run untrusted
let $ = 1; // یک متغیر را با نام "$" تعریف کردیم
let _ = 2; // و حالا یک متغیر با نام "_" تعریف کردیم

alert($ + _); // 3
```

مثال‌هایی از نام‌های نامعتبر:

```js no-beautify
let 1a; // نمی‌تواند با یک عدد شروع شود

let my-name; // خط‌های پیوند '-' در نام‌ها ممنوع هستند
```

```smart header="بزرگی و کوچکی حروف مهم است"
متغیرهای apple و Apple دو متغیر متفاوت هستند.
```

<<<<<<< HEAD
````smart header="کاراکترهای غیر انگلیسی مجاز هستند ولی توصیه نمی‌شوند"
امکان استفاده از هر زبانی، شامل حروف cyrillic، لوگوگرام‌های چینی و دیگر زبان‌ها وجود دارد، مثلا اینگونه::
=======
````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
از نظر فنی، این‌ها درست کار می‌کنند و مجاز هستند، ولی بر اساس یک قائده بین‌المللی برای نام متغیرها از زبان انگلیسی استفاده می‌شود. حتی اگر اسکریپتی کوچک می‌نویسیم، ممکن است تا مدت طولانی‌ای مورد استفاده و توسعه قرار بگیرد. اشخاصی از سایر کشورها ممکن است نیاز باشد روزی آن اسکریپت را بخوانند.
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
````

````warn header="نام‌های رِزِرو شده"

تعدادی  [نام رزرو شده](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords) وجود دارد که نمی‌توان از آنها برای نام متغیرها استفاده نمود چراکه آنها توسط خودِ زبان جاوااسکریپت استفاده شده‌اند.

برای نمونه `let`، `class`، `return` و `function` رزرو شده‌اند.

کد پایین یک Syntax error خواهد داشت:

```js run no-beautify
let let = 5; // !نامید "let" نمی‌توان یک متغیر را
let return = 5; // !نامید "return" همچنین نمی‌توان آن را
```
````

````warn header="مقدار دهی بدون `use strict`"

معمولا، ما نیاز داریم قبل از اینکه یک متغیر را استفاده کنیم آن را تعریف کنیم. در گذشته این امکان وجود داشت تا متغیری را بدون استفاده از `let` و صرفا با مقداردهی تعریف نمود. درصورتی‌ که از `use strict`  برای حفظ سازگاری با اسکریپت‌های قدیمی استفاده نکنیم، این امکان همچنان وجود دارد.

```js run no-strict
// در این مثال نیست "use strict" :در نظر داشته باشید

num = 5; // ساخته شده است حتی اگر قبلا وجود نداشت "num" متغیر

alert(num); // 5
```

این روش مناسب نیست و در صورت وجود use strict با خطا مواجه خواهد شد :

```js
"use strict";

*!*
num = 5; // Error: num is not defined
// 
*/!*
```
````

## ثابت‌ها

برای تعریف ثابت (متغیری که تغیر نمی‌کند) از `const` بجای `let` استفاده می‌کنیم:

```js
const myBirthday = '18.04.1982';
```

متغیرهایی که با const ساخته می‌شود را ثابت (constant) می‌گوییم. آنها قابل تغییر نیستند و تلاش برای اینکار با خطا روبرو خواهد شد :

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // !ارور، نمی‌توان ثابت را دوباره مقداردهی کرد
```

<<<<<<< HEAD
وقتی برنامه‎‌نویس اطمینان دارد که متغیری هیچگاه تغییر نمی‌کند می‌تواند آن را به عنوان const تعریف کند تا برای دیگران نیز این موضوع واضح باشد.
=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e


<<<<<<< HEAD
### ثابت‌های با حروف بزرگ
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

به صورت یک عُرفِ همه‌گیر، از ثابت‌های با حروف بزرگ به عنوان نام مستعار برای مقادیری که به خاطر سپردن آنها دشوار است، استفاده می‌شود. این دسته از ثابت‌ها اصطلاحا prior to execution (پیش از اجرای برنامه) مقدارشان مشخص است.

در ثابت‌ها از حروف بزرگ و _ استفاده می‌شود:

برای مثال، بیایید ثابت‌هایی برای رنگ‌ها در قالب به اصطلاح "وب" (هگزادسیمال) بسازیم:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...زمانی که نیاز داشته باشیم رنگ انتخاب کنیم
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

مزایا :

- `COLOR_ORANGE` بسیار راحت‌تر از `"#FF7F00"` به یاد می‌ماند.
- اشتباه در نوشتن `"#FF7F00"` بسیار محتمل‌تر از `COLOR_ORANGE` است.
- در هنگام خواندن کد، خواندن `COLOR_ORANGE` بسیار معنادارتر از `#FF7F00` است.

چه زمانی باید از حروف بزرگ و چه زمانی باید از حروف معمولی برای نام‌گذاری یک constant استفاده کنیم؟ بیایید قضیه را روشن کنیم.

<<<<<<< HEAD
ثابت بودن یک متغیر صرفا بدین معناست که مقدار آن تغییر نخواهد کرد. یک دسته از ثابت‌ها پیش از اجرای برنامه مقدارشان مشخص خواهد بود (مثل هگزادسیمال برای رنگ قرمز) و دسته دیگر در حین اجرای (Run Time) برنامه مقدارشان مشخص می‌شود، اما پس از مقدار دهی اولیه مقدارشان تغییر نمی‌کند.
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

برای نمونه:

```js
const pageLoadTime = /* زمان بارگیری برای یک صفحه وب */;
```

<<<<<<< HEAD
مقدار `pageLoadTime` پیش از اجرای برنامه مشخص نبوده و به همین دلیل به صورت عادی نوشته شده است. اما همچنان یک ثابت است چراکه زمان اجرای برنامه بعد از مقداردهی دیگر تغییر نخواهد کرد.
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

به تعبیری دیگر، ثابت‌های با حروف بزرگ فقط به عنوان نام مستعار برای مقدارهای «hard-coded» استفاده می‌شوند.

## نام‌های مناسب انتخاب کنید

یک نکته بسیار پر اهمیت دیگر درباره متغیرها وجود دارد.

نام یک متغیر باید معنی واضح و روشنی داشته باشد که داده درون خود را توصیف می‌کند.

<<<<<<< HEAD
انتخاب نام برای متغیرها یکی از کارهای مهم و پیچیده در برنامه‌نویسی است. یک نگاه سریع به نام متغیرها می‌تواند تفاوت یک برنامه‌نویس تازه‌کار و با تجربه را نشان دهد.

در پروژه‌های واقعی، بجای از صفر نوشتن برنامه‌ها، بیشتر زمان صرف اصلاح و توسعه کدهای موجود می‌شود. وقتی پس از مدتی به کدهای قبلی باز می‌گردیم، بدست آوردن اطلاعات از آن دسته کدهایی که نام‌گذاری‌های خوبی دارند بسیار راحت‌تر است (منظور متغیرهایی است که نام‌های خوبی دارند).
=======
Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

لطفا پیش از انتخاب نام برای یک متغیر، خوب به آن فکر کنید. ثمره‌ی آن را خواهید دید.

بعضی از دستورالعمل‌های مفید:

<<<<<<< HEAD
- از نام‌هایی که برای انسان قابل فهم است استفاده کنید مانند `userName` یا `shoppingCart`.
- از نام‌های مخفف یا کوتاه استفاده نکنید مانند `a`، `b`، `c`، مگر آنکه واقعا بدانید چه می‌کنید.
- نام‌های کاملا واضح و مختصر انتخاب کنید. نمونه‌هایی از نام‌های بد `data` و `value` هستند. این نام‌ها هیچ‌چیز را توضیح نمی‌دهند. استفاده از این دست نام‌ها فقط زمانی قابل قبول است که محتوای کدی که می‌نویسید به طور استثنا مشخص کند که data یا value به چه چیزی اشاره می‌کند.
- با ذهن خود و تیم کاریتان توافق نظر داشته باشید. اگر به مخاطبان وب‌سایت‌تان user می‌گویید، متغیرهای مرتبط را بجای `currentVisitor` یا `newManInTown` باید `currentUser` یا `newUser` بنامید.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```smart header="ایجاد یا استفاده مجدد?"
و آخرین نکته: برخی برنامه‌نویسان تنبل بجای تعریف متغیرهای جدید، از متغیرهای موجود دوباره استفاده می‌کنند.

در نتیجه متغیرهای آن‌ها مانند جعبه‌ایست که افراد متفاوت چیزهای مختلفی درون آن ریخته‌اند در حالی که نام روی برچسب آن را تغییر نداده‌اند.

این دسته از برنامه‌نویسان مقدار کمی در تعریف متغیر صرفه‌جویی می‌کنند اما ده برابر بیشتر را در رفع خطاها از دست می‌دهند.

یک متغیر اضافی خوب است، نه مضر.

بهینه‌سازی‌هایی که در مرورگرهای امروزی و همینطور کم‌حجم‌کننده‌های جاوااسکریپت صورت می‌گیرد، در به وجود نیامدن مشکلات عملکردی (Performance) برنامه‌های ما کمک می‌کنند. حتی استفاده از متغیرهای مختلف برای مقادیر مختلف به موتور جاوااسکریپت کمک می‌کند تا کد شما را بهینه کند.
```

## خلاصه

ما می‌توانیم با استفاده از کلیدواژه‌های `var`، `let` یا `const` متغیرهایی را برای ذخیره سازی اطلاعات تعریف کنیم.

- `let` -- حالت جدید تعریف متغیر است.
- `var` -- حالت قدیمی تعریف متغیر می‌باشد. معمولا به هیچ وجه از این روش استفاده نمی‌کنیم، اما تفاوت‌های آن را در بخش <info:var> بیان خواهیم کرد تا در صورت نیاز بتوانید از آن استفاده نمایید.
- `const` -- همانند `let` است با این تفاوت که مقدار آن قابل تغییر نیست.

نام متغیرها باید به گونه‌ای باشد که به ما اجازه دهد به راحتی متوجه شویم چه چیزی درون آن است.