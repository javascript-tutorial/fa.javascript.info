# The Modern JavaScript Tutorial in Persian (Farsi)

This repository hosts the translation of <https://javascript.info> in Persian (Farsi).

**Got a question to ask? feel free to ask in our Telegram group: [t.me/javascriptFa](https://t.me/javascriptFa)**

**That's how you can contribute:**

- See the [Persian (Farsi) Translate Progress](https://github.com/javascript-tutorial/fa.javascript.info/issues/1) issue.
- Choose an unchecked article you'd like to translate.
- Add a comment with the article title to the issue, e.g. `An Introduction to JavaScript`.
    - Our bot will mark it in the issue, for everyone to know that you're translating it.
    - Your comment should contain only the title.
- Fork the repository, translate and send a PR when done.
    - PR title should match article title, the bot will write it's number into the issue.

Please kindly allow maintainers to review and merge or request changes in your translation.
   
If maintainers do not respond, or if you'd like to become a maintainer, write us at the [main repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new).
    
**Let others know what you're translating, in message boards or chats in your language. Invite them to join!**

🎉 Thank you!

We'd also like to collaborate on the tutorial with other people.

Something's wrong? A topic is missing? Explain it to people, add it as PR 👏

**You can edit the text in any editor.** The tutorial uses an enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.

The list of contributors is available at <https://javascript.info/about#contributors>.

## Structure

Every chapter, article, or task has its folder.

The folder is named like `N-url`, where `N` is a number for the sorting purposes and `URL` is the URL part with the title of the material.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

Each of these files starts from the # Main header.

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

Please keep line breaks and paragraphs "as is": don't add newlines and don't remove existing ones. Makes it easy to merge future changes from the English version into the translation. 

If you see that the English version can be improved – great, please send a PR to it.

### Terms

- Some specification terms are not to be translated, e.g. "Function Declaration" can be left "as is".
- For other terms like `resolved promise`, `slash`, `regexp`, and so on look a good glossary, hopefully there's one for your language already.
    - If there's no dictionary, look for translations in manuals, such as [MDN](https://developer.mozilla.org/en-US/).

### Text in Code Blocks

- Translate comments.
- Translate user-messages and example strings.
- Don't translate variables, classes, identifiers.
- Ensure that the code works after the translation :)

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### External Links

If an external link is to Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, and a version of that article exists in your language that is of decent quality, link to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, a partially translated version is ok.

If a linked article has no translated version, leave the link "as is".

### Metadata

Some files, usually tasks, have YAML metadata at the top, delimited by `---`:

```md
importance: 5

---
...
```

Please don't translate "importance" (and other top metadata).

### Anchors

Some headers have `[#anchor]` at the end, e.g.

```md
## Spread operator [#spread-operator]
```

Please don't translate or remove the `[#...]` part, it's for URL anchors.

<div dir="rtl">
    
## نکات ترجمهٔ فارسی
در این بخش، نکاتی مختص ترجمه به زبان فارسی را بررسی می‌کنیم. لطفاً قبل از خواندن این بخش، [نکات کلی ترجمه](#translation-tips) را مطالعه کنید.
    
### نیم‌فاصله
نیم‌فاصله، نویسه‌ای در استاندارد یونی‌کد است که برای حروفچینی کامپیوتری برخی خط‌ها همچون خط فارسی و خط‌های هندیک به‌کار می‌رود.[^1]
برای خوانایی بهتر متن لطفاً از آن استفاده کنید اما اگر قصد انجام چنین کاری را ندارید، لطفاً در هیچ کجای متن از آن استفاده نکنید تا ترجمه‌ای یک‌دست داشته باشیم. 

برای آشنایی با نحوهٔ استفاده از نیم‌فاصله، به صفحهٔ آن [^1] در ویکی‌پدیای فارسی مراجعه کنید.  
    
### ترجمۀ کامنت‌ها در کد
ترجمۀ کامنت‌ها می‌تواند کمی دشوار باشد. ترجمۀ کامنت‌هایی که کاملا فارسی هستند به درستی در بلوک‌های کد نشان داده می‌شوند اما ترجمه‌هایی که شامل کلمات انگلیسی می‌شوند خوانایی راحتی ندارند.

برای خوانا کردن کامنت‌های نوع دوم، باید ترتیب نوشتن را تغییر دهیم. برای مثال کامنت پایین را در نظر بگیرید:

<div dir="ltr">

```
... code ...
// We want the for..of to work
... code ...
```
</div>

ترجمۀ معمولی این کامنت به صورت زیر خواهد بود:

<div dir="ltr">

```
... code ...
// ما می‌خواهیم که for..of کار کند
... code ...
```
</div>

برای خوانا کردن این کامنت، باید ترتیب نوشتن را تغییر دهیم. با شروع از راست به چپ، به صورت زیر عمل می‌کنیم:

1. به عبارت «کار کند» می‌رسیم و آن را می‌نویسیم:

<div dir="ltr">

```
... code ...
// ما می‌خواهیم for..of کار کند
// کار کند
... code ...
```
</div>

2. سپس به عبارت «for..of» می‌رسیم و آن را می‌نویسیم:

<div dir="ltr">

```
... code ...
// ما می‌خواهیم for..of کار کند
// کار کند for..of
... code ...
```
</div>

3. به عبارت «ما می‌خواهیم» می‌رسیم و آن را می‌نویسیم:

<div dir="ltr">

```
... code ...
// ما می‌خواهیم for..of کار کند
// کار کند for..of ما می‌خواهیم
... code ...
```
</div>

4. در نهایت کامنت قبلی را پاک می‌کنیم. ترجمۀ نهایی به این صورت است:

<div dir="ltr">

```
... code ...
// کار کند for..of ما می‌خواهیم
... code ...
```
</div>

همانطور که می‌بینید با برعکس کردن ترتیب عبارات ترجمه شده از راست به چپ کامنت خوانایی خود را بدست آورد.

این روش ممکن است کمی دشوار به نظر برسد اما ارزش آن را دارد. فراموش نکنید خوانا بودن متن به فهم آن کمک زیادی می‌کند.

**توجه کنید که این روش تنها برای ترجمۀ کامنت‌ها استفاده می‌شود و متن اصلی به این روش نیازی ندارد.** متن اصلی مانند جملات بالایی و به صورت معمولی ترجمه می‌شود.

مثال‌هایی بیشتر (نوشتن مراحل در این مثال‌ها تنها برای فهم بهتر است و شما نیازی به نوشتن مراحل ندارید. کامنت‌ها باید بدون نوشتن مراحل ترجمه شوند):

<div dir="ltr">

```
... code ...
// await تنها در توابع async کار می کند
// 1. کار می‌کند
// 2. کار می‌کند async
// 3. کار می‌کند async تنها در توابع
// 4. کار می‌کند async تنها در توابع await
... code ...
```
</div>

<div dir="ltr">

```
... code ...
// بعد از 1000 میلی ثانیه با مقدار this.num * 2 حل می شود
// 1. حل می‌شود
// 2. حل می‌شود this.num * 2
// 3. حل می‌شود this.num * 2 بعد از 1000 میلی ثانیه با مقدار
... code ...
```
</div>

<div dir="ltr">

```js
let hello = 'Hello world!';

let message;

// 'Hello world' را از hello درون message کپی کن
// 1. کپی کن
// 2. کپی کن message
// 3. کپی کن message درون
// 4. کپی کن message درون hello
// 5. کپی کن message درون hello را از
// 6. کپی کن message درون hello را از 'Hello world'
message = hello;
```
</div>

در صورتی که راه بهتری را برای ترجمۀ کامنت‌ها سراغ دارید ممنون می‌شویم با [ساختن یک issue](https://github.com/javascript-tutorial/fa.javascript.info/issues/new/choose)
آن را با ما در میان بگذارید.

### ترجمۀ ارورها در کامنت
در بعضی از کدهای موجود در این آموزش، ارورهایی که هنگام اجرای کد به آن‌ها برمی‌خوریم به صورت کامنت نوشته شده‌اند.  
    
لطفا قبل از ترجمۀ ارورها، کد مربوط به آن را اجرا کنید (برای این کار می‌توانید به صفحۀ انگلیسی مقاله در [javascript.info](https://javascript.info) مراجعه کنید). پس از اجرای کد به ارور نمایش داده شده دقت کنید: اگر ارور دقیقا همان چیزی بود که در کامنت نوشته شده بود آن را ترجمه نکنید، در غیر این صورت کامنت نیاز به ترجمه دارد.
    
### ترجمۀ رشته‌ها (string)
به طور کلی ترجمۀ رشته‌ها مشکلی ایجاد نمی‌کند. اما اینکه رشته درون مرورگر نمایش داده خواهد شد یا نه تاثیرگذار است.
    
زمانی که ترجمۀ رشته‌ای کلمۀ انگلیسی ندارد هم در کد خوانا است و هم زمان نمایش در مرورگر. اما رشته‌ای که حاوی کلمۀ انگلیسی باشد در کد خوانا نیست ولی اگر با کلمۀ فارسی شروع شود در مرورگر به درستی و از راست به چپ نمایش داده می‌شود.   
    
پس لطفا زمان ترجمۀ رشته‌ها به این دقت کنید که رشته درون `alert` (یا تابع‌هایی که در مرورگر پیامی را نمایش می‌دهند) قرار می‌گیرد یا نه. در صورتی که رشته درون این تابع قرار داشت و با کلمۀ فارسی شروع می‌شد، ترجمۀ آن مانند متن اصلی است اما اگر با کلمۀ انگلیسی شروع می‌شد، سعی کنید قبل از آن کلمه‌ای فارسی قرار دهید. اگر امکان قرار دادن کلمۀ فارسی نبود، رشته را مانند [کامنت‌های درون کد](#ترجمۀ-کامنتها-در-کد) ترجمه کنید؛ اینگونه ممکن است رشته زمان نمایش در مرورگر به درستی نمایش داده نشود اما حداقل درون کد خوانا است.
    
### نکات جزئی

- خوانایی جمله مهم است، لطفا به آن توجه کنید.
- استفاده از علائم نگارشی حتما نباید دقیقا مانند متن باشد. ممکن است ما در فارسی جایی ویرگول نگذاریم اما در انگلیسی نیاز به کاما وجود داشته باشد. فقط بیان جلمات را تغییر ندهید، برای مثال اگر جمله سوالی یا تعجبی نیست علائم مربوط را اضافه یا حذف نکنید.
- مقدارهای بولین (boolean) را ترجمه نکنید.

</div>

[^1]: [نیم‌فاصله در ویکی‌پدیای فارسی](https://fa.wikipedia.org/wiki/%D9%81%D8%A7%D8%B5%D9%84%D9%87_%D9%85%D8%AC%D8%A7%D8%B2%DB%8C)
