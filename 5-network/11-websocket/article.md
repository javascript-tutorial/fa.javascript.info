# وب سوکت

پروتوکل _وب‌ سوکت_, همانطور که در [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455) توضیحات آن ارائه شده است, راهی را برای ردوبدل کردن دیتا بین مرورگر و سرور به شکل یک ارتباط مستمر میسر میسازد. در این پروتوکل اطلاعات میتوانند بدون شکستن ارتباط و نیاز به درخواست HTTP اضافه به شکل دوسویه و در قالب "packets" رد و بدل شوند.

به طور خاص وب سوکت برای سرویس‌هایی که نیاز به تبادل اطلاعات به شکل مستمر دارند مثل بازیهای آنلاین، سیستم‌های ترید لحظه‌ای و موارد مشابه استفاده می‌شود.

## یک مثال ساده

برای آغاز یک اتصال از نوع وب سوکت، ما نیاز به ایجاد یک `وب سوکت جدید` با استفاده از پروتوکل مخصوص `ws` در url داریم:

```js
let socket = new WebSocket("*!*ws*/!*://javascript.info");
```

همچنین پروتوکل رمزگذاری شده `//:wss` وجود دارد. این پروتوکل همانند پروتوکل HTTPS برای وب سوکت ها میباشد.

```smart header="است `wss://` همواره ترجیح براستفاده از پروتوکل"
پروتوکل`wss://` نه تنها رمزگذاری شده بلکه قابل اعتماد نیز هست

عدم رمزگذاری در ارتباط با پروتوکل `//:ws` باعث قابل رویت بودن اطلاعات توسط هر رابطی میشود. چون پروکسی سرورهای قدیمی راجع به وب سوکت ها اطلاعی ندارند ممکن است هدرها را "ناآشنا" تشخیص داده و ارتبط را قطع کنند.

از طرف دیگر، پروتوکل `//:wss` برروی TLS بوده (همانطور که HTTPS همان HTTP برروی TLS میباشد.) لایه امنیت انتقال اطلاعات را از سمت فرستنده رمزگذاری کرده و در سمت گیرنده رمزگشایی میکند. بنابراین اطلاعات به شکل رمزگذاری شده از میان پروکسی‌ها عبور میکنند. آنها نمیتوانند ببینند چه چیزی درون این بسته ها وجود دارد و تنها آنهارا عبور میدهند.
````

زمانی که سوکت ایجاد میشود، ما باید به رویدادهای آن گوش کنیم. درمجموع 4 نوع رویداد وجود دارد:
- **`open`** -- اغاز ارتباط,
- **`message`** -- دریافت اطلاعات,
- **`error`** -- خطای وب سوکت,
- **`close`** -- بسته شدن ارتباط .

...و اگر بخواهیم چیزی ارسال کنیم آنگاه `socket.send(data)` این کار را انجام خواهد داد.

یک مثال:

```js run
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {  
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // برای مثال عملیات سمت سرور به مشکل خورده و یا شبکه از کار افتاده است
    // در این موقعیت event.code عدد 1006 است.
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error]`);
};
```

برای نمایش نحوه عملکرد وب سوکت، سرور کوچک [server.js](demo/server.js) که با Node.js نوشته شده است وجود دارد. برای مثال بالا اجرای آن یک پاسخ به شکل "Hello from server, John" برمیگرداند سپس به مدت 5 ثانیه صبر کرده و ارتباط را میبندد.

بنابراین شما رویدادهای `open` -> `message` -> `close` را خواهید دید

در واقع کلیت ماجرا همین است، حالا میتونیم با وب سوکت ارتباط برقرار کنیم. ساده است مگه نه؟

حالا بیاید تا عمیق‌تر بررسی کنیم.

## ایجاد یک وب سوکت

زمانی که یک وب سوکت با دستور `new WebSocket(url)` ایجاد می‌شود, بلافاصله شروع به اتصال میکند.

درطول اتصال، مروگر (با استفاده از هدرها) از سرور سوال میکند: "آیا از وب سوکت پشتیبانی میکنی؟" و اگر سرور جواب مثبت بدهد، آنگاه مکالمه در پروتوکل وب سوکت ادامه می‌یابد که به اصلا HTTP نیست.

![](websocket-handshake.svg)

در زیر نمونه‌ای از هدرهای مرورگر در درخواست `new WebSocket("wss://javascript.info/chat")` آورده شده است.

```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` --هستند. هیچ هدرخاص و یا دیگر محدودیتی وجود ندارد. درهرصورت سرورهای قدیمی قادر به کار با وب سوکت ها نیستند. بنابراین هیچگونه مشکل سازگاری وجود ندارد. اما این هدر مهم است چون به سرور این اجازه را میدهد تا درمورد ارتباط با وبسایت از طریق وب سوکت تصمیم بگیرد. cross-origin آبجکت‌های وب سوکت ذاتا .`https://javascript.info` خواستگاه صفحه در سمت کلاینت برای مثال
- `Connection: Upgrade` -- علامتی نمایانگر آنکه کلاینت خواهان تغییر پروتوکل میباشد.
- `Upgrade: websocket` -- پروتوکل درخواستی "وب سوکت" میباشد
- `Sec-WebSocket-Key` -- یک کلید تصادفی که توسط مرورگر ساخته میشود و برای اطمینان از اینکه آیا سرور از وب سوکت پشتیبانی میکند یا نه استفاده میشود. این کلید به صورت تصادفی است تا از cache کردن هر نوع ارتباطی توسط پروکسی‌ها جلوگیری کند
- `Sec-WebSocket-Version` -- ورژن پروتوکل وب سوکت، نسخه کنونی 13 میباشد

