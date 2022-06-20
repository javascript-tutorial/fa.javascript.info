# مقدمه: فراخوان

```
برای نشان دادن استفاده فراخوانها و قول ها و دیگر مفاهیم معنوی از بعضی متد های مرورگر استفاده خواهیم کرد به ویژه بازگذاری اسکریپت ها و اعمال کردن تغییرات ساده در سند.
اگر به این متدها و کاربردشان در مثال ها آشنا نیستید بهتره که از [next part](/document) قسمت های بعدی را بخوانید.
به هر حال ما تلاش میکنیم همه چیز را واضح و شفاف بیان کنیم. و از نظر مرورگر پیچیده نیستند.
``` 

در محیط های جاوااسکریپت برخی توابع ساخته شده اند که به شما اجازه میدهند اعمال و اتفاقات را  به صورت *ناهمگام* برنامه ریزی کنید و انجام دهید.به عبارت دیگر اعنالی را الان تعریف کنیم ولی بعدا انجام شوند.

برای مثال تابع ‍`setTimeout` از این نوع توابع است.

مثال هی واقعیتری نیز از کارهای ناهمگام وجود دارند. مثلا بازگذاری اسکریپت ها و ماژول ها(بعدا توضیح داده میشوند)

یک نگاه به تابع `loadScript(src)` بندازیم که یک اسکریپت را با `src` داده شده بارگذاری میکند.

‍‍‍
 ```js
 function loadScript(src) {
	 //یک تگ تگ اسکریپت میسازد و به صفحه اضافه میکند
	 //باعث میشود که به بارگذاری با منبع داده شده کند و در لحظه تمام شدن آن را اجرا کند
	 let script = document.createElement("script");
	 script.src = src;
	 document.head.append(script);
}
```

این کار یک تگ `<script src="...">` جدید و پویا با `src` داده شده میسازد و به سند اضافه میکند. مرورگر به صورت خودکار این کار را انجام میدهد و در زمان تمام شدن کار آن را اجرا میکند.

میتوانیم به این صورت از این تابع استفادع کنیم

```js
//بازگذاری و اجرای اسکریپت با مسیر داده شده
loadScript("/my/script.js");
```
این اسکریپت *ناهمگام* است یعنی الان شروع به بازگذاری میکند ولی بعدا اجرا میشود (زمانی که کار تابع تمام شد).

اگر کدی بعد از ‍‍`loadScript(...)` وجود داشت تا تمام شدن بارگذاری اسکریپت منتظر نمیماند.

```js
loadScript("/my/script");
//کدهای پس از تابع بارگذاری اسکریپت
//تا تمام شدنش منتظر نمیمانند و اجرا میشوند
// ...
```
خب حالا میخواهیم اسکریپت زمانی که بار گذاری شده استفاده کنیم. این فایل تعدادی تابع جدید تعریف میکند و میخواهیم آنها را اجرا کینم.
اما اگر این کار را فورا بعد از صدا زدن ‍‍`loadScript(...)` انحام دهیم کار نخواهد کرد.

```js
loadScript("/my/script.js"); // شامل function newFunction() {...} است
*!*
newFunction();
*/!*
```
به طور طبیعی مرورگر احتمالا زمان برای بارگذاری ندارد. الان `loadScript` هیج راهی برای فهمیدن تمام شدن بارگذاری ندارد.  اسکریپت بارگذاری و اجرا میشود. فقط همین!! ولی ما میخواهیم بدانیم چه زمانی این اتفاق می افتد تا بتپانیم از توابع و متغیر های جدید استفاده کنیم.
حالا بیاید یک `callback` به عنوان ارگومان دوم به `loadScript` اضافه کنیم که باید زمانی که اسکریپت بارگذاری شد اجرا شود.

