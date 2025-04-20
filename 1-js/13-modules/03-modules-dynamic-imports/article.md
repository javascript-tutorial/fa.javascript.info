# Import پویا

عبارات Export و Import که در بخش‌های قبلی بررسی کردیم "ایستا (static)" نامیده می‌شوند. ساختار آنها بسیار ساده و سخت‌گیرانه است.

اول اینکه، نمی‌توانیم پارامترهای `import` را به صورت پویا تولید کنیم.

مسیر ماژول باید یک رشته ابتدایی باشد، نمی تواند یک فراخوانی تابع باشد. این کار نمی‌کند:

```js
import ... from *!*getModuleName()*/!*; // Error, only from "string" is allowed
```

دوم اینکه، نمی‌توانیم به صورت شرطی یا در زمان اجرا آن را import کنیم:

```js
if(...) {
  import ...; // !خطا، مجاز نیست
}

{
  import ...; // را در هر بلوکی قرار دهیم import خطا، نمی‌توانیم
}
```

زیرا `import`/`export` قصد دارد ستون فقراتی برای ساختار کد فراهم کنند. این یک چیز خوب است، زیرا ساختار کد قابل تجزیه و تحلیل است، ماژول ها را می‌توان با ابزارهای ویژه در یک قالب یک فایل جمع آوری کرد، export های استفاده نشده می‌توانند حذف شوند ("tree-shaken"). این‌ها فقط به این خاطر امکان‌پذیر است که ساختار imports/exports ساده و ثابت است.

اما چگونه می‌توان یک ماژول را به صورت پویا، بنا به نیازمان import کنیم؟

## عبارت import()‎

عبارت `import(module)` ماژول را بارگذاری می‌کند و یک promise برمی‌گرداند که به یک شی حاوی همه export های ماژول تبدیل می‌شود. می‌توان آن را در هر جایی از کد صدا زد. (به تفاوت ظاهری آن با import های ایستا دقت کنید)

می‌توانیم آن را به صورت پویا در هر جای کد استفاده کنیم، به عنوان مثال:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

یا، می‌توانیم `let module = await import(modulePath)` را درون یک تابع هنگام (async) استفاده کنیم.

به عنوان مثال، اگر ماژول `say.js` را به شرح زیر داشته باشیم:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

آنگاه import پویا می‌تواند مانند این باشد:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

یا اگر `say.js` دارای export پیش‌فرض باشد:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

آنگاه برای دسترسی به آن، می‌توانیم از خاصیت `default` شیء ماژول استفاده کنیم:

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

مثال کامل:

[codetabs src="say" current="index.html"]

```smart
import پویا در اسکریپت‌های معمولی هم کار می‌کنند، نیازی به `script type="module"‎` ندارند.
```

```smart
اگرچه import()‎ شبیه یک تابع به نظر می‌رسد، ولی ساختار ویژه‌ای است که تصادفاً از پرانتز استفاده می‌کند (مشابه `super()‎`).

پس نمی‌توانیم آن را به یک متغیر اختصاص دهیم یا از `call/apply` در رفتار با آن استفاده کنیم. تابع نیست.
```
