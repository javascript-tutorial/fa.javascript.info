importance: 5

---

# Modal form

یک function `showPrompt(html, callback)` ایجاد کنید که فرمی با پیام `html`، یک input field و دکمه‌های `OK/CANCEL` داشته باشد.

- یک کاربر باید چیزی را در tex field تایپ کند و `key:Enter` را فشار دهد، آنگاه `callback(value)` با مقداری که وارد شده است فراخوانی می‌شود. 
- در غیر این صورت اگر کاربر `key:Esc` یا CANCEL را فشار دهد، `callback(null)` فراخوانی می‌شود.

در هر دو صورت،‌این فرآیند input را تمام میکند و فرم را پاک میکند.

ملزومات:

- فرم باید در وسط پنجره باشد.
- فرم یک *modal* است. به عبارت دیگر، تا زمانی که کاربر آن را نبندد، هیچ تعاملی با بقیه‌ی صفحه مجاز نیست.
- وقتی فرم نمایش داده می‌شود، focus برای کاربر باید درون `<input>` باشد.
- کلیدهای `key:Tab`/`key:Shift+Tab` باید فوکوس را بین form fieldها جابه‌جا کنند و اجازه ندهند که به عناصر دیگر صفحه برود.

مثال از استفاده:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

نسخهی نمایشی در iframe:

[iframe src="solution" height=160 border=1]

پی‌نوشت: کد source documentای که ارائه شده HTML/CSS برای فرم با fixed positioning را دارد، اما این بر عهده‌ی شماست که آن را به modal تبدیل کنید.
