importance: 5

---

# کدام کنترل‌کننده اجرا شود؟

یک دکمه درون  متغیر ذخیره شده. ولی هیچ کنترل‌کننده به آن اختصاص نیافته.

با توجه به کد زیر، کدام کنترل‌کننده بعد از کلیک اجرا می‌شود؟ کدوم پیغام نمایش داده می‌شود؟

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