```js
function leadScript(src, *!*callback*/!*) {
    let script = document.createElement("script");
    script.src = src;

    *!*
    script.onload = () => callback(script);
    */!*
    document.head.append(script);
}
```
<<<<<<< HEAD
ایده این است که ارگومان دوم یک تابع است (معمولا ناشناس) که زمانیکه عمل به پایان رسید اجرا میشود.
این هم یک مثال قابل اجرا با یک اسکریپت واقعی:
=======

The `onload` event is described in the article <info:onload-onerror#loading-a-script>, it basically executes a function after the script is loaded and executed.

Now if we want to call new functions from the script, we should write that in the callback:

```js
loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  newFunction(); // so now it works
  ...
});
```

That's the idea: the second argument is a function (usually anonymous) that runs when the action is completed.

Here's a runnable example with a real script:
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

```js run
function loadScript(src, callback) {
    let script = docuent.createElement("script");
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

*!*
<<<<<<< HEAD
leadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js", () => {
    alert(`اسکریپت ${script.src} بازگذاری شد`);
    alert( _ ); //تابع تعریف شده در اسکریپت بارگذاری شده
=======
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
});
*/!*
```

به این روش روشِ"مبتنی بر پاسخگویی" (callback-based) برای برنامه نویسی ناهمگام میگویند. در یک تابع که کاری را به صورت ناهمگام انجام میدهد باید یک ارگومان برای تابع فراخوان تعریف کنیم که تابعی است که که پس از اتمام کار ناهمگام اجرا میشود.

این روش را روی `loadScript` پیاده کردیم. قطعا این یک استفاده عمومی است.

## فراخوان در فراخوان

چگونه میتوانیم دو اسکریپت را به پشت سر هم بارگذاری کنیم: ابتدا اولی و سپس دومی پس از آن ؟
راه حل طبیعی این است که تابع `loadScript` دوم را به عنوان تابع فراخوان استفاده کنیم. به این صورت:

```js
loadScript("/my/script.js" , function(script) {
    alert(`اسکریپت ${script.src} بارگذاری شد. حال یک اسکریپت دیگر!`);
    *!*
    loadScript("/my/script2.js", function(script) {
        alert(`اسکریپت دوم هم بارگذاری شد`);
    });
    */!*
});
```

بعد از اتمام `loadScript` بیرونی فراخوان اول اجرا میشود.

حال اگر باز هم اسکریپت دیگری بخواهیم چی ...؟

```js
loadScript("/my/script.js", function(script) {
    loadScript("/my/script2.js", function(script) {
        *!*
        loadScript("/my/script3.js", function(script) {
            //... تا زمانی که تمام اسکریپت ها بارگذاری شوند
        });
        */!*
    });
});
```
پس همه کار ها درون توابع فراخوان هستند. این روش برای کارهای کم خوب است اما برای تعداد بیشتر و سنگینتر اصلا مناسب نیستند. در آینده روش های دیگری را خواهیم دید.

## مدیریت خطاها

در مثال های بالا هیچ خطایی را درنظر نگرفته بودیم. اگر بارگذاری با مشکل مواجه شود چی؟ فراخوانی های ما باید بتوانند نسبت به آن واکنش نشان بدهند.
اینجا یک نسخه بهتر شده از `loadScript` را میبینیم که خطاها را دنبال میکند:

```js
function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;

    *!*
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`خطا در بارگذاری ${src}`));
    */!*

    document.head.append(script);
}
```

برای موفقیت `callback(null, script)` صدا زده میشود و برای هر حالت دیگر `callback(error)`.

به این صورت استفاده میشود: 
```js
loadScript("/my/script.js", function(error, script) {
    if (error) {
        // مدیریت خطاها
    }else {
        // اسکریپت با موفقیت بارگذاری شده است
    }
});
```

بار دیگر این روش که برای `loadScript` استفاده شد کاملا معمول است. که به روشِ "error-first callback" میگویند.

به طور قراردادی این شکلی است که: 
1. آرگومان اول در `callback` برای خطا تعبیه شده است که اگر خطایی رخ داد ان را مدیریت کند. سپس `callback(err)` صدا زده میشود.
2. آرگومان دوم در `callback` برای موفقیت تعبیه شده است. سپس `callback(null, result1, reuslt2)` صدا زده میشود.

