
# متد Fetch: پیشرفت دانلود

متد `fetch` به ما اجازه می‌دهد پیشرفت *دانلود* را دنبال کنیم.

لطفاً توجه کنید: در حال حاضر هیچ راهی وجود ندارد که `fetch` بتواند پیشرفت *آپلود* را ردیابی کند. برای این کار باید از [XMLHttpRequest](info:xmlhttprequest) استفاده کنید که بعداً بررسی خواهد شد.

برای دنبال‌کردن پیشرفت دانلود، می‌توانیم از ویژگی `response.body` استفاده کنیم. این یک `ReadableStream` است -- یک شیء خاص که بدنه را به صورت تکه‌تکه (chunk-by-chunk) و هم‌زمان با دریافت فراهم می‌کند. جریان‌های قابل خواندن در  [Streams API](https://streams.spec.whatwg.org/#rs-class) توضیح داده شده‌اند.

برخلاف `response.text()`، `response.json()` و سایر متدها، ویژگی `response.body` کنترل کامل روی فرایند خواندن می‌دهد و می‌توانیم در هر لحظه مقدار داده‌ی مصرف‌شده را اندازه‌گیری کنیم.

در ادامه اسکلت کدی را می‌بینید که پاسخ را از `response.body` می‌خواند:

```js
// به‌جای response.json() و سایر متدها
const reader = response.body.getReader();

// حلقه بی‌نهایت تا زمانی که بدنه در حال دانلود است
while(true) {
  // done برای آخرین chunk برابر true می‌شود
  // value یک Uint8Array از بایت‌های chunk است
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

نتیجه‌ی فراخوانی `await reader.read()` یک شیء با دو ویژگی است:  
- ویژگی **`done`** -- زمانی `true` می‌شود که خواندن کامل شده باشد، در غیر این صورت `false` است.  
- ویژگی **`value`** -- یک آرایه تایپ‌شده از بایت‌ها: `Uint8Array`.  

```smart
توجه: Streams API همچنین پیمایش ناهمزمان (`async iteration`) روی `ReadableStream` را با حلقه‌ی `for await..of` تعریف می‌کند، اما هنوز به طور گسترده پشتیبانی نمی‌شود (به [مشکلات مرورگرها](https://github.com/whatwg/streams/issues/778#issuecomment-461341033) مراجعه کنید)، بنابراین از حلقه‌ی `while` استفاده می‌کنیم.
```

ما در حلقه، تکه‌های پاسخ را دریافت می‌کنیم تا زمانی که بارگذاری تمام شود؛ یعنی تا زمانی که `done` برابر `true` شود.

برای ثبت پیشرفت، کافی است در هر بار دریافت قطعه‌ی `value`، طول آن را به شمارنده اضافه کنیم.

در ادامه یک مثال کامل داریم که پاسخ را دریافت می‌کند و پیشرفت را در کنسول لاگ می‌کند. توضیحات بیشتر بعد از آن آمده است:

```js run async
// مرحله 1: شروع fetch و گرفتن reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// مرحله 2: گرفتن طول کل داده
const contentLength = +response.headers.get('Content-Length');

// مرحله 3: خواندن داده
let receivedLength = 0; // تا این لحظه این مقدار بایت دریافت شده  
let chunks = []; // آرایه‌ای از تکه‌های باینری دریافت‌شده (بدنه)  
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// مرحله 4: اتصال chunkها به یک Uint8Array واحد
let chunksAll = new Uint8Array(receivedLength); // (مرحله 4.1)
let position = 0;
for(let chunk of chunks) {
    chunksAll.set(chunk, position); // (مرحله 4.2)
    position += chunk.length;
}

// مرحله 5: تبدیل به رشته
let result = new TextDecoder("utf-8").decode(chunksAll);

// کار تمام شد!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

بیایید مرحله به مرحله توضیح بدهیم:

1. ما مانند حالت عادی `fetch` انجام می‌دهیم، اما به جای `response.json()`، یک stream reader می‌گیریم: `response.body.getReader()`.

   توجه کنید که نمی‌توان هم‌زمان از هر دو روش برای خواندن یک پاسخ استفاده کرد: یا باید از reader استفاده کنیم یا از متدهای آماده‌ی response.  
2. قبل از خواندن، می‌توانیم از هدر `Content-Length` طول کل پاسخ را به دست آوریم.

   این مقدار ممکن است در درخواست‌های cross-origin وجود نداشته باشد (به فصل <info:fetch-crossorigin> مراجعه کنید) و در عمل هم سرور مجبور به ارسال آن نیست. اما معمولاً وجود دارد.
3. تابع `await reader.read()` را تا زمانی که تمام شود اجرا می‌کنیم.

   ما تکه‌های پاسخ را در آرایه‌ی `chunks` جمع می‌کنیم. این مهم است چون بعد از مصرف شدن پاسخ، دیگر نمی‌توان آن را دوباره با `response.json()` یا روش‌های مشابه خواند (اگر امتحان کنید خطا خواهید گرفت).
4. در پایان، ما `chunks` را داریم -- آرایه‌ای از قطعات بایت `Uint8Array`. باید آن‌ها را به یک خروجی واحد تبدیل کنیم. متأسفانه متد مستقیمی برای اتصال آن‌ها وجود ندارد، بنابراین این کار را دستی انجام می‌دهیم:
    1. یک `Uint8Array` جدید با طول کل ایجاد می‌کنیم: `chunksAll = new Uint8Array(receivedLength)`
    2. سپس با `.set(chunk, position)` هر قطعه را پشت سر هم داخل آن کپی می‌کنیم.
5. در نهایت داده‌ی نهایی در `chunksAll` قرار دارد، اما هنوز رشته نیست.

   برای تبدیل به رشته، باید این بایت‌ها را تفسیر کنیم. کلاس داخلی [TextDecoder](info:text-decoder) دقیقاً همین کار را انجام می‌دهد. سپس در صورت نیاز می‌توانیم آن را با `JSON.parse` تبدیل کنیم.

   اگر به جای رشته داده‌ی باینری بخواهیم، کار ساده‌تر است: کافی است مراحل 4 و 5 را با یک خط جایگزین کنیم:
    ```js
    let blob = new Blob(chunks);
    ```

در نهایت ما نتیجه را (به صورت رشته یا Blob) داریم و هم‌زمان در طول فرایند، پیشرفت دانلود را هم دنبال می‌کنیم.

دوباره توجه کنید: این روش برای *پیشرفت آپلود* نیست (فعلاً با `fetch` ممکن نیست)، فقط برای *پیشرفت دانلود* است.

همچنین اگر اندازه‌ی داده مشخص نباشد، باید در حلقه مقدار `receivedLength` را بررسی کنیم و اگر از یک حدی بیشتر شد، حلقه را متوقف کنیم تا آرایه‌ی `chunks` باعث مصرف بیش از حد حافظه نشود. 