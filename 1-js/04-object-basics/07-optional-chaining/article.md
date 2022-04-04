
# زنجیره‌ی اختیاری یا optional chaining '?.'

[recent browser="new"]

زنجیره‌ی اختیاری `.?` روشی بدون خطا برای دستیابی به ویژگی‌های(properties) داخلی شیء است حتی در زمانی که ویژگی میانی وجود نداشته باشد

## مشکل "ویژگی ناموجود"

اگر به تازگی شروع به خواندن آموزش و یادگیری جاوااسکریپت کرده‌اید ، شاید این مشکل را هنوز لمس نکرده‌اید، اما این یک مشکل کاملاً رایج است.

به عنوان مثال، بیایید بگوییم شیءهای `user` را داریم که اطلاعاتی درباره کاربرهای ما در خود دارد.

اکثر کاربران ما در ویژگی `user.address` آدرس‌هایی دارند و خیابان  را در `user.address.street` دارند ولی بعضی از آنان این اطلاعات را ارائه نکرده‌اند.

در چنین موردی، اگر ما تلاش کنیم مقدار `user.address.street` را دریافت کنیم، و کاربر آدرس نداشته باشد، با خطا مواجه می‌شویم:

```js run
let user = {}; // "address" یک کاربر بدون ویژگی

alert(user.address.street); // !خطا
```

این یک خروجی قابل حدس است٬ جاوااسکریپت اینگونه کار می‌کند. تا زمانی که `user.address` برابر با `undefined` است تلاش برای گرفتن `user.address.street` با خطا مواجه میشود.

ولی  در بسیاری از موارد عملی، ما ترجیح می‌دهیم به جای خطا، ‍`undefined` را دریافت کنیم (به معنای "بدون خیابان").

...و مثالی دیگر. در توسعه وب، ما می‌توانیم یک شیء که با یک المان در صفحه مطابقت دارد را با استفاده از یک متد خاص، مانند `document.querySelector('.elem')` بگیریم و این متد هنگامی که چنین المانی وجود نداشته باشد `null` را برمی‌گرداند:

```js run
// document.querySelector('.elem') خواهد شد اگر المنت وجود نداشته باشد null برابر با
let html = document.querySelector('.elem').innerHTML; // باشد خطا خواهد داد null اگر
```

<<<<<<< HEAD
باری دیگر، اگر اِلمان وجود نداشته باشد ما با مقدار NULL نمی‌توانیم به  `.innerHTML` دسترسی داشته باشیم. و در بعضی موارد، وقتی که نبودِ اِلمان طبیعی است، ما می‌خواهیم از خطا جلوگیری کنیم و فقط `html = null` را قبول کنیم. 
=======
Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` property of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

چگونه می‌توانیم این کار را انجام دهیم؟

راه‌حل واضح این است که قبل از اینکه  به ویژگی آن دسترسی پیدا کنیم، مقدار آن را با `if` یا عمگر شرطی `?` بررسی کنیم، به این صورت:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

<<<<<<< HEAD
الان بدون خطا کار می‌کند... ولی اصلا زیبا نیست. همانطور که می‌بینید `"user.address"` دوبار در کد تکرار شده است. برای دسترسی به ویژگی‌هایی با تو در تویی زیاد نیاز به تکرار بیشتری لازم است و این مشکل ایجاد می‌کند. 

برای مثال بیاید مقدار `user.address.street.name` را بگیریم.

ما باید هم `user.address` و `user.address.street` را بررسی کنیم:
=======
It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code.

Here's how the same would look for `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

We can see that the element search `document.querySelector('.elem')` is actually called twice here. Not good.

For more deeply nested properties, it becomes even uglier, as more repetitions are required.

E.g. let's get `user.address.street.name` in a similar fashion.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

```js
let user = {}; // کاربر آدرسی ندارد

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

این افتضاح است، یک نفر ممکن است حتی با درک این کد مشکل داشته باشد.

<<<<<<< HEAD
حتی اهمیتی هم ندارد، چون راه بهتری برای نوشتن آن وجود دارد، با استفاده از عملگر `&&`:
=======
There's a little better way to write it, using the `&&` operator:
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

```js run
let user = {}; // کاربر آدرسی ندارد