پس یک تابع `callback` برای هر دوحالت گزارش کردن خطاها و برگرداندن نتایج درست استفاده میشود.

## هرم عذاب

در نگاه اول این روش برای نوشتن کدهای ناهمگام پایدار بنظر می‌رسد. که واقعا هم این چنین است. برای نهایتا یک یا دو فراخوانی تودرتو خوب بنظر می‌رسد.

اما برای چندین عمل ناهمگام که یکی پس از دیگری اتفاق می‌افتد کدی شبیه به این خواهیم داشت:

```js
loadScript("1.js", function(error, script) {
    if(error) {
        handleError(error);
    }else {
        //...
        loadScript("2.js", function(error, script) {
            if(error) {
                handleError(error);
            }else {
                //...
                loadScript("3.js", function(error, script) {
                    if(error) {
                        handleError(error);
                    }else {
                        *!*
                        //... تا زمانی که همه اسکریپت ها بارگذاری شوند ادامه داد
                        */!*
                    }
                });
            }
        });
    }
});
```
در قطعه کد بالا داریم:
1. `1.js`را بارگذاری می‌کنیم سپس  اگر خطایی نداشت 
2. `2.js`را بارگذاری می‌کنیم سپس  اگر خطایی نداشت
3. `3.js` را بارگذاری می‌کنیم سپس  اگر خطایی نداشت  -- کار دیگری انجام می‌دهیم`(*)`

هرچقدر فراخوانی‌ها بیشتر تودرتو می‌شوند، کدها عمیق‌تر و برای مدیریت دشوارتر می‌شوند مخصوصا اگر به جای `...` کدهای واقعی داشته باشیم که خود ممکن است شامل حلقه‌ها و شرط‌ها و هر چیز دیگری باشند.

که معمولا به آن "جهنم فراخوانی" (callback-hell / pyramid of doom) میگویند.

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

![](callback-hell.svg)

هرم صدا زدن های تودرتو با هر عمل ناهمگام رشد میکند و به سرعت از کنترل خارج میشود.
در نتیجه این روش زیاد خوب نیست.
ما میتوانیم با استفاده روش زیر کمی این مشکل را سبکتر و قابل کنترل کنیم:

```js
loadScript("1.js", step1);

function step1(error, script) {
    if(error) {
        handleError(error);
    }else {
        //...
        loadScript("2.js", step2);
    }
}

function step3(error, script) {
    if(error) {
        handleError(error);
    }else {
        //...
        loadScript("3.js", step3);
    }
}

function step3(error, script) {
    if(error) {
        handleError(error);
    }else {
        //... تا زمانی که همه اسکریپت ها بارگذاری شوند ادامه داد
    }
}
```
همانطور که مشاهده می‌کنید نتیجه تغییری نکرد ولی از تودرتو بودن فراخوانی‌ها با تعریف کردن توابع به صورت جداگانه برای هر مرحله از تودرتو بودن عمیق جلوگیری کردیم.

این روش کار می‌کند ولی کدش تکه تکه و جدا از هم است. خواندن آن دشوارتر است و احتمالا متوجه شدید که لازم است در حین خواندن از جایی به جای دیگر بپرید. اینگونه اصلا مناسب نیست مخصوصا اگر به کد آشنا نباشید و ندانید برای ادامه باید کجای کد را بخوانید.

همچنین توابعِ `step*` فقط یکبار استفاده میشوند و فقط برای جلوگیری از بوجود امدن جهنم فراخوانی و تودرتویی بیش از حد تعریف شده اند که باعث بی نظمی زیادی در کد میشوند.

ما نیاز داریم تا روش بهتری برای اینکار پیدا کنیم.

خوشبختانه راه‌های دیگری برای حل این مشکل وجود دارند. یکی از بهترین آن‌ها "قول"ها(promises) هستند که در فصل بعدی توضیح داده شده است.