```smart header="هنشیک (handshake) وب سوکت قابل بازسازی نیست"
نمیتوانیم از `XMLHttpRequest` یا `fetch` برای ساخت این نوع از HTTP-request استفاده کنیم چون جاوااسکریپت اجازه‌ی تنظیم این هدرهارا ندارد.
```

اگر سرور با تعویض به پروتوکل وب سوکت موافقت کند آنگاه باید کد 101 را در پاسخ ارسال کند

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

اینجا `Sec-WebSocket-Accept` همان `Sec-WebSocket-Key` ای هست که توسط یک الگوریتم خاص دوباره کدگذاری شده است. با دیدن آن، مرورگر متوجه میشود که سرور واقعا از پروتوکل وب سوکت پشتیبانی میکند

سپس اطلاعات بر بستر پروتوکل وب سوکت انتقال پیدا میکنند, که به زودی با ساختار آن ("frames") آشنا میشویم.

### افزونه ها و زیرپروتوکل‌ها

امکان دارد که هدرهای اضافی همچون `Sec-WebSocket-Extensions` و `Sec-WebSocket-Protocol` وجود داشته باشند که بیانگر افزونه(extension)ها و زیرپروتوکل‌ها(subprotocols) هستند.

برای مثال:

- `Sec-WebSocket-Extensions: deflate-frame` نمایانگر آن است که مروگر فشرده‌سازی اطلاعات را پشتیبانی میکند. یک افزونه به انتقال اطلاعات مرتبط است. سازوکاری که پروتوکل وب سوکت را گسترش میدهد. `Sec-WebSocket-Extensions: deflate-frame` به صورت خودکار توسط مروگر ارسال میشود و حاوی لیستی از همه‌ی افزونه هایی که پشتیبانی میکند میباشد.

