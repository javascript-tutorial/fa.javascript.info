پاسخ: **نه قعال نخواهد شد**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

همانطور که در همین فصل گفته شد، یک «`try..catch` واضح» دور کد تابع وجود دارد. پس تمام ارورهای همگام مدیریت می‌شوند.

اما اینجا ارور زمانی که اجرا کننده اجرا می‌شود تولید نمی‌شد بلکه بعدتر ایجاد شد. پس promise نمی‌تواند آن را مدیریت کند.
