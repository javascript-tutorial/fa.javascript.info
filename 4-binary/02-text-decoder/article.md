# رمزگشای متن و رمزگذار متن

اگر داده‌ی دودویی ما درواقع یک رشته باشد چه؟ برای نمونه، ما یک فایل با داده‌ی متنی دریافت می‌کنیم.

شی رمزگشای متن([TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder)) درونی، به یک نفر اجازه می‌دهد که با توجه به بافر و رمزگذاری داده شده، مقدار را در یک رشته‌ی واقعی جاوااسکریپت بخواند.

ابتدا ما نیاز به ساخت آن داریم:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- و برخی دیگر از رمزگذارای‌ها نیز پشتیبانی می‌شوند `windows-1251` و `big5` است اما `utf-8` رمزگذاری، به طور پیش فرض
- **`options`** -- :شی اختیاری
  - **`fatal`** -- جایگذاری می‌کند `\uFFFD` برای کاراکتر غیرقابل قبول (غیرقابل رمزگشایی) پرتاب می‌شود. در غیر این صورت (که حالت پیش‌فرض می‌باشد)، آن‌ها را با کاراکتر (exception)باشد، یک استثنا `true` اگر مقدار آن .boolean از جنس
  - **`ignoreBOM`** -- اختیاری مرتب شده برحسب بایت) که به ندرت به آن نیاز پیدا می‌شود را نادیده می‌گیرد unicode یک علامت)BOM ،باشد `true` اگر مقدار آن .boolean از جنس

...و سپس رمزگشایی کنید:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- برای رمزگشایی (`BufferSource`)منبع
- **`options`** -- :شی اختیاری
  - **`stream`** -- ها، هنگامی که رمزگشا برای مقادیر قابل توجه داده‌ها مکررا فراخوانی می‌شود، درست است. در این مورد، ممکن است یک کاراکتر چند بایتی، برخی مواقع بین بخش‌هایی از داده‌ها تقسیم شود. این امکان به رمزگشای متن می‌گوید که کاراکترهای "ناتمام" را به خاطر داشته باشد و هنگامی که بخش بعدی داده وارد شد، آن‌ها را رمزگشایی کندstream برای رمزگشایی

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

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) does the reverse thing -- converts a string into bytes.

The syntax is:

```js
let encoder = new TextEncoder();
```

The only encoding it supports is "utf-8".

It has two methods:
- **`encode(str)`** -- returns `Uint8Array` from a string.
- **`encodeInto(str, destination)`** -- encodes `str` into `destination` that must be `Uint8Array`.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