- `Sec-WebSocket-Protocol: soap, wamp` به این معنی است که ما نمیخواهیم هر دیتایی را ارسال کنیم بلکه دیتای در [SOAP](https://en.wikipedia.org/wiki/SOAP) یا WAMP ("پروتوکل پیامرسانی از طریق وب سوکت"). زیرپروتوکل های وب سوکت در [IANA catalogue](https://www.iana.org/assignments/websocket/websocket.xml) لیست شده اند. بنابراین این هدر فرمت دیتایی که میخواهیم استفاده کنیم را توصیف میکند.

  این هدر اختیاری با استفاده از دومین پارامتر `new websocket` تنظیم میشود که آرایه ای از subprotocol هاست. برای مثال اگر بخواهیم از SOAP یا WAWP استفاده کنیم داریم:

    ```js
    let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
    ```

سرور باید با لیستی از پروتوکل‌ها و extension هایی که با استفاده از آنها موافق است پاسخ دهد

برای مثال، درخواست:

```
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
*/!*
```

پاسخ:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
*/!*
```

اینجا سرور پاسخ میدهد که extension "deflate-frame" و تنها SOAP subprotocol ها را پشتیبانی میکند.

## انتقال اطلاعات

ارتباط از طریق وب سوکت از "frame" ها یا همان برش‌هایی از اطلاعات ساخته شده که میتواند از هر سمت ارسال شده و انواع متفاوتی داشته باشد:

- "text frames" -- دیتای متنی ردوبدل شده را شامل می‌شود.
- "binary data frames" -- دیتای باینری رد و بدل شده را شامل می‌شود.
- "ping/pong frames" -- برای بررسی اتصال از سمت سرور ارسال می‌شود و مرورگر به صورت خودکار به آن پاسخ می‌دهد.
- همچنین فریمی به نام "connection close frame" و تعداد دیگری از سرویس فریم‌ها وجود دارند.

در مرورگر، ما مستقیما با متن یا binary frames کار میکنیم.

**متد `()send.` وب سوکت توانایی ارسال هم متن و هم دیتای باینری را دارا میباشد**

صدا زدن `socket.send(body)` اجازه‌ی استفاده از هم رشته و هم فرمت باینری را در `body` می‌دهد که شامل `Blob`, `ArrayBuffer` و موارد مشابه میباشد. هیچ تنظیماتی نیاز نیست: میتوانید با هر فرمتی ارسالش کنید.

**هنگام دریافت دیتا، متن همیشه به صورت رشته می‌آید. و برای دیتای باینری میتوانیم بین فرمت‌های `Blob` و `ArrayBuffer` انتخاب کنیم**

که با مشخصه `socket.binaryType` قابل تنظیم بوده و به صورت پیشفرض `""blob""` است بنابراین دیتای باینری به شکل آبجکت‌های `Blob` دریافت می‌شود.

تغییر دهیم. `"arraybuffer"` و دیگر تگ ها ادغام میشود بنابراین مقدار پیشفرض منطقی خواهد بود. اما برای دیتای باینری میتوانیم آنرا به `<img>` و `<a>` آبجکت باینری سطح بالایی است که به صورت مستقیم با [Blob](info:blob)

```js
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## محدود کردن نرخ

تصور کنید که برنامه‌ی ما مقدار زیادی دیتا ارسال میکند اما اینترنت کاربر سرعت پایینی دارد شاید بشه اینترنت همراه خارج از شهر رو مثال زد.

ما `socket.send(data)` را بارها و بارها صدا میزنیم. اما دیتا در حافظه بافر (ذخیره) شده و زمانی که سرعت شبکه به حد کافی برسد به بیرون ارسال خواهد شد.

مشخصه `socket.bufferedAmount` تعداد بایت‌های ذخیره شده درلحظه و درحال انتظار برای ارسال تحت شبکه را ذخیره می‌کند.

با ارزیابی این پارامتر میتونیم بفهمیم که آیا سوکت واقعا برای انتقال دردسترس است یا نه

```js
// هر صد میلی ثانیه سوکت را بررسی کرده و دیتای بیشتری را ارسال میکند
// تنها زمانی که همه‌ی دیتای موجود ارسال شده باشد
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## بستن اتصال

به طور معمولی زمانی که یک طرف قصد بستن اتصال را داشته باشد(هر دوی مروگر و سرور حق برابری برای اینکار دارا هستند.), آنها عبارت "connection close frame" را به همراه یک کد عددی و دلیل اینکار را به شکل متنی ارسال میکنند.

روش انجام این کار به شکل زیر است:
```js
socket.close([code], [reason]);
```

- `code` یک کد خاص برای بستن وب سوکت (اختیاری)
- `reason` رشته‌ای که علت بستن اتصال را توضیح می‌دهد (اختیاری)

سپس طرف دیگر رویداد کد `close` و علت آنرا دریافت میکند. برای مثال:

```js
// سمتی که ارتباط را میبندد:
socket.close(1000, "Work complete");

// سمت دیگر:
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

رایجع‌ترین کدها و مقادیر آنها:

- `1000` -- بستن پیش‌فرض و عادی (زمانی که `code` نباشد استفاده می‌شود),
- `1006` -- راهی برای تنظیم این کد به صورت دستی وجود نداشته و نمایانگر از دست رفتن ارتباط هست (no close frame)

کدهای دیگر مثل موارد زیر هم وجود دارند:

- `1001` -- the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` -- حجم پیام برای انجام پردازش زیاد است,
- `1011` -- خطای پیش‌بینی نشده در سرور,
- ...و غیره.

لیست کامل رو میتونید در [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1) پیدا کنید.

کدهای وب سوکت تاحدی مشابه کدهای HTTP میباشند اما متفاوتند. به صورت خاص کدهای کمتر از `1000` از قبل رزرو شده اند و اگر تلاش کنیم تا یکی از این کدهارو استفاده کنیم به ارور برخورد خواهیم کرد.

```js
// اگر ارتباط دچار مشکل باشد:
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```


## وضعیت اتصال

برای اطلاع از وضعیت اتصال پراپرتی `socket.readyState` با مقادیر زیر وجود دارد:

- **`0`** -- "CONNECTING": اتصال هنوز برقرار نشده است,
- **`1`** -- "OPEN": درحال برقراری ارتباط,
- **`2`** -- "CLOSING": درحال بستن ارتباط,
- **`3`** -- "CLOSED": ارتباط بسته شده است.


## مثال چت

بیاید تا با هم یک مثال از پیاده‌سازی یک برنامه چت را بااستفاده از ای پی آی وب سوکت و ماژول وب سوکت node.js <https://github.com/websockets/ws> بررسی کنیم. تمرکز اصلی ما سمت کلاینت خواهد بود اما سمت سرور هم ساده است.

کد HTML: نیاز به یک تگ `<form>` برای ارسال پیامها و یک تگ `<div>` برای پیامهای دریافتی داریم

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

برای کدهای جاوااسکریپت برنامه ما نیاز به سه چیز داریم:
1. ایجاد اتصال.
2. On form submission -- `socket.send(message)` for the message.
3. On incoming message -- append it to `div#messages`.

کد رو به اینصورت خواهیم داشت:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// ارسال پیام از فرم
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// div#messagesپیام دریافت شد - نمایش پیام در
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

کد سمت سرور یک مقدار فراتر از بحث ما هست. اینجا ما از node.js استفاده میکنیم, اما شما مجبور نیستید. دیگر پلتفورم‌ها روش‌های خاص خودشون رو برای کار با وب سوکت دارا هستند.

الگوریتم سمت سرور به اینصورت خواهد بود:

1. Create `clients = new Set()` --از سوکت ها set یک
2. تنظیم کنید event listener را برای دریافت پیامهای مربوط به `message` اضافه کرده و set به `clients.add(socket)` هر یک از وب سوکت های پذیرفته شده را با
3. زمانی که یک پیام دریافت می‌شود: بر روی کلاینت‌ها پویش کرده و آنرا به همه ارسال کن
4. زمانی که یک اتصال بسته میشود: `clients.delete(socket)`

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // در اینجا فقط ارتباط وب سوکت را کنترل میکنیم
  // در پروژه‌ واقعی کدهای دیگری برای رسیدگی به درخواست‌های غیر وب سوکت خواهیم داشت
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // حداکثر طول 50 را میتواند دارا باشد

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


یک مثال:

[iframe src="chat" height="100" zip]

شما همچنین میتونید این مثال رو دانلود کرده (دکمه بالا سمت راست در آیفریم) و در لوکال خودتون اجرا کنید. فقط فراموش نکنید که [Node.js](https://nodejs.org/en/) رو نصب کرده و دستور `npm install ws` رو قبل از راه اندازی اجرا کنید
## خلاصه

وب سوکت یک راه مدرن برای داشتن یک ارتباط مرورگر-سرور مستمر میباشد.

- وب سوکت‌ها محدودیت cross origin ندارند.
- به خوبی در مرورگرها پشتیبانی میشوند.
- میتوانند اطلاعات را به شکل رشته و باینری ارسال/دریافت کنند

که API ساده ای است

روش‌ها:

- `socket.send(data)`,
- `socket.close([code], [reason])`.

رویدادها:
- `open`,
- `message`,
- `error`,
- `close`.

وب سوکت به تنهایی شامل امکاناتی همچون اتصال دوباره, احراز هویت و دیگر مکانیزم‌های سطح بالا نمیباشد. بنابراین کتابخانه هایی هم در کلاینت و هم در سرور برای اینکار وجود دارند، همچنین پیاده‌سازی دستی این موارد امکان پذیر میباشد.

گاهی اوقات، برای افزودن وب سوکت به یک پروژه‌، افراد یک سرور وب سوکت به موازات سرور http را با یک دیتابیس مشترک راه اندازی میکنند. درخواست های وب سوکت از آدرس `wss://ws.site.com` که یک ساب دامین بوده و به سرور وب سوکت میرسد استفاده میکنند درحالی که درخواست های آدرس `https://site.com` به سرور http اصلی میروند.

مطمئنا راههای دیگری برای ادغام وجود دارد.
