# جستجو: *getElement و *querySelector

وقتی elementها به یکدیگر نزدیک هستند، استفاده از ویژگی‌های DOM navigation عالی است. اما اگر elementها نزدیک هم نباشند چه؟ چگونه باید به یک element دلخواه دسترسی داشته باشیم؟

روش‌های جستجوی دیگری برای آن وجود دارد. 

## id یا تنها document.getElementById

اگر یک element، دارای attribute (ویژگی) id باشد، می‌توانیم با استفاده از methodای به نام `document.getElementById(id)` به آن دسترسی داشته باشیم. اهمیتی ندارد که آن element کجا است. 

برای مثال: 

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // element دسترسی به
*!*
  let elem = document.getElementById('elem');
*/!*

  // پس‌زمینه‌ی آن را قرمز می‌‌کنیم
  elem.style.background = 'red';
</script>
```

همچنین، متغیری global وجود دارد که با `id` نام‌گذاری شده‌ است و به element ارجاع می‌دهد: 

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // است elem به نام id با DOM-element ارجاعی به elem
  elem.style.background = 'red';

  // درون خود یک خط تیره (-) دارد، پس نمی‌تواند نام یک متغیر باشد elem-content 
  // اما می‌توانیم با استفاده از براکت ([]) به آن دسترسی داشته باشیم: window['elem-content']
</script>
```

....مگر اینکه یک متغیر جاوا اسکریپت را با همین نام تعریف کنیم. در این صورت آن اولویت دارد:‌

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // <div id="elem"> پنج است، نه ارجاعی به elem الان مقدار
 
  alert(elem); // 5
</script>
```

```warn header=".ها استفاده نکنیدelement برای دسترسی به global لطفا از متغیرهای"
.توضیح داده شده است اما به طور معمول برای سازگاری پشتیبانی می‌شود [in the specification](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object) این رفتار در

.دسترسی ندارد، مشخص نیست که متغیر از کجا می‌آید HTML را می‌خواند و به JS نوشته شده‌اند مناسب است اما به طور کلی ایده‌ی خوبی نیست و ممکن است تعارض‌هایی در نام‌گذاری به وجود آورد و همچنین وقتی کسی کد HTML در inline های ساده‌ای که به صورتscript به ما کمک کند. این کار برای DOM و JS هایnamespace مرورگر تلاش می‌کند که با ترکیب 

.ارجاع دهیم element استفاده می‌کنیم تا به طور مستقیم به یک `id` از کجا آمده است ما برای کوتاهی و اختصار از elemnt اینجا در این آموزش وقتی مشخص است که

ترجیح داده می‌شودdocument.getElementById`  در زندگی واقعی 
```

``` smart header=" باید منحصر به فرد باشد `id`"
فقط یک element با `id` داده شده می‌تواند در document وجود داشته باشد.

اگر چند element با یک `id` مشخص داشته باشیم، رفتار methodای که از آن استفاده می‌کند می‌تواند غیرقابل پیش‌بینی باشد. برای مثال `document.getElementById` ممکن است هر یک از آن elementها را به صورت تصادفی برگرداند. پس لطفا به این قانون توجه داشته باشید و `id` را منحصر به فرد نگه دارید. 
```

```warn header=" فقط `document.getElementById`, نه `anyElem.getElementById`"
.داده شده می‌گردد `id` به دنبال document صدا بزنیم. آن در تمام document را روی اشیای `getElementById‍‍` ما تنها می‌توانیم
```

## querySelectorAll [#querySelectorAll]

با اختلاف، جامع‌ترین روش `elem.querySelectorAll(css)` بود که تمام elementهای درون `elem` که با css selector داده شده تطابق دارند را انتخاب می‌کند. 

اینحا به دنبال تمام `<li>`هایی هستیم که آخرین فرزند هستند: 

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

این method واقعا قدرتمند است، چون هر css selectorای می‌تواند استفاده شود. 

