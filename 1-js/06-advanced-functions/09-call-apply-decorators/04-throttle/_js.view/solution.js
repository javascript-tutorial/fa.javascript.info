function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // بخاطر سپردن آخرین آرگومان‌ها برای فراخوانی بعد از کول‌داون
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // در غیر این صورت به حالت کول‌داون برو
    func.apply(this, arguments);

    isThrottled = true;

    // بعد از تأخیر isThrottled زمان‌بندی برای تنظیم مجدد
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // آخرین آن‌ها را دارند savedThis/savedArgs ،اگر فراخوانی‌ای وجود داشت
        // فراخوانی بازگشتی تابع را اجرا می‌کند و کول‌داون را دوباره تنظیم می‌کند
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
