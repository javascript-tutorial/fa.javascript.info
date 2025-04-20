```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

فراخوانی `debounce` یک دربرگیرنده را برمی‌گرداند. زمانی که فرا خوانده شد، زمان‌بندی می‌کند که تابع اصلی بعد از مدت `ms` داده شده فراخوانی شود و زمان‌بندی قبلی را لغو می‌کند.

