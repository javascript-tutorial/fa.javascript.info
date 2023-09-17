# ArrayBuffer, آرایه‌های دودویی

در توسعه‌ی وب، ما معمولا هنگام سروکار داشتن با فایل‌ها(ساختن، بارگذاری کردن، دانلود کردن) به داده‌های دودویی برخورد می‌کنیم. یکی دیگر از استفاده‌های رایج آن پردازش تصویر می‌باشد.

همه‌ی این‌ موارد در جاوااسکریپت ممکن است، و عملیات‌های دودویی عملکرد بالایی دارند.

هرچند، اندکی احتمال اشتباه کردن وجود دارد، زیرا کلاس‌های بسیاری وجود دارند. برخی از آن‌ها عبارتند از:
- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`, etc.

داده‌های دودویی در جاوااسکریپت، نسبت به سایر زبان‌ها به شکل غیراستانداردی پیاده‌سازی شده‌اند. ولی هنگاهی که ما چیزها را مرتب می‌کنیم، همه چیز نسبتا ساده می‌شود.

**شی دودویی پایه `ArrayBuffer` است -- یک اشاره به یک ناحیه‌ی پیوسته‌ی حافظه با طول ثابت.**

آن را به شکل زیر می‌سازیم:
```js run
let buffer = new ArrayBuffer(16); // ساخت یک بافر با طول 16
alert(buffer.byteLength); // 16
```

این کد یک حافظه‌ی پیوسته به اندازه 16 بایت را اختصاص می‌دهد و آن را با صفر مقداردهی اولیه می‌کند.

```هدر هشدار="`ArrayBuffer` یک آرایه از چیزی نیست." بیایید یک منبع احتمال اشتباه کردن را رفع کنیم. `ArrayBuffer` هیچ ارتباطی با آرایه ندارد:
- یک طول ثابت دارد، ما نمی‌توانیم آن را کم یا زیاد کنیم.
- دقیقا به همان میزان حافظه اشغال می‌کند.
- برای دسترسی به بایت‌های جداگانه، یک شی "View" دیگر لازم است، نه `buffer[index]`.
```

یک ناحیه از حافظه است. چه چیزی در آن ذخیره می‌شود؟ هیچ سرنخی وجود ندارد. فقط یک دنباله خالی از بایت‌ها `ArrayBuffer`

**استفاده کنیم "View" ما باید از یک شی ،`ArrayBuffer` برای دستکاری کردن یک**

را می‌دهد `ArrayBuffer` است که تفسیری از بایت‌های ذخیره شده در "eyeglasses" چیزی را در خود ذخیره نمی‌کند. این view یک شی

:برای مثال

- **`Uint8Array`** -- مانند یک عدد جداگانه برخورد می‌کند و مقادیر مجاز آن از 0 تا 255 است.(یک بایت 8 بیت است پس فقط تا همان مقدار را می‌تواند نگه دارد.). به این مقدار یک عدد صحیح بدون‌علامت 8-بیتی گفته می‌شود `ArrayBuffer` با هر بایت در
- **`Uint16Array`** -- برخورد می‌کند که مقادیر مجاز آن از 0 تا 65535 می‌باشد. به آن یک عدد صحیح بدون‌علامت 16-بیتی گفته می‌شود integer با هر 2 بایت به عنوان یک
- **`Uint32Array`** -- برخورد می‌کند که مقادیر مجاز آن از 0 تا 4294967295 می‌باشد. به آن یک عدد صحیح بدون‌علامت 32-بیتی گفته می‌شود integer با هر 4 بایت به عنوان یک
- **`Float64Array`** -- می‌باشد <code>1.8x10<sup>308</sup></code> تا <code>5.0x10<sup>-324</sup></code> رفتار می‌کند و مقادیر مجاز آن از float با هر 8 بایت به عنوان یک عدد

با دقت بالا(هر کدام 8 بایت) تفسیر شود float یی با اندازه‌ی 16 بایت، می‌تواند به عنوان 16 عدد کوچک یا 8 عدد بزرگ‌تر (هر کدام 2 بایت) یا 4 عدد بزرگ‌تر از قبلی(هر کدام 4 بایت) یا 2 عدد `ArrayBuffer` بنابراین، یک داده‌ی دودویی درون
![](arraybuffer-views.svg)

شی اصلی، ریشه‌ی همه چیز و داده‌ی باینری خام است `ArrayBuffer`

مانند زیر استفاده کنیم view اما اگر بخواهیم هر عملیاتی روی آن انجام دهیم، از جمله، در آن بنویسیم، یا آن را پیمایش کتیم - باید از یک
```js run
let buffer = new ArrayBuffer(16); // ساخت یک بافر با طول 16

