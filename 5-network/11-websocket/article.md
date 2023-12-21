# وب سوکت

پروتوکل _وب‌ سوکت_, همانطور که در [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455) توضیحات آن ارائه شده است, راهی را برای ردوبدل کردن دیتا بین مرورگر و سرور به شکل یک ارتباط مستمر میسر میسازد. در این پروتوکل اطلاعات میتواندد بدون شکستن ارتباط و نیاز به درخواست HTTP اضافه به شکل دوسویه و در قالب "packets" رد و بدل شوند.

به طور خاص وب سوکت برای سرویس‌هایی که نیاز به تبادل اطلاعات به شکل مستمر دارند مثل بازیهای آنلاین، سیستم‌های ترید لحظه‌ای و موارد مشابه استفاده می‌شود.

## یک مثال ساده

برای باز کردن یک ارتباط از نوع وب سوکت، ما نیاز به ایجاد یک `وب سوکت جدید` با استفاده از پروتوکل مخصوص `ws` در url داریم:

```js
let socket = new WebSocket("*!*ws*/!*://javascript.info");
```

همچنین پروتوکل رمزگذاری شده `//:wss` وجود دارد. این پروتوکل همانند پروتوکل HTTPS برای وب سوکت ها میباشد.

```smart header="Always prefer `wss://`"
پروتوکل `wss://` نه تنها رمزگذاری شده بلکه قابل اعتماد نیز هست

عدم رمزگذاری در ارتباط با پروتوکل `//:wss` باعث قابل رویت بودن اطلاعات توسط هر رابطی میشود. چون پروکسی سرورهای قدیمی راجع به وب سوکت ها اطلاعی ندارند ممکن است هدرها را "ناآشنا" تشخیص داده و ارتبط را قطع کنند.

از طرف دیگر، پروتوکل `//:wss` برروی TLS بوده (همانطور که HTTPS همان HTTP برروی TLS میباشد.) لایه امنیت انتقال اطلاعات را از سمت فرستنده رمزگذاری کرده و در سمت گیرنده رمزگذاری میکند. بنابراین اطلاعات به شکل رمزگذاری شده از میان پروکسی‌ها عبور میکنند. آنها نمیتوانند ببینند چه چیزی درون این بسته ها وجود دارد و تنها آنهارا عبور میدهند.

````

زمانی که سوکت ایجاد میشود، ما باید به رویدادهای آن گوش کنیم. درمجموع 4 نوع رویداد وجود دارد:
- **`open`** -- اغاز ارتباط,
- **`message`** -- دریافت اطلاعات,
- **`error`** -- خطای وب سوکت,
- **`close`** -- بسته شدن ارتباط .

...و اگر بخواهیم چیزی ارسال کنیم آنگاه `socket.send(data)` اینکار را انجام خواهد داد.

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
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error]`);
};
````

برای نمایش نحوه عملکرد وب سوکت، سرور کوچک [server.js](demo/server.js) که با Node.js نوشته شده است وجود دارد. برای مثال بالا اجرای آن یک پاسخ به شکل "Hello from server, John" برمیگرداند سپس به مدت 5 ثانیه صبر کرده و ارتباط را میبندد.

بنابراین شما رویدادهای `open` -> `message` -> `close` را خواهید دید

در واقع کلیت ماجرا همین است، حالا میتونیم با وب سوکت ارتباط برقرار کنیم. ساده است مگه نه؟

حالا بیاید تا عمیق‌تر بررسی کنیم.

## ایجاد یک وب سوکت

زمانی که یک وب سوکت با دستور `new WebSocket(url)` ایجاد می‌شود, بلافاصله شروع به اتصال میکند.

درطول اتصال، مروگر (با استفاده از هدرها) از سرور سوال میکند: "آیا از وب سوکت پشتیبانی میکنی؟" و اگر سرور جواب مثبت بدهد، آنگاه مکالمه در پروتوکل وب سوکت ادامه می‌یابد که به هیچ وجه HTTP نیست.

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

- `Origin` -- آدرس اصلی صفحه کلاینت، برای مثال `https://javascript.info`. آبجکت‌های وب سوکت به ذاتا cross-origin هستند. هیچگونه هدر خاص یا محدودیتی در این رابطه وجود ندارد. چون سرورهای قدیمی قادر به کار کردن با وب سوکت نیستند, بنابراین هیچگونه مشکلی از نظر سازگاری وجود ندارد. اما هدر `Origin` از این نظر اهمیت دارد که به سرور اجازه میدهد درمورد ارتباط یا عدم ارتبط از طریق وب سوکت با این وب‌سایت تصمیم بگیرد.
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

اینجا `Sec-WebSocket-Accept` همان `Sec-WebSocket-Key` ای هست که توسط یک الگوریتم خاص دوباره کدگذاری شده است. با دیدن آن مرورگر متوجه میشود که سرور واقعا از پروتوکل وب سوکت پشتیبانی میکند

سپس اطلاعات بر بستر پروتوکل وب سوکت انتقال پیدا میکنند, که به زودی با ساختار آن ("frames") آشنا میشویم.

### افزونه ها و زیرپروتوکل‌ها

امکان دارد که هدرهای اضافی همچون `Sec-WebSocket-Extensions` و `Sec-WebSocket-Protocol` وجود داشته باشند که بیانگر افزونه(extension)ها و زیرپروتوکل‌ها(subprotocols) هستند.

برای مثال:

