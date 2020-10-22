# Optional chaining '?.' یا زنجیره ای اختیاری
[recent browser="new"]

###### زنجیره ای اختیاری روشی بدون خطا برای دستیابی به ویژگی های(properties) داخلی شی است حتی در زمانی که ویژگی میانی وجود نداشته باشد


## مشکل

اگر به تازگی شروع به خواندن آموزش و یادگیری جاوا اسکریپت کرده اید ، شاید این مشکل هنوز شما را لمس نکرده اید ، اما این یک مشکل کاملاً رایج است.

برای مثال, بیاید یک شی(object) برای اطلاعات کاربران در نظر بگیریم. تعدادی از کاربران ما آدرس را در ویژگی `user.address` و خیابان را در ویژگی `user.address.street` دارند ولی تعدادی کمی از آن ها آدرس را ارائه نکرده‌اند.

@@@needs translation@@@
@@@old part@@@
در این صورت تلاش ما برای دستیابی به `user.address.street` با شکست مواجه خواهد شد
@@@old part@@@
@@@new part@@@
As an example, consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.
In such case, when we attempt to get `user.address.street`, we may get an error:
@@@new part@@@
@@@needs translation@@@

```js run
let user = {}; // a user without "address" property

alert(user.address.street); // Error!
```

@@@needs translation@@@
@@@old part@@@
این یک خروجی قابل حدس است٬ جاوااسکریپت اینگونه کار میکند٬ ولی در مثال های عملی ترجیح میدهیم ‍``undefined`` دریافت کنیم به جای خطا.

یا مثالی دیگر در توسعه وب٬ ما میخواهیم اطلاعاتی در مورد اِلمانی در صفحه را بگیریم٬ که ممکن بعضی اوقات وجود نداشته باشد :



یا در توسعه وب٬ ما میخواهیم اطلاعاتی در مورد اِلمان در صفحه را بگیریم٬ ولی شاید وجود نداشته باشد :
@@@old part@@@
@@@new part@@@
That's the expected result, JavaScript works like this. As `user.address` is `undefined`, the attempt to get `user.address.street` fails with an error. Although, in many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").

...And another example. In the web development, we may need the information about an element on the page. The element is returned by `document.querySelector('.elem')`, and the catch is again - that it sometimes doesn't exist:
@@@new part@@@
@@@needs translation@@@

```js run
// the result of the call document.querySelector('.elem') may be an object or null
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

@@@needs translation@@@
@@@old part@@@
قبل از اینکه  `?.`  در زبان وجود داشته باشد از عمگر `&&` برای کار در این مورد استفاده میشد. برای مثال :
@@@old part@@@
@@@new part@@@
Once again, we may want to avoid the error in such case.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing it, like this:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

...But that's quite inelegant. As you can see, the `user.address` is duplicated in the code. For more deeply nested properties, that becomes a problem.

E.g. let's try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

```js
let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

That looks awful.

Before the optional chaining `?.` was added to the language, people used the `&&` operator for such cases:
@@@new part@@@
@@@needs translation@@@

```js run
let user = {}; // user has no address

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

@@@needs translation@@@
@@@old part@@@
AND کردن کل مسیر رسیدن به ویژگی ، وجود همه اجزا را تضمین می کند(اگر ارزیابی متوقف نشود) ، اما نوشتن آن دست و پا گیر است.


## زنجیره ای اختیاری
@@@old part@@@
@@@new part@@@
AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn't ideal.

As you can see, the property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

And now, finally, the optional chaining comes to the rescue!
@@@new part@@@
@@@needs translation@@@

زنجیره ای اختیاری `?.` ارزیابی را متوقف میکند  اگر مقدار قبل از قسمت  `?.`  برابر با `undefined` یا `null` باشد و مقدار `undefined` را برمیگرداند.

**در ادامه این مقاله ، به اختصار خواهیم گفت چیزی وجود خواهد داشت اگر که `undefined` و `null`  نباشد.**


@@@needs translation@@@
@@@old part@@@

این یک مسیر امن برای دستیابی  `user.address.street` است :
@@@old part@@@
@@@new part@@@
Here's the safe way to access `user.address.street` using `?.`:
@@@new part@@@
@@@needs translation@@@

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

@@@needs translation@@@
@@@old part@@@


خواندن آدرس با  `user?.address` کار خواهد کرد حتی زمانی هم که  شی `user` وجود ندارد :
@@@old part@@@
@@@new part@@@
The code is short and clean, there's no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn't exist:
@@@new part@@@
@@@needs translation@@@

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

لطفا توجه داشته باشید : سینتکس `?.` مقدارهای قبلی را اختیاری میکند نه مقدارهای جلوی آن را.

در مثال بالا `user?.`  به `user` مقدار `null/undefined` خواهد داد.

@@@needs translation@@@
@@@new part@@@
In the example above, `user?.address.street` allows only `user` to be `null/undefined`.
@@@new part@@@
@@@needs translation@@@


از طرف دیگر ، اگر ‍‍`user` وجود داشته باشد ، پس باید ویژگی `user.address` داشته باشد ، در غیر این صورت `user؟.address.street `در نقطه دوم خطا می دهد.

@@@needs translation@@@
@@@old part@@@
```warn header="از زنجیر اختیاری بیش از حد استفاده تکنید"
@@@old part@@@
@@@new part@@@
For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.
@@@new part@@@
@@@needs translation@@@

