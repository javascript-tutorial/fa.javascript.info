
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

...و مثالی دیگر، در توسعه وب، ما می‌توانیم یک شیء که با یک المان در صفحه مطابقت دارد را با استفاده از یک متد خاص، مانند `document.querySelector('.elem')` بگیریم و این متد هنگامی که چنین المانی وجود نداشته باشد `null` را برمی‌گرداند:

```js run
// document.querySelector('.elem') خواهد شد اگر المنت وجود نداشته باشد null برابر با
let html = document.querySelector('.elem').innerHTML; // باشد خطا خواهد داد null اگر
```

باری دیگر، اگر اِلمان وجود نداشته باشد ما با مقدار NULL نمی‌توانیم به  `.innerHTML` دسترسی داشته باشیم. و در بعضی موارد، وقتی که نبودِ اِلمان طبیعی است، ما می‌خواهیم از خطا جلوگیری کنیم و فقط `html = null` را قبول کنیم. 

چگونه می‌توانیم این کار را انجام دهیم؟

راه‌حل واضح این است که قبل از اینکه  به ویژگی آن دسترسی پیدا کنیم، مقدار آن را با `if` یا عمگر شرطی `?` بررسی کنیم، به این صورت:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

الان بدون خطا کار می‌کند... ولی اصلا زیبا نیست. همانطور که می‌بینید `"user.address"` دوبار در کد تکرار شده است. برای دسترسی به ویژگی‌هایی با تو در تویی زیاد نیاز به تکرار بیشتری لازم است و این مشکل ایجاد می‌کند. 

برای مثال بیاید مقدار `user.address.street.name` را بگیریم.

ما باید هم `user.address` و `user.address.street` را بررسی کنیم:

```js
let user = {}; // کاربر آدرسی ندارد

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

این افتضاح است، یک نفر ممکن است حتی با درک این کد مشکل داشته باشد.

حتی اهمیتی هم ندارد، چون راه بهتری برای نوشتن آن وجود دارد، با استفاده از عملگر `&&`:

```js run
let user = {}; // کاربر آدرسی ندارد

alert( user.address && user.address.street && user.address.street.name ); // undefined (بدون خطا)
```

استفاده از AND در کل مسیر رسیدن به ویژگی، وجود همه اجزا را تضمین می‌کند (اگر این چنین نباشد، ارزیابی متوقف می‌شود)، اما آن هم ایده‌آل نیست.

همانطور که می‌بینید نام ویژگی‌ها همچنان در کد تکرار می‌شوند. به طور مثال در قطعه کد بالا `user.address` سه بار تکرار شده است.

به همین دلیل زنجیره‌ی اختیاری `.?` به زبان اضافه شد. تا این مشکل را برای همیشه برطرف کند!

## زنجیره ای اختیاری

زنجیره ای اختیاری `?.` ارزیابی را متوقف میکند  اگر مقدار قبل از قسمت  `?.`  برابر با `undefined` یا `null` باشد و مقدار `undefined` را برمیگرداند.

**در ادامه این مقاله ، به اختصار ، خواهیم گفت که اگر چیزی `null` و `undefined` نباشد ، "وجود دارد".**



یا به عبارت دیگر  `value?.prop` :

@@@needs translation@@@
@@@old part@@@
- برابر است با `value.prop` اگر `value‍` وجود داشته باشد
@@@old part@@@
@@@new part@@@
The optional chaining `?.` stops the evaluation if the value before `?.` is `undefined` or `null` and returns `undefined`.
@@@new part@@@
@@@needs translation@@@

- در غیر اینصورت (زمانی که `value` برابر با `undefined/null` است) مقدار `value` را برمیگرداند.

@@@needs translation@@@
@@@new part@@@
In other words, `value?.prop`:
- works as `value.prop`, if `value` exists,
- otherwise (when `value` is `undefined/null`) it returns `undefined`.
@@@new part@@@
@@@needs translation@@@

`.?` این یک دسترسی مطمئن به `user.address.street`  است.

```js run
let user = {}; // کاربر بدون آدرس

alert( user?.address?.street ); // undefined (no error)
```

حالا کد کوتاه و تمیز است و بدون هیچ تکرار اضافه‌ای

خواندن ویژگی(property) آدرس با  `user?.address` کار خواهد کرد حتی زمانی هم که  شی(آبجکت) `user` وجود ندارد :

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

لطفا توجه داشته باشید : سینتکس `?.` مقدارهای قبلی را اختیاری میکند نه مقدارهای جلوی آن را.

@@@needs translation@@@
@@@old part@@@
در مثال بالا `user?.`  به `user` مقدار `null/undefined` خواهد داد.
@@@old part@@@
@@@new part@@@
E.g. in `user?.address.street.name` the `?.` allows `user` to safely be `null/undefined` (and returns `undefined` in that case), but that's only for `user`. Further properties are accessed in a regular way. If we want some of them to be optional, then we'll need to replace more `.` with `?.`.
@@@new part@@@
@@@needs translation@@@

در مثال بالا  `user?.address.street`  فقط به  `user‍`  اجازه میدهد که `null/undefined` باشد. مثلا در این کد `user?.address.street.name`  عبارت ‍`.?` اجازه میدهد که `user` برابر با `null/undefined`  باشد. این همه کاری است که انجام میدهد. ویژگی های جلویی به سبک معمولی به ویژگی ها دسترسی دارند.اگر ما میخواهیم بعضی از ویژگی ها را اختیاری کنیم میتوانیم تعداد بیشتری از `.` را با `.?` جایگزین کنیم



از طرف دیگر ، اگر ‍‍`user` وجود داشته باشد ، پس باید ویژگی `user.address` داشته باشد ، در غیر این صورت `user؟.address.street `در نقطه دوم خطا می دهد.

```warn header="از زنجیر اختیاری بیش از حد استفاده تکنید"
ما باید از `?.` فقط زمانی استفاده کنیم که عدم وجود چیزی اشکالی ندارد.
برای مثال اگر طبق منطق و لاجیک ما باید شی(object)`user` وجود داشته باشد ولی `address` اختیاری است. 
   پس ما باید اینگونه بنویسیم `user.address?.street` نه `user?.address?.street`
   