```smart header="pseudo-classها نیز می‌توانند استفاده شوند"
(تا درونی‌ترین آن‌ها `<html>` به ترتیب تو در تو: از بیرونی‌ترین) مجموعه‌ای از عناصری که نشانگر الان روی آن‌ها است را برمی‌گرداند. `document.querySelectorAll(':hover')`نیز پشتیبانی می‌شود. برای مثال `:active` و `:hover` هایی مثل Pseudo-class از
```

## querySelector [#querySelector]

فراخوانی `elem.querySelector(css)` اولین element را برای css selector داده شده برمی‌گرداند.

به عبارت دیگر، نتیجه با `elem.querySelectorAll(css)[0]` یکسان است اما دومی به دنبال *تمام* elementها است و یکی را انتخاب می‌کند در حالی که `elem.querySelector` فقط به دنبال یکی است. پس هم سریع‌تر است و هم برای نوشتن کوتاه‌تر است. 

## matches

روش‌های قبلی در DOM جستجو می‌کردند. 

عبارت [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) در جستجوی چیزی نیست، فقط چک می‌کند که element با CSS-selector داده شده مطابقت دارد یا نه و `true` یا `false` برمی‌گرداند. 

این روش زمانی به کار می‌آید که می‌خواهیم روی elementهایی (مثل آرایه یا همچین چیزی) iterate کنیم و آن‌هایی که مطلوب هستند را فیلتر کنیم. 

برای مثال:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // باشد document.body.children می‌تواند هر مجموعه‌ای به جای 
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("این آرشیو ارجاع می‌دهد به : " + elem.href );
    }
  }
</script>
```

## closest

*والدهای* یک element عبارت‌اند از: پدر، پدر پدر، پدر آن و ... . این والدها با یکدیگر زنجیره‌ای از والدها را از یک element به سمت بالا تشکیل می‌دهند. 

متد `elem.closest(css)` به دنبال نزدیک‌ترین والدی است که با CSS-selector تطابق دارد. خود `elem` هم شامل این جستجو می‌شود. 

به عبارت دیگر متد `closest` از element به سمت بالا می‌رود و هر یک از والدها را چک می‌کند. اگر با selector مطابقت داشته باشد، جستجو متوقف می‌شود و آن والد برگردانده می‌شود. 

برای مثال: 

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">بخش 1</li>
    <li class="chapter">بخش 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (یک والد نیست h1 چون)
</script>
```

## getElementsBy*

همچنین روش‌های دیگری برای جستجو برای یک node با tag، class و ... وجود دارد. 

امروزه آن‌ها کمتر استفاده می‌شوند چون `querySelector` قدرتمندتر است و برای نوشتن سریع‌تر است. 

پس اینجا ما بیشتر آن‌ها را برای کامل بودن پوشش می‌دهیم اما هنوز می‌توانید آن‌ها را در scriptهای قدیمی پیدا کنید. 

- عبارت `elem.getElementsByTagName(tag)` به دنبال elementهایی با tag داده شده است و مجموعه‌ی آن‌ها را برمی‌گرداند. پارامتر `tag` همچنین می‌تواند یک ستاره باشد `"*"` به معنای تمام tag ها.

- عبارت `elem.getElementsByClassName(className)` تمام elementهایی که کلاس CSS داده شده را دارند برمی‌گرداند. 

- عبارت `document.getElementsByName(name)`تمام elementهایی که `name` به عنوان attribute به آن‌ها داده شده است را برمی‌گرداند و بسیار کم استفاده می‌شود. 

برای مثال:‌
```js
//تمام div های درون document را می‌گیرد.
let divs = document.getElementsByTagName('div');
```

بیایید تمام tagهای `input` درون این table را پیدا کنیم:‌

```html run height=50
<table id="table">
  <tr>
    <td>سن شما:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> کمتر از 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> از 18 تا 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> بیشتر از 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="را فراموش نکنید. `\"s\"` عبارت"
