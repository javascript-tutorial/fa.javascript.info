importance: 5

---

# دکوراتور جلوگیرنده

یک دکوراتور «جلوگیرنده» `throttle(f, ms)` بسازید که یک دربرگیرنده را برمی‌گرداند.

زمانی که چند بار فراخوانی شد، فقط یک بار به ازای هر `ms` میلی‌ثانیه `f` را فرا می‌خواند.

تفاوت این تابع با معلق‌کننده این است که کاملا یک دکوراتور متفاوت است:
- `debounce` تابع را بعد از مدت «آرام‌شدن» اجرا می‌کند. برای پردازش نتیجه نهایی خوب است.
- `throttle` هر بار بعد از گذشت `ms` میلی‌ثانیه تابع را اجرا می‌کند. برای بروزرسانی‌های منظم که نباید زیاد انجام شوند خوب است.

به عبارتی دیگر، `throttle` مانند یک منشی است که تماس‌های تلفنی را می‌پذیرد اما پس از `ms` میلی‌ثانیه فقط یک بار مزاحم رئیس می‌شود (تابع واقعی `f` را فراخوانی می‌کند).

بیایید کاربردی واقعی را بررسی کنیم تا این نیاز و دلیل وجود آن را بهتر متوجه شویم.

**برای مثال، ما می‌خواهیم حرکت‌های موس را زیر نظر بگیریم.**

در مرورگر می‌توانیم یک تابع را پیاده‌سازی کنیم تا با هر حرکت موس اجرا شود و همانطور که موس تکان می‌خورد موقعیت آن را دریافت کند. در حین استفاده از موس، این تابع معمولا به طور مکرر اجرا می‌شود و می‌تواند چیزی مثل 100 بار در ثانیه باشد (هر 10 میلی‌ثانیه).
**ما می‌خواهیم زمانی که اشاره‌گر تکان می‌خورد اطلاعاتی را در صفحه وب بروزرسانی کنیم.**

...اما بروزرسانی تابع `update()` در هر حرکت بسیار کوچک خیلی کار سنگینی است. دلیلی منطقی هم برای برورسانی آن زودتر از هر 100 میلی‌ثانیه وجود ندارد.

پس ما آن را درون یک دکوراتور قرار می‌دهیم: به جای تابع اصلی `update()` از `throttle(update, 100)` به عنوان تابع اجرایی در هر حرکت موس استفاده می‌کنیم. دکوراتور اکثر مواقع فرا خوانده می‌شود اما فراخوانی را هر 100 میلی‌ثانیه به `update()` ارسال می‌کند.

از لحاظ بصری، اینگونه به نظر خواهد رسید:

1. برای اولین حرکت موس تابع دکور شده بلافاصله فراخوانی را به `update` ارسال می‌کند. این مهم است که کاربر واکنش ما نسبت به حرکت خود به سرعت ببیند.
2. سپس همانطور که موس حرکت می‌کند، تا قبل از `100ms` میلی‌ثانیه چیزی اتفاق نمی‌افتد. تابع دکوراتور فراخوانی‌ها را نادیده می‌گیرد.
3. زمانی که `100ms` تمام می‌شود، یک بروزرسانی بیشتر `update` با آخرین مختصات اتفاق می‌افتد.
4. سپس، بالاخره، موس جایی متوقف می‌شود. تابع دکور شده صبر می‌کند تا `100ms` تمام شود و سپس `update` را همراه با آخرین مختصات اجرا می‌کند. پس خیلی مهم است که آخرین مختصات موس پردازش شود.

یک مثال از کد:

```js
function f(a) {
  console.log(a);
}

// منتقل می‌کند f فراخوانی‌ها را هر 1000 میلی‌ثانیه به f1000 تابع
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (از فراخوانی جلوگیری می‌کند، هنوز 1000 میلی‌ثانیه نشده است)
f1000(3); // (از فراخوانی جلوگیری می‌کند، هنوز 1000 میلی‌ثانیه نشده است)

// ...زمانی که 1000 میلی‌ثانیه تمام می‌شود
// عدد 3 را نشان می‌دهد، مقدار میانی 2 نادیده گرفته شد...
```

پی‌نوشت: آرگومان‌ها و زمینه `this` که به `f1000` داده می‌شوند باید به `f` اصلی منتقل شوند.