بنابراین ، اگر تصادفاً به دلیل اشتباهی ‍`user`  برابر با `undefined` باشد، شاهد یک خطای برنامه نویسی در مورد آن خواهیم بود و آن را برطرف خواهیم کرد. در غیر این صورت ، خطاهای کد را می توان در مواردی که مناسب نیست ساکت کرد٬ و این کار اشکال زدایی را سخت تر میکند.
```



````warn header="متغیر قبل از ؟. باید تعریف شده باشد" اگر متغیر user به هیچ وجه وجود نداشته باشد `user?.anything` خطا خواهد داد



```js run
// ReferenceError: user is not defined
user?.address;
```
باید متغیر تعریف شده باشد( `let/const/var user ` یا توابع  ). زنجیره ای اختیاری فقط برای متغیرهای تعریف شده کار می کند.
	

````
## اتصال کوتاه

همانطور که قبلا گفته شد عبارت `?.` فوراً ارزیابی را متوقف میکند(اتصال کوتاه) اگر عبارت سمت چپ آن وجود نداشته باشد.
بنابراین ، اگر صدا زدن تابعی یا عوارض جانبی دیگری وجود داشته باشد ، اتفاق نمی‌افتد.

برای نمونه :

​```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

alert(x); // 0, value not incremented
​```



## ?.(), ?.[] : و موارد دیگر

زنجیره اختیاری `?.`  یک عمگر نیست بلکه یک ساختار سینتکسی خاص است که با توابع و براکت ها نیز کار می کند

برای مثال `?.()` برای صدا زدن تابعی که ممکن است وجود نداشته باشد هم کاربرد دارد

در کد زیر٬ برخی از کاربران ما متد `admin` را دارند و برخی خیر :

​```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // هیچی (هیچ متدی نیست)
*/!*
​```

در اینجا در هر دو خط ما ابتدا از `.`  (`user1.admin`) برای گرفتن ویژگی ‍`admin` استفاده میکنیم به خاطر اینکه شی ‍`user` حتما وجود دارد پس برای خواندن از آن مطمئن هستیم.

سپس `?.()` عبارت سمت چپ را بررسی میکند: اگر تابع ‍`admin` وجود داشته باشد آنرا اجرا میکند(برای ‍`user1`)  در غیر اینصورت(برای `user2`) محاسبات بدون خطا به متوقف میشود.

سینتکس برای حالت `?.[]` نیز کار میکند٬ اگر ما میخواهیم از براکت به جای نقطه برای دستیابی به ویژگی‌ها استفاده کنیم مشابه موارد قبلی ، اجازه می دهد تا با خیال راحت یک ویژگی را از یک شی که ممکن است وجود نداشته باشد،  را بخوانیم.

​```js run
```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; // فکر کنید کاربر احراز هویت نشده است

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

همچنان ما میتوانیم از `?.` در  `delete` هم استفاده کنیم

​```js run
delete user?.name; // delete user.name if user exists

​```
​````warn header="ما میتوانیم از`؟.` برای پاک کردن و خواندن مطمئن استفاده کنیم ولی نوشتن نه."
زنجیره اختیاری `?.` هیچ کاربردی برای سمت چپ مساوی ندارد.


برای مثال:
​```js run
let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
​```

آنقدرها هم هوشمند نیست.

````





## خلاصه

سینتکس `?.`  سه شکل دارد:

حالت اول »  `obj?.prop` -  مقدار ‍‍`obj.prop` را برمیگرداند اگر `obj` وجود داشته باشد در غیر اینصورت مقدار `undefined`  را برمیگرداند

حالت دوم » `[obj?.[prop` -  مقدار ‍‍`[obj.[prop` را برمیگرداند اگر `obj` وجود داشته باشد در غیر اینصورت مقدار `undefined`  را برمیگرداند

حالت سوم » `()obj.method()`  -   ‍‍``obj?.method`` را صدا میزند اگر `obj` وجود داشته باشد در غیر اینصورت مقدار `undefined`  را برمیگرداند


همانطور که می بینیم ، همه آنها ساده و آسان برای استفاده هستند. `?.`  سمت چپ را از نظر `null/undefined` بررسی می کند و اجازه می دهد تا ارزیابی ادامه یابد اگر برابر با  `null/undefined`  نباشد.

زنجیر `?.` امکان دسترسی به خواص تودرتو را هم فراهم میکند.

با این حال هنوز ما باید `?.` را با دقت اعمال کنیم ، فقط درصورتی قابل قبول است که سمت چپ ممکن است وجود نداشته باشد.

@@@needs translation@@@
@@@old part@@@
با این حال خطاهای برنامه نویسی را از ما مخفی نمیکند اگر آنها اتفاق بیافتند.
@@@old part@@@
@@@new part@@@
Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
@@@new part@@@
@@@needs translation@@@