alert( user.address && user.address.street && user.address.street.name ); // undefined (بدون خطا)
```

استفاده از AND در کل مسیر رسیدن به ویژگی، وجود همه اجزا را تضمین می‌کند (اگر این چنین نباشد، ارزیابی متوقف می‌شود)، اما آن هم ایده‌آل نیست.

همانطور که می‌بینید نام ویژگی‌ها همچنان در کد تکرار می‌شوند. به طور مثال در قطعه کد بالا `user.address` سه بار تکرار شده است.

به همین دلیل زنجیره‌ی اختیاری `.?` به زبان اضافه شد. تا این مشکل را برای همیشه برطرف کند!

## زنجیره‌ی اختیاری

زنجیره‌ی اختیاری `.?` اگر مقدار قبل از قسمت `?.` برابر با `undefined` یا `null` باشد ارزیابی را متوقف می‌کند و مقدار `undefined` را برمی‌گرداند.

**در ادامه این مقاله، برای اختصار، خواهیم گفت که اگر چیزی `null` و `undefined` نباشد، "وجود دارد".**

یا به عبارت دیگر  `value?.prop`:
- اگر `value` وجود داشته باشد، مثل `value.prop` کار می‌کند،
- در غیر اینصورت (زمانی که `value` برابر با `undefined/null` است) مقدار `undefined` را برمی‌گرداند.

کد پایین راهی مطمئن برای دسترسی به `user.address.street` با استفاده از `.?` است:

```js run
let user = {}; // کاربر آدرسی ندارد

alert( user?.address?.street ); // undefined (بدون خطا)
```

حالا کد کوتاه و تمیز است، بدون هیچ تکرار اضافه‌ای.

<<<<<<< HEAD
خواندن ویژگی آدرس با `user?.address` حتی زمانی هم که شیء `user` وجود ندارد هم کار خواهد کرد:
=======
Here's an example with `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // will be null, if there's no element
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

لطفا توجه داشته باشید: سینتکس `.?` مقدارهای قبلی را اختیاری می‌کند نه مقدارهای جلوی آن را.

مثلا در `user?.address.street.name` عبارت ‍`.?` اجازه می‌دهد که `user` برابر با `null/undefined` باشد (و در این صورت `undefined` را برمی‌گرداند)، اما این موضوع فقط برای `user` صادق است. به ویژگی‌های جلویی با سبک معمولی دسترسی پیدا می‌شود. اگر ما می‌خواهیم بعضی از ویژگی‌ها را اختیاری کنیم می‌توانیم تعداد بیشتری از `.` را با `.?` جایگزین کنیم.

```warn header="از زنجیره‌ی اختیاری بیش از حد استفاده نکنید"
ما باید از `.?` فقط زمانی استفاده کنیم که عدم وجود چیزی اشکالی ندارد.

برای مثال، اگر طبق منطق کد ما، شیء `user` باید وجود داشته باشد ولی `address` اختیاری باشد، پس ما باید اینگونه بنویسیم `user.address?.street` نه `user?.address?.street`.
   
بنابراین، اگر تصادفاً ‍`user` برابر با `undefined` باشد، شاهد یک خطای برنامه‌نویسی در مورد آن خواهیم بود و آن را برطرف خواهیم کرد. در غیر این صورت، اگر از `.?` استفاده کنیم، خطاهای کد را می توان در مواردی که مناسب نیست ساکت کرد، و این کار اشکال‌زدایی را دشوارتر می‌کند.
```

````warn header="متغیر قبل از `.?` باید تعریف شده باشد"
اگر متغیر `user` کلا وجود نداشته باشد `user?.anything` خطا می‌دهد:

```js run
// ReferenceError: user is not defined
user?.address;
```
باید متغیر تعریف شده باشد (برای مثال: `let/const/var user` یا به عنوان یک پارامتر تابع). زنجیره‌ی اختیاری فقط برای متغیرهای تعریف شده کار می‌کند.
````

## کوتاه کردن اتصال

همانطور که قبلا گفته شد عبارت `.?` اگر عبارت سمت چپ آن وجود نداشته باشد، فوراً ارزیابی را متوقف می‌کند (اتصال را کوتاه می‌کند).

بنابراین، اگر فراخوانی تابعی یا عملیات دیگری در سمت راست `.?` وجود داشته باشند، اتفاق نمی‌افتند.

برای نمونه:

​```js run
let user = null;
let x = 0;

user?.sayHi(x++); // نمی‌رسد ++x و sayHi وجود ندارد، پس اجرای کد به فراخوانی "user"

alert(x); // 0 :مقدار افزایش نیافته پس
​```

## انواع دیگر: ?.()، ?.[]

زنجیره‌ی اختیاری `.?` یک عمگر نیست بلکه یک ساختار سینتکسی خاص است که با توابع و براکت‌ها نیز کار می‌کند.

برای مثال `().?` برای صدا زدن تابعی که ممکن است وجود نداشته باشد هم کاربرد دارد.

در کد زیر، برخی از کاربران ما متد `admin` را دارند و برخی خیر:

​```js run
let userAdmin = {
  admin() {
    alert("من ادمین هستم");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // من ادمین هستم
*/!*

*!*
<<<<<<< HEAD
userGuest.admin?.(); // هیچی (چنین متدی وجود ندارد)
=======
userGuest.admin?.(); // nothing happens (no such method)
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
*/!*
​```

<<<<<<< HEAD
در اینجا در هر دو خط، ما ابتدا از نقطه (`userAdmin.admin`) برای گرفتن ویژگی ‍`admin` استفاده می‌کنیم به خاطر اینکه شیء ‍`user` حتما وجود دارد پس برای خواندن از آن مطمئن هستیم.
=======
Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the `user` object exists, so it's safe read from it.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

سپس `().?` عبارت سمت چپ را بررسی می‌کند: اگر تابع ‍admin وجود داشته باشد اجرا می‌شود (برای `userAdmin` صدق می‌کند). در غیر اینصورت (برای `userGuest`) ارزیابی بدون خطا متوقف می‌شود.

سینتکس `[].?` نیز کار می‌کند، اگر ما می‌خواهیم از براکت به جای نقطه `.` برای دستیابی به ویژگی‌ها استفاده کنیم. مشابه موارد قبلی، این سینتکس اجازه می دهد تا با خیال راحت یک ویژگی از شیءای که ممکن است وجود نداشته باشد را بخوانیم.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

ما می‌توانیم از `.?` با `delete` هم استفاده کنیم:

```js run
delete user?.name; // را حذف کن user.name وجود داشت user اگر
```

````warn header="ما می‌توانیم از`.?` برای پاک کردن و خواندن مطمئن استفاده کنیم ولی مقداردهی نه."
زنجیره‌ی اختیاری `.?` هیچ کاربردی برای سمت چپ مساوی ندارد.

برای مثال:
```js run
let user = null;

<<<<<<< HEAD
user?.name = "John"; // ارور، کار نمی‌کند
// undefined = "John" :چون اینگونه ارزیابی می‌شود
```

آنقدرها هم هوشمند نیست.
=======
user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"
```

>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
````

## خلاصه

زنجیره‌ی اختیاری `?.`  سه شکل دارد:

1. `obj?.prop` - مقدار ‍‍`obj.prop` را اگر `obj` وجود داشته باشد برمی‌گرداند در غیر اینصورت مقدار `undefined` را برمی‌گرداند.
2. `obj?.[prop]` - مقدار ‍‍`obj.[prop]` را اگر `obj` وجود داشته باشد برمی‌گرداند در غیر اینصورت مقدار `undefined` را برمی‌گرداند.
3. `obj.method()` - ‍‍`obj?.method` را اگر `obj` وجود داشته باشد صدا می‌زند در غیر این صورت مقدار `undefined` را برمی‌گرداند.

همانطور که می‌بینیم، همه آنها برای استفاده ساده و آسان هستند. `.?` سمت چپ را از نظر `null/undefined` بودن بررسی می‌کند و اگر برابر با `null/undefined` نباشد اجازه می‌دهد تا ارزیابی ادامه یابد.

زنجیره‌ای از `.?` امکان دسترسی به ویژگی‌های تودرتو را هم فراهم می‌کند.

<<<<<<< HEAD
با این حال هنوز ما باید `.?` را با دقت اعمال کنیم، فقط درصورتی که وجود نداشتن قسمت سمت چپ قابل قبول باشد. تا اگر ارورهای برنامه‌نویسی رخ دادند، از ما پنهان نباشند.
=======
Still, we should apply `?.` carefully, only where it's acceptable, according to our code logic, that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
