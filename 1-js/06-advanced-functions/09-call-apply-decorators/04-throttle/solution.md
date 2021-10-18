```js
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

فراخوانی `throttle(func, ms)` تابع `wrapper` را برمی‌گرداند.

1. در حین اولین فراخوانی، تابع `wrapper` فقط `func` را اجرا می‌کند و وضعیت آرام‌شدن را تنظیم می‌کند (`isThrottled = true`).
2. در این حالت، تمام فراخوانی‌ها در `savedArgs/savedThis` ذخیره می‌شوند. لطفا در نظر داشته باشید که هم زمینه و هم آرگومان‌ها به یک اندازه مهم هستند و باید به یاد سپرده شوند. ما برای اینکه فراخوانی جدید بسازیم به هر دوی آن‌ها نیاز داریم.
3. بعد از اینکه `ms` میلی‌ثانیه طی شد، `setTimeout` فعال می‌شود. حالت آرام‌شدن حذف می‌شود (`isThrottled = false`) و اگر ما فراخوانی نادیده‌گرفته‌شده‌ای داشتیم، `wrapper` همراه با آخرین آرگومان‌ها و زمینه ذخیره شده اجرا می‌شود.

مرحله سوم `wrapper` را اجرا می‌کند نه `func` را، چون ما نه تنها نیاز داریم که `func` را اجرا کنیم بلکه باید دوباره به حالت آرام‌شدن برگردیم و زمان‌بندی را برای تنظیم مجدد آن پیاده‌سازی کنیم.
