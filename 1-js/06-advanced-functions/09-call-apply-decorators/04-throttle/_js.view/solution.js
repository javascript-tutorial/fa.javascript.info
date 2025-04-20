function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // بخاطر سپردن آخرین آرگومان‌ها برای فراخوانی بعد از آرام‌شدن
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // در غیر این صورت به حالت آرام‌شدن برو
    func.apply(this, arguments);

    isThrottled = true;

    // بعد از تأخیر isThrottled زمان‌بندی برای تنظیم مجدد
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // آخرین آن‌ها را دارند savedThis/savedArgs ،اگر فراخوانی‌ای وجود داشت
        // فراخوانی بازگشتی تابع را اجرا می‌کند و حالت آرام‌شدن را دوباره تنظیم می‌کند
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
