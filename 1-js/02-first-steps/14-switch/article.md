# دستور "switch"

یک دستور ‍‍`switch` می‌تواند جایگزین چند `if` پشت سر هم بشود

این دستور توصیف یک متغیر که می‌تواند چند مقدار داشته باشد را راحت‌تر می‌کند.

## The syntax

یک دستور `switch` یک یا چند بلوک `case` دارد و می‌توان برای آن یک مقدار پیش‌فرض نیست تعریف کرد.

و بدین شکل نوشته می‌شود:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- در این مرحله چک می‌شود که مقدار `x` دقیقا با مقدار `case` اول برابر باشد. که اینجا مقدار آن `value1` است. سپس برابر بودن آن با (`value2`) چک می‌شود و به همین ترتیب ادامه پیدا می‌کند.
- اگر مقدار برابری پیدا کند، `switch` کد داخل `case` مورد نظر را اجرا می‌کند. و تا زمانی که به نزدیک‌ترین `break` برسد یا به پایان `switch` برسد این کار را ادامه می‌دهد.
- اگر با هیچ‌کدام از `case`ها جور نشود، کد `default` اجرا می‌شود. البته اگر وجود داشته باشد.

## یک مثال

یک مثال از دستور `switch` (کد اجراشده هایلایت شده است):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert('Exactly!');
    break;
*/!*
  case 5:
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

در اینجا دستور `switch` با مقایسه‌ی `a` با `case` اول شروع می‌کند. که در اینجا مقدار آن `3` است و تطابق ندارند.

سپس به سراغ `4` می‌رود. این یکی برابر است و تطابق پیدا می‌کند. پس اجرای کد از `case 4` شروع می‌شود و تا نزدیک‌ترین `break` ادامه می‌یابد.

**اگر `break` وجود نداشته باشد، `case`های بعدی هم اجرا می‌شوند.**

یک مثال بدون `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

در مثال بالا هر سه `alert` به‌ترتیب اجرا خواهند شد:

```js
alert("Exactly!");
alert("Too big");
alert("I don't know such values");
```

``smart header="هر عبارتی می‌تواند به یک `switch/case` تبدیل شود"
هم در `switch` و هم در `case` می‌توان از عبارت‌های قراردادی استفاده کرد.

برای مثال:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("این کد اجرا می‌شود چرا که +a برابر با 1 است و دقیقا با b+1 مساوی است");
    break;
*/!*

  default:
    alert("این اجرا نمی‌شود");
}
```

در اینجا `+a` برابر با `1` است و وقتی با `b + 1` در `case` مقایسه می‌شود، کد متناظر اجرا می‌شود.

````

## گروه‌بندی "case"

چند `case` مختلف که یک کد دارند، می‌تواند با هم قرار بگیرند.

برای مثال اگر می‌خواهیم یک کد یکسان برای `case 3` و `case 5` اجرا شود:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3: // (*) دو case را یک گروه می‌کنیم
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

حالا `3` و `5` پیام یکسانی نمایش می‌دهند.

این توانایی که می‌توان caseهای مختلف را گروه‌بندی کرد، به این خاطر است که `switch/case` بدون `break` کار می‌کند. اینجا اجرای کد `case 3` از خط `(*)` شروع می‌شود و تا خط `case 5` ادامه پیدا می‌کند. چرا که هیچ `break` وجود ندارد.

## نوع داده Type مهم است

اجازه دهید تاکید کنیم که چک برابری کاملا سخت‌گیرانه است. مقدار هر دو باید از یک نوع داده باشد. درغیراین صورت با هم تطابق پیدا نمی‌کنند.

برای مثال کد زیر را در نظر بگیرید:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' )
}
```

1. برای `0` و `1` اولین `alert` اجرا می‌شود.
2. برای `2` دومین `alert` اجرا می‌شود.
3. ولی برای `3` مقدار `prompt` یک string است و `"3"` با `3` با `===` برابر نیست. یعنی در `case 3` یک کد مرده داریم. و به‌همین دلیل `default` اجرا می‌شود.
````
