# رمزگشای متن و رمزگذار متن

اگر داده‌ی دودویی ما درواقع یک رشته باشد چه؟ برای نمونه، ما یک فایل با داده‌ی متنی دریافت می‌کنیم.

شی رمزگشای متن([TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder)) درونی، به یک نفر اجازه می‌دهد که با توجه به بافر و رمزگذاری داده شده، مقدار را در یک رشته‌ی واقعی جاوااسکریپت بخواند.

ابتدا ما نیاز به ساخت آن داریم:
```js
let decoder = new TextDecoder([label], [options]);
```

- شی **`label`** -- رمزگذاری، به طور پیش فرض `utf-8` است اما `big5` و `windows-1251` و برخی دیگر از رمزگذارای‌ها نیز پشتیبانی می‌شوند.
- شی **`options`** -- شی اختیاری:
  - شی **`fatal`** -- از جنس boolean. اگر مقدار آن `true` باشد، یک استثنا(exception) برای کاراکتر غیرقابل قبول (غیرقابل رمزگشایی) پرتاب می‌شود. در غیر این صورت (که حالت پیش‌فرض می‌باشد)، آن‌ها را با کاراکتر `\uFFFD` جایگذاری می‌کند.
  - شی **`ignoreBOM`** -- از جنس boolean. اگر مقدار آن `true` باشد، BOM(یک علامت unicode اختیاری مرتب شده برحسب بایت) که به ندرت به آن نیاز پیدا می‌شود را نادیده می‌گیرد.

...و سپس رمزگشایی کنید:

```js
let str = decoder.decode([input], [options]);
```

- شی **`input`** -- برای رمزگشایی (`BufferSource`)منبع
- شی **`options`** -- شی اختیاری:
  - شی **`stream`** -- برای رمزگشایی streamها، هنگامی که رمزگشا برای مقادیر قابل توجه داده‌ها مکررا فراخوانی می‌شود، درست است. در این مورد، ممکن است یک کاراکتر چند بایتی، برخی مواقع بین بخش‌هایی از داده‌ها تقسیم شود. این امکان به رمزگشای متن می‌گوید که کاراکترهای "ناتمام" را به خاطر داشته باشد و هنگامی که بخش بعدی داده وارد شد، آن‌ها را رمزگشایی کند.

برای نمونه:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

ما می‌توانیم بخشی از یک بافر را با ساخت یک view زیرآرایه برای آن، رمزگشایی کنیم:


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// رشته در وسط می‌باشد
// جدید روی آن، بدون کپی کردن چیزی view ساخت یک
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## رمزگذار متن

شی رمزگذار متن([TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder)) برعکس کار را انجام می‌دهد -- یک رشته را به بایت‌ها تبدیل می‌کند.

سینتکس آن به صورت زیر است:

```js
let encoder = new TextEncoder();
```

تنها رمزگذاری‌ای که رمزگذار متن از آن پشتیبانی می‌کند "utf-8" می‌باشد.

رمزگذار متن دو متد دارد:
- متد **`encode(str)`** -- از یک رشته، `Uint8Array` را برمیگرداند.
- متد **`encodeInto(str, destination)`** -- رشته‌ی `str` را درون `destination` که باید `Uint8Array` باشد، رمزگذاری می‌کند.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
