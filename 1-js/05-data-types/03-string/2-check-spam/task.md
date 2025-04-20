importance: 5

---

# بررسی هرزنامه

یک تابع `checkSpam(str)` بنویسید که اگر `str` دارای کلمات 'viagra' یا 'XXX' باشد مقدار `true` را برگرداند، در غیر این صورت `false`.

تابع نباید به بزرگی یا کوچکی حرف حساس باشد:

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```

