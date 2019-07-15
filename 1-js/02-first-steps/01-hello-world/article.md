# Hello, world!

<<<<<<< HEAD
آموزش پیش روی شما مفاهیم هسته‌ای جاوا اسکریپت است که وابسته به پلتفرم نیست. در ادامه با پلتفرم‌هایی مانند Node.JS و نحوه استفاده از آنها آشنا خواهیم شد.
=======
This part of the tutorial is about core JavaScript, the language itself. Later on, you'll learn about Node.js and other platforms that use it.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

ما برای اجرای اسکریپت‌هایی که می‌نویسیم به محیطی برای اجرا نیاز داریم و از آنجایی که این یک دوره آنلاین است، مرورگر انتخاب خوبی است. سعی ما بر این است تا از دستوراتی که اختصاصا مربوط به مرورگر هستند مانند `alert` کمتر استفاده کنیم. مخصوصا برای شمایی قصد استفاده از جاوا اسکریپت در پلتفرم‌های دیگری چون Node.JS را دارید.

پس ابتدا نگاهی به نحوه متصل کردن یک اسکریپت به یک صفحه وب می‌اندازیم. اگر در محیط Server Side هستید (مانند Node.JS) می‌توانید از این دستور برای اجرای اسکریپت استفاده نمایید : `node my.js`

## تگِ script

برنامه‌های جاوا اسکریپت با کمک تگِ `<script>` می‌توانند در هر جایی از سند HTML می‌توانند قرار داده شوند.

برای نمونه :   

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
با فشردن کلید Play در بالا سمت راست کادر، می‌توانید کدِ مثال را اجرا نمایید.
```

تگ `<script>` شامل کدهای جاوا اسکریپت است که به صورت خودکار با توسط مرورگر اجرا می‌شود.


## نشانه‌گذاری مدرن

تگ `<script>` تعدادی attributes (صفات) دارد که امروزه کمتر از آنها استفاده می‌شود، ولی ممکن است در کدهای قدیمی همچنان آنها را ببینید :


<<<<<<< HEAD
صفت  `type` : <code>&lt;script <u>type</u>=...&gt;</code>
: نسخه قدیمی HTML یعنی HTML4 نیازمند تعیین `type` در تگ `<script>` بود. معمولا مقدار آن `type=text/javascript` بود. در حال حاضر دیگر این مورد الزامی نیست. 
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard, HTML5, totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

صفت `language` : <code>&lt;script <u>language</u>=...&gt;</code>
: مقصود از این صفت تعیین زبان اسکریپت است. از آنجایی که جاوا اسکریپت زبان پیش‌فرض است، نیازی به تعیین آن نیست.

Comment های قبل و بعد از اسکریپت
: در کتاب‌ها و راهنماهای قدیمی، ممکن است با Comment داخل تگ `<script>` مواجه شوید. مانند :

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    این ترفند در جاوا اسکریپت مدرن استفاده نمی‌شود. از این روش برای پنهان کردن کدهای جاوا اسکریپتی که در مرورگرهای قدیمی نمی‌توانستند اجرا شوند، استفاده می‌شد. 


## اسکریپت‌‌های خارجی 

اگر حجم کدهای جاوا اسکریپت ما زیاد باشد می‌توانیم آنها را در فایل‌های جداگانه قرار دهیم.

فایل‌های جاوا اسکریپت از طریق صفت `src` می‌توانند به سند HTML متصل شوند :

```html
<script src="/path/to/script.js"></script>
```

در اینجا `/path/to/script.js` ما از آدرس دهی مطلق استفاده کرده‌ایم (که از دایرکتوری ریشه است).

امکان آدرس دهی به صورت نسبی هم وجود دارد. برای مثال `src="script.js"` به این معنی است که فایل `script.js` در دایرکتوری فعلی قرار دارد.

همینطور می‌توانیم از آدرس URL کامل استفاده کنیم :

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

برای اتصال چند اسکریپت :

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
به عنوان یک قاعده، فقط اسکریپت‌های ساده در فایل HTML قرار می‌گیرند و اسکریپت‌های پیچیده‎‌تر در فایل‌های جداگانه قرار داده می‌شوند. مزیت اینکار این است که مرورگر آن فایل‌ها را دانلود کرده و در حافظه خود ([cache}(https://en.wikipedia.org/wiki/Web_cache)) قرار می‌دهد.

بقیه صفحات که نیاز به آن اسکریپت دارند می‌توانند از نسخه‌ای که در کَش قرار گرفته استفاده کنند و به این ترتیب آن فایل اسکریپت فقط یکبار دانلود می‌شود.

این عمل باعث افزایش سرعت بارگذاری صفحات می‌شود.
```

````warn header="اگر `src` در تگ `<script>` تعریف شده باشد، محتوای تگ نادیده گرفته می‌شود"
تگ `<script>` نمی‌تواند همزمان `src` و محتوا داشته باشد.

این کد کار نخواهد کرد :

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

باید انتخاب کنیم که می‌خواهیم از `<script>` به شکل عادی استفاده کنیم یا `<script src="…">` . 

مثال بالا می‌تواند به این شکل نوشته شود :

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## خلاصه

- می‌توانیم با استفاده از تگ `<script>` کدهای جاوا اسکریپت را در صفحه استفاده کنیم.
- صفات `language` و `type` الزامی نیستند.
- اسکریپتی که در محلی خارج از فایل HTML قرار می‌تواند به این صورت استفاده شود : `<script src="path/to/script.js"></script>`.