- `Sec-WebSocket-Extensions: deflate-frame` نمایانگر آن است که مروگر فشرده‌سازی اطلاعات را پشتیبانی میکند. یک extension به انتقال اطلاعات مرتبط است. سازوکاری که پروتوکل وب سوکت را گسترش میدهد. `Sec-WebSocket-Extensions: deflate-frame` به صورت خودکار توسط مروگر ارسال میشود و حاوی لیستی از همه‌ی extension هایی که پشتیبانی میکند میباشد.

- `Sec-WebSocket-Protocol: soap, wamp` means that we'd like to transfer not just any data, but the data in [SOAP](https://en.wikipedia.org/wiki/SOAP) or WAMP ("The WebSocket Application Messaging Protocol") protocols. WebSocket subprotocols are registered in the [IANA catalogue](https://www.iana.org/assignments/websocket/websocket.xml). So, this header describes the data formats that we're going to use.

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

اینجا سرور پاسخ میدهد که extension `deflate-frame` و تنها SOAP subprotocol ها را پشتیبانی میکند.

## انتقال اطلاعات

ارتباط از طریق وب سوکت از "frame" ها یا همان برش‌هایی از اطلاعات ساخته شده که میتواند از هر سمت ارسال شده و انواع متفاوتی داشته باشد:

- "text frames" -- contain text data that parties send to each other.
- "binary data frames" -- contain binary data that parties send to each other.
- "ping/pong frames" are used to check the connection, sent from the server, the browser responds to these automatically.
- there's also "connection close frame" and a few other service frames.

In the browser, we directly work only with text or binary frames.

**WebSocket `.send()` method can send either text or binary data.**

A call `socket.send(body)` allows `body` in string or a binary format, including `Blob`, `ArrayBuffer`, etc. No settings are required: just send it out in any format.

**When we receive the data, text always comes as string. And for binary data, we can choose between `Blob` and `ArrayBuffer` formats.**

That's set by `socket.binaryType` property, it's `"blob"` by default, so binary data comes as `Blob` objects.

[Blob](info:blob) is a high-level binary object, it directly integrates with `<a>`, `<img>` and other tags, so that's a sane default. But for binary processing, to access individual data bytes, we can change it to `"arraybuffer"`:

```js
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## Rate limiting

Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile internet, outside of a city.

We can call `socket.send(data)` again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

The `socket.bufferedAmount` property stores how many bytes remain buffered at this moment, waiting to be sent over the network.

We can examine it to see whether the socket is actually available for transmission.

```js
// every 100ms examine the socket and send more data  
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## Connection close

Normally, when a party wants to close the connection (both browser and server have equal rights), they send a "connection close frame" with a numeric code and a textual reason.

The method for that is:
```js
socket.close([code], [reason]);
```

- `code` is a special WebSocket closing code (optional)
- `reason` is a string that describes the reason of closing (optional)

Then the other party in the `close` event handler gets the code and the reason, e.g.:

```js
// closing party:
socket.close(1000, "Work complete");

// the other party
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

Most common code values:

- `1000` -- the default, normal closure (used if no `code` supplied),
- `1006` -- no way to set such code manually, indicates that the connection was lost (no close frame).

There are other codes like:

- `1001` -- the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` -- the message is too big to process,
- `1011` -- unexpected error on server,
- ...and so on.

The full list can be found in [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1).

WebSocket codes are somewhat like HTTP codes, but different. In particular, codes lower than `1000` are reserved, there'll be an error if we try to set such a code.

```js
// in case connection is broken
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```


## Connection state

To get connection state, additionally there's `socket.readyState` property with values:

- **`0`** -- "CONNECTING": the connection has not yet been established,
- **`1`** -- "OPEN": communicating,
- **`2`** -- "CLOSING": the connection is closing,
- **`3`** -- "CLOSED": the connection is closed.


## Chat example

Let's review a chat example using browser WebSocket API and Node.js WebSocket module <https://github.com/websockets/ws>. We'll pay the main attention to the client side, but the server is also simple.

HTML: we need a `<form>` to send messages and a `<div>` for incoming messages:

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

From JavaScript we want three things:
1. Open the connection.
2. On form submission -- `socket.send(message)` for the message.
3. On incoming message -- append it to `div#messages`.

Here's the code:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// send message from the form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// message received - show the message in div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

Server-side code is a little bit beyond our scope. Here we'll use Node.js, but you don't have to. Other platforms also have their means to work with WebSocket.

The server-side algorithm will be:

1. Create `clients = new Set()` -- a set of sockets.
2. For each accepted websocket, add it to the set `clients.add(socket)` and set `message` event listener to get its messages.
3. When a message is received: iterate over clients and send it to everyone.
4. When a connection is closed: `clients.delete(socket)`.

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // here we only handle websocket connections
  // in real project we'd have some other code here to handle non-websocket requests
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


Here's the working example:

[iframe src="chat" height="100" zip]

You can also download it (upper-right button in the iframe) and run it locally. Just don't forget to install [Node.js](https://nodejs.org/en/) and `npm install ws` before running.

## Summary

WebSocket is a modern way to have persistent browser-server connections.

- WebSockets don't have cross-origin limitations.
- They are well-supported in browsers.
- Can send/receive strings and binary data.

The API is simple.

Methods:
- `socket.send(data)`,
- `socket.close([code], [reason])`.

Events:
- `open`,
- `message`,
- `error`,
- `close`.

WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it's also possible to implement these capabilities manually.

Sometimes, to integrate WebSocket into existing projects, people run a WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use `wss://ws.site.com`, a subdomain that leads to the WebSocket server, while `https://site.com` goes to the main HTTP-server.

Surely, other ways of integration are also possible.
