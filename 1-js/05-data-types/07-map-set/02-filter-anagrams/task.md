importance: 4

---

# واروواژه‌ها را جداسازی کنید

[واروواژه‌ها](https://fa.wikipedia.org/wiki/واروواژه) کلمه‌هایی هستند که تعداد برابری از حروف یکسان دارند، اما با ترتیبی متفاوت.

برای مثال:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

یک تابع `aclean(arr)` بنویسید که آرایه‌ای تهی از واروواژه‌ها را برمی‌گرداند.

برای مثال:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" یا "PAN,cheaters,era"
```

از هر گروه واروواژه باید تنها یک کلمه بماند، مهم نیست کدام باشد.