ما باید از `?.` فقط زمانی استفاده کنیم که عدم وجود چیزی اشکالی ندارد

به عنوان مثال ، اگر مطابق منطق برنامه نویسی ما ، شی `user` باید وجود داشته باشد ولی `address` اختیاری است در آن شرایط استفاده از `user.address?.street` راه حل بهتری است ،

بنابراین ، اگر تصادفاً به دلیل اشتباهی ‍`user`  برابر با `undefined` باشد، شاهد یک خطای برنامه نویسی در مورد آن خواهیم بود و آن را برطرف خواهیم کرد. در غیر این صورت ، خطاهای کد را می توان در مواردی که مناسب نیست ساکت کرد٬ و کار اشکال زدایی را سخت تر میکند.
```



````warn header="متغیر قبل از ؟. باید تعریف شده باشد" اگر متغیر user به هیچ وجه وجود نداشته باشد `user?.anything` خطا خواهد داد



```js run
// ReferenceError: user is not defined
user?.address;
```
@@@needs translation@@@
@@@old part@@@
باید تعریفی باشد( `let/const/var user `  ). زنجیره ای اختیاری فقط برای متغیرهای تعریف شده کار می کند.
باید `let/const/var user `  وجود داشته باشد. زنجیره ای اختیاری فقط برای متغیرهای تعریف شده کار می کند.
@@@old part@@@
@@@new part@@@
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
````

## Short-circuiting
@@@new part@@@
@@@needs translation@@@

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
```



## ?.(), ?.[] : و موارد دیگر

زنجیره اختیاری `?.`  یک عمگر نیست بلکه یک ساختار سینتکسی خاص است که با توابع و براکت ها نیز کار می کند

برای مثال `?.()` برای صدا زدن تابعی که ممکن است وجود نداشته باشد هم کاربرد دارد

در کد زیر٬ برخی از کاربران ما متد `admin` را دارند و برخی خیر :

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

در اینجا در هر دو خط ما ابتدا از `.`  (`user1.admin`) برای گرفتن ویژگی ‍`admin` استفاده میکنیم به خاطر اینکه شی ‍`user` حتما وجود دارد پس برای خواندن از آن مطمئن هستیم.

سپس `?.()` عبارت سمت چپ را بررسی میکند: اگر تابع ‍`admin` وجود داشته باشد آنرا اجرا میکند(برای ‍`user1`)  در غیر اینصورت(برای `user2`) محاسبات بدون خطا به متوقف میشود.

سینتکس برای حالت `?.[]` نیز کار میکند٬ اگر ما میخواهیم از براکت به جای نقطه برای دستیابی به ویژگی‌ها استفاده کنیم مشابه موارد قبلی ، اجازه می دهد تا با خیال راحت یک ویژگی را از یک شی که ممکن است وجود نداشته باشد،  را بخوانیم.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // Imagine, we couldn't authorize the user

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```



همچنان ما میتوانیم از `?.` در  `delete` هم استفاده کنیم

```js run
delete user?.name; // delete user.name if user exists
```

````warn header="ما میتوانیم از`؟.` برای پاک کردن و خواندن مطمئن استفاده کنیم ولی نوشتن نه."
زنجیره اختیاری `?.` هیچ کاربردی برای سمت چپ مساوی ندارد.


برای مثال:
```js run
let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

آنقدرها هم هوشمند نیست.



## خلاصه

سینتکس `?.`  سه شکل دارد:

1. `obj?.prop` -  مقدار ‍‍`obj.prop` را برمیگرداند اگر `obj` وجود داشته باشد در غیر اینصورت مقدار `undefined`  را برمیگرداند
2. `[obj?.[prop` -  مقدار ‍‍`[obj.[prop` را برمیگرداند اگر `obj` وجود داشته باشد در غیر اینصورت مقدار `undefined`  را برمیگرداند
3. `()obj.method()`  -   ‍‍``obj?.method`` را صدا میزند اگر `obj` وجود داشته باشد در غیر اینصورت مقدار `undefined`  را برمیگرداند


همانطور که می بینیم ، همه آنها ساده و آسان برای استفاده هستند. `?.`  سمت چپ را از نظر `null/undefined` بررسی می کند و اجازه می دهد تا ارزیابی ادامه یابد اگر برابر با  `null/undefined`  نباشد.

زنجیر `?.` امکان دسترسی به خواص تودرتو را فراهم میکند.

با این حال هنوز ما باید `?.` را با دقت اعمال کنیم ، فقط درصورتی قابل قبو است که سمت چپ ممکن است وجود نداشته باشد.

با این حال خطاهای برنامه نویسی را از ما مخفی نمیکند اگر آنها اتفاق بیافتند.