*!*
let view = new Uint32Array(buffer); // رفتار با بافر مانند یک دنباله از اعداد صحیح 32 بیتی

alert(Uint32Array.BYTES_PER_ELEMENT); // به ازای هر عدد صحیح، 4 بایت
*/!*

alert(view.length); // 4, به این تعداد عدد صحیح در خود ذخیره می‌کند
alert(view.byteLength); // 16, اندازه‌ی بایت‌ها

// نوشتن یک مقدار
view[0] = 123456;

// پیمایش روی مقادیر
for(let num of view) {
  alert(num); // ابتدا 123456 سپس 0 و 0 و 0(در مجموع 4 مقدار)
}

```

## TypedArray

اصطلاح رایج برای تمامی این viewها (`Uint8Array` و `Unit32Array` و غیره) [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects) می‌باشد. آن‌ها متدها و ویژگی‌های یکسانی دارند.

لطفا به خاطر داشته باشید که هیچ سازنده‌ای با عنوان `TypedArray` وجود ندارد و این فقط یک اصطلاح رایج برای پوشش یکی از viewهای موضوع گسترده‌ی `ArrayBuffer` می‌باشد: `Int8Array` و `Uint8Array` و به همین ترتیب، لیست کامل به زودی ارائه می‌شود.

هرگاه چیزی مانند `new TypedArray` مشاهده کردید، این عبارت به معنای هرکدام از `new Int8Array`، `new Uint8Array` و غیره می‌باشد.

آرایه‌های Typed مانند آرایه‌های عادی رفتار می‌کنند: دارای اندیش هستند و قابل پیمایش می‌باشند.

یک سازنده‌ی آرایه‌ی Typed(می‌تواند `Int8Array` یا `Float64Array` باشد، اهمیتی ندارد) با توجه به نوع آرگومان آن متفاوت رفتار می‌کند.

5 نوع مختلف آرگومان‌ها وجود دارند:

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```


1. اگر یک آرگومان `ArrayBuffer` وجود داشته باشد، view بر حسب آن ساخته می‌شود. ما پیش از این از همین سینتکس استفاده کردیم.
    
ما می‌توانیم به صورت اختیاری `byteOffset` تهیه کنیم که از آن شروع کنیم(به شکل پیش‌فرض از 0 شروع می‌کنیم) و یک `length` که تا آنجا ادامه دهیم(به صورت پیش‌فرض تا انتهای بافر ادامه‌ می‌دهیم)؛ در نتیجه، view فقط بخشی از بافر را پوشش می‌دهد.

2. اگر یک آرایه یا هر شی مانند آن داشته باشیم، آن شی یک آرایه‌ی typed به همان طول می‌سازد و محتوا را نیز کپی می‌کند.
   
   ما می‌توانیم از آن برای مقداردهی اولیه‌ی آرایه با داده استفاده کنیم:
    ```js run
    *!*
    let arr = new Uint8Array([0, 1, 2, 3]);
    */!*
    alert( arr.length ); // 4, یک آرایه دودویی به همان طول می‌سازد
    alert( arr[1] ); // 1, با 4 بایت(اعداد صحیح بدون‌علامت 8-بیتی) با مقادیر داده شده پر می‌شود
    ```
3. اگر یک `TypedArray` دیگر وجود داشته باشد، به همان شکل رفتار می‌کند: ک آرایه‌ی typed به همان طول می‌سازد و محتوا را نیز کپی می‌کند. در طول این فرآیند، مقادیر در صورت نیاز به نوع جدیدی تبدیل می‌شوند.
    ```js run
    let arr16 = new Uint16Array([1, 1000]);
    *!*
    let arr8 = new Uint8Array(arr16);
    */!*
    alert( arr8[0] ); // 1
    alert( arr8[1] ); // 232,  تلاش می‌کند 1000 را کپی کند اما نمی‌تواند 1000 را در 8 بیت جا دهد(توضیخات در پایین)
    ```