برنامه‌نویس‌های تازه‌‌کار گاهی اوقات حرف ‍‍`"s"` را فراموش می‌کنند. یعنی، آن‌ها سعی می‌کنند به جای <code>getElement<b>s</b>ByTagName</code> عبارت  `getElementByTagName` را فراخوانی کنند.

حرف `"s"` در `getElementById` وجود ندارد زیرا یک element تک را برمی‌گرداند. اما `getElementsByTagName` مجموعه‌ای از عناصر را برمی‌گرداند،‌ پس یک `"s"` در آن هست. 
```

````warn header="element یک مجموعه را برمی‌گرداند، نه یک"
یک اشتباه رایج دیگر تازه‌کارانه این است که بنویسیم:

```js
// کار نمی‌کند
document.getElementsByTagName('input').value = 5;
```

این کار نمی‌کند،‌چون یک *مجموعه* از ورودی‌ها را می‌گیرد و مقدار را به جای element درون آن، به آن انتساب می‌دهد.

ما باید یا روی آن مجموعه iterate کنیم یا یک element را با عنصر آن بگیریم و بعد به آن انتساب دهیم. مثل این:‌

```js
// باید کار کند (اگر یک ورودی وجود داشته باشد)
document.getElementsByTagName('input')[0].value = 5;
```
````

`.article` هایelement جستجو برای

```html run height=50
<form name="my-form">
  <div class="article">مقاله</div>
  <div class="long article">مقاله طولانی</div>
</form>

<script>
  // name پیدا کردن با استفاده از ویژگی
  let form = document.getElementsByName('my-form')[0];

  // form داخل class پیدا کردن با استفاده از
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, پیدا شد article با کلاس element 2
</script>
```

## مجموعه‌های زنده

.می‌شوند update را منعکس می‌کنند و وقتی تغییر می‌کند، به صورت خودکار document یک مجموعه‌ی زنده برمی‌گردانند. چنین مجموعه‌هایی همیشه وضعیت فعلی `"getElementsBy*"` تمام متدهای

.داریم script در مثال زیر دو

.ایجاد می‌کند در حال حاضر طول آن `1` است  `<div>` اولی ارجاعی به مجموعه‌ی  
دیگر را ببیند پس طول آن `2` است `<div>` زمانی اجرا می‌شود که مرورگر یک script دومین 

```html run
<div>div اول</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>div دوم</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

.ها استelement را برمی‌گرداند که شبیه یک آرایه‌ی ثابت static یک مجموعه‌ی `querySelectorAll` ،متقابلا

.خروجی `1` را می‌دهند script اگر به جایش از آن استفاده کنیم، هر دو


```html run
<div>اول div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

.افزایش نیافته است static مجموعه‌ی ،document جدید در div حالا می‌توانیم تفاوت را به راحتی ببینیم. بعد از ایجاد شدن یک

## خلاصه

.وجود دارد DOM ها در node شش روش اصلی برای جستجو در

<table>
<thead>
<tr>
<td>روش</td>
<td>جستجو بر اساس ...</td>
<td>فراخوانی شود؟ element می‌تواند روی</td>
<td>زنده؟</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

.های قدیمی یافت شود script هم گاهی به صورت پراکنده می‌تواند مفید باشد یا در `getElement(s)By` شده است، اما `querySelectorAll` و `querySelector` با اختلاف بیشترین استفاده از

علاوه بر آن:

.تطابق دارد یا نه CSS-selector با elem برای این استفاده می‌شود که چک کنیم `elem.matches(css)` از عبارت -
.هم چک می‌شود `elem` داده شده تطابق دارند. خود CSS-selector برای جستجوی نزدیک‌ترین والدهایی است که با `elem.closest(css)` عبارت - 

و بیایید اینجا یک روش دیگر برای بررسی رابطه والد و فرزند را چک کنیم،‌چون بعضی وقت‌ها مفید است: 
.را برمی‌گرداند true مقدار `elemA.contains(elemB)` باشد، عبارت `elemA==elemB` یا وقتی که (`elemA` از فرزندان) باشد `elemA` داخل `elemB` اگر -
