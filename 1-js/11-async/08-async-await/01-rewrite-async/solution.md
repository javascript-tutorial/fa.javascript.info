
نکات پایین کد قرار دارند:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

نکات:

۱. تابع `loadJson` به `async` تغییر کرد.

۲. تمام `then.` ها با `await` جایگزین شده اند.

۳. ما می توانیم بجای صبر کردن برای نتیجه، مستقیما آن `return response.json()` را برگردانیم؛ مانند زیر:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    بنابراین کد بیرونی باید برای اجرا شدن Promise از `await` استفاده کند. در مثال ما خیلی اهمیت ندارد.
۵. خطای ایجاد شده از `loadJson` توسط `catch.` مدیریت می شود. ما نمی توانیم به صورت `(...)await loadJson` استفاده کنیم، زیرا ما در هیچ تابع `async` ای نیستیم.