4. برای آرگومان عددی `length` -- یک آرایه‌ typed که به همان تعداد عضو دارد می‌سازد. طول بایت آن برابر `length` ضرب در تعداد بایت‌های یک آیتم واحد `TypedArray.BYTES_PER_ELEMENT` خواهد بود:
    ```js run
    let arr = new Uint16Array(4); // برای 4 عدد صحیح می‌سازد typed یک آرایه‌ی
    alert( Uint16Array.BYTES_PER_ELEMENT ); // به ازای هر عدد صحیح 2 بایت
    alert( arr.byteLength ); // 8 (اندازه در بایت‌ها)
    ```

5. بدون آرگومان‌ها یک آرایه‌ی typed با طول صفر می‌سازد.

ما می‌توانیم مستقیما یک `TypedArray` بسازیم، بدون اینکه به `ArrayBuffer` اشاره‌ای کنیم. ولی یک view بدون `ArrayBuffer` دربرگیرنده نمی‌تواند وجود دشاته باشد؛ در نتیجه در همه‌ی این موارد بجز مورد اول(هنگامی که فراهم شده است) به طور خودکار ساخته می@شود.

برای دسترسی به `ArrayBuffer` دربرگیرنده، ویژگی‌های زیر در `TypedArray` وجود دارد:
- `buffer` -- ارجاع به `ArrayBuffer`.
- `byteLength` -- طول `ArrayBuffer`.

بنابراین، ما همیشه می‌توانیم از یک view به دیگری برویم:
```js
let arr8 = new Uint8Array([0, 1, 2, 3]);

// دیگر در همان داده view یک
let arr16 = new Uint16Array(arr8.buffer);
```


در ادامه لیست آرایه‌های typed آمده است:

- `Uint8Array`, `Uint16Array`, `Uint32Array` -- برای اعداد صحیح 8 و 16 و 32 بیتی
  - `Uint8ClampedArray` -- برای اعداد صحیح 8 بیتی، آن‌ها را "clamps" می‌کند(در ادامه خواهید دید)
- `Int8Array`, `Int16Array`, `Int32Array` -- برای اعداد صحیح علامت‌دار(می‌توانند منفی باشند)
- `Float32Array`, `Float64Array` -- برای اعداد اعشاری علامت‌دار 32 و 64 بیتی

```هدر هشدار="بدون `int8` یا انواع مشابه با مقدار واحد"

لطفا به خاطر داشته باشید، علی‌رغم نام‌هایی مانند `Int8Array`، هیچ نوعی با مقدار واحد مانند `int` یا `int8` در جاوااسکریپت وجود ندارد.

این موضوع منطقی است، زیرا `Int8Array` یک آرایه از این مقادیر مجزا نیست، بلکه یک view روی `ArrayBuffer` است.
```

### رفتار خارج از محدوده

بنویسیم چه؟ هیچ خطایی وجود نخواهد داشت، اما بیت‌ههای اضافی حذف خواهند شد typed اگر بخواهیم یک مقدار خارج از محدوده را در یک آرایه‌ی

به ازای هر مقدار 8 بیت دارد، پس بازه‌ی آن بین 0 تا 255 خواهد بود `Uint8Array` قرار دهیم. در حالت دودویی، 256 برابر `100000000`(9 بیت) خواهد بود، ولی `Uint8Array` به عنوان مثال، بیایید سعی کنیم 256 را در

:برای اعداد بزرگتر، فقط 8 بیت سمت راست(بیت‌های کم‌ارزش‌تر) ذخیره می‌شود، و بقیه بیت‌ها حذف می‌شوند

![](8bit-integer-256.svg)

.در نتیجه صفر دریافت می‌کنیم

:برای 257، حالت دودویی `100000001`(9 بیت) خواهد بود، 8 بیت سمت راست ذخیره می‌شوند، در نتیجه در آرایه `1` را داریم

![](8bit-integer-257.svg)
ذخیره می‌شود 2<sup>8</sup> به عبارت دیگر، باقی‌مانده عدد

:یک نمونه

```js run
let uint8array = new Uint8Array(16);

let num = 256;
alert(num.toString(2)); // 100000000 (نمایش دودویی)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); // 0
alert(uint8array[1]); // 1
```

از این نظر، `Uint8ClampedArray` خاص است و رفتار متفاوتی دارد. این مورد به ازای هر عدد بزرگتر از 255، 255 و به ازای هر عدد منفی، 0 را ذخیره می‌کند. این رفتار ببرای پردازش تصویر مفید است.

## متدهای TypedArray

`TypedArray` has regular `Array` methods, with notable exceptions.

We can iterate, `map`, `slice`, `find`, `reduce` etc.

There are few things we can't do though:

- No `splice` -- we can't "delete" a value, because typed arrays are views on a buffer, and these are fixed, contiguous areas of memory. All we can do is to assign a zero.
- No `concat` method.

There are two additional methods:

- `arr.set(fromArr, [offset])` copies all elements from `fromArr` to the `arr`, starting at position `offset` (0 by default).
- `arr.subarray([begin, end])` creates a new view of the same type from `begin` to `end` (exclusive). That's similar to `slice` method (that's also supported), but doesn't copy anything -- just creates a new view, to operate on the given piece of data.

These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.



## DataView

[DataView](mdn:/JavaScript/Reference/Global_Objects/DataView) is a special super-flexible "untyped" view over `ArrayBuffer`. It allows to access the data on any offset in any format.

- For typed arrays, the constructor dictates what the format is. The whole array is supposed to be uniform. The i-th number is `arr[i]`.
- With `DataView` we access the data with methods like `.getUint8(i)` or `.getUint16(i)`. We choose the format at method call time instead of the construction time.

The syntax:

```js
new DataView(buffer, [byteOffset], [byteLength])
```

- **`buffer`** -- the underlying `ArrayBuffer`. Unlike typed arrays, `DataView` doesn't create a buffer on its own. We need to have it ready.
- **`byteOffset`** -- the starting byte position of the view (by default 0).
- **`byteLength`** -- the byte length of the view (by default till the end of `buffer`).

For instance, here we extract numbers in different formats from the same buffer:

```js run
// binary array of 4 bytes, all have the maximal value 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// get 8-bit number at offset 0
alert( dataView.getUint8(0) ); // 255

// now get 16-bit number at offset 0, it consists of 2 bytes, together interpreted as 65535
alert( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

// get 32-bit number at offset 0
alert( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0
```

`DataView` is great when we store mixed-format data in the same buffer. For example, when we store a sequence of pairs (16-bit integer, 32-bit float), `DataView` allows to access them easily.

## Summary

`ArrayBuffer` is the core object, a reference to the fixed-length contiguous memory area.

To do almost any operation on `ArrayBuffer`, we need a view.

- It can be a `TypedArray`:
    - `Uint8Array`, `Uint16Array`, `Uint32Array` -- for unsigned integers of 8, 16, and 32 bits.
    - `Uint8ClampedArray` -- for 8-bit integers, "clamps" them on assignment.
    - `Int8Array`, `Int16Array`, `Int32Array` -- for signed integer numbers (can be negative).
    - `Float32Array`, `Float64Array` -- for signed floating-point numbers of 32 and 64 bits.
- Or a `DataView` -- the view that uses methods to specify a format, e.g. `getUint8(offset)`.

In most cases we create and operate directly on typed arrays, leaving `ArrayBuffer` under cover, as a "common denominator". We can access it as `.buffer` and make another view if needed.

There are also two additional terms, that are used in descriptions of methods that operate on binary data:
- `ArrayBufferView` is an umbrella term for all these kinds of views.
- `BufferSource` is an umbrella term for `ArrayBuffer` or `ArrayBufferView`.

We'll see these terms in the next chapters. `BufferSource` is one of the most common terms, as it means "any kind of binary data" -- an `ArrayBuffer` or a view over it.

Here's a cheatsheet:

![](arraybuffer-view-buffersource.svg)
