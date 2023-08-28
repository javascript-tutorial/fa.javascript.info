
# Mutation observer

 همان طور که می دانیم `MutationObserver` یک شی داخلی است که یک عنصر DOM را مشاهده می کند و هنگامی که تغییری را تشخیص می دهد یک تماس برگشتی ایجاد می کند.

ابتدا نگاهی به نحو می اندازیم و سپس یک مورد استفاده در دنیای واقعی را بررسی می کنیم تا ببینیم چنین چیزی در کجا ممکن است مفید باشد.

## Syntax

استفاده از `MutationObserver` بسیار ساده است.

اول از ههمه، یک observer با استفاده از callback-function می سازیم:  

```js
let observer = new MutationObserver(callback);
```

و بعد observer را به DOM node، attach  می کند.

```js
observer.observe(node, config);
```
 (کانفیگ)`config` یک شی با  boolean options "به چه نوع تغییراتی باید واکنش نشان داد" است:
- `childList` --  `node` از direct children تغییراتی در 
- `subtree` --`node` در همه فرزندان 
- `attributes` -- attributes های `node`,
- `attributeFilter` --که فقط سلکت شده ها را ببینیم ،attribute name یک ارایه از
- `characterData` -- whether to observe `node.data` (text content),
- `characterData` -- ایا `node.data` (text content) را مشاهده کنیم یا نه 

چند گزینه دیگر:
- `attributeOldValue` --بود هم مقدار قذیم و هم مقدار جدید attribute به callback  پاس داده می شود `true` اگر 
- `characterDataOldValue` --(needs `characterData` option) پاس می دهیم، در غیر این صورت فقط مقدار جدید را callback را یه  `node.data` بود هم مقدار جدید و هم مقدار قدیم `true` اگر

Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` -- mutation type, یکی از موارد زیر
    - `"attributes"`: attribute modified
    - `"characterData"`: data modified, used for text nodes,
    - `"childList"`: child elements added/removed,
- `target` -- where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,
- `addedNodes/removedNodes`  -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.

برای مثال، در مثال زیر یک `<div>` با یک `contentEditable` وجود دارد. این attribute به ما اجازه میدهد روی آن و ادیت کردن آن تمرکز کنیم.  

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
});
</script>
```

اگر ما این کد را در browser run کنیم، و بعد روی `<div>` داده شده و تغییرات درون `<b>edit</b>` تمرکز کنیم، `console.log` یک mutation نشان می دهد:    

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
```

اگر ما ادیت های پیچیده تری را اجرا کنیم، مانند ریمو کردن `<b>edit</b>`، آن گاه mutation event ممکن است شامل تعدادی mutation records باشد:   

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
```

پس، `MutationObserver` اجازه می دهد که به هر اغییری در DOM subtree واکنش نشان دهیم.

## Usage for integration

چه زمانی این اتفاقات به صورت دیفالت رخ می دهند؟

شرایطی را تصور کنید که باید یک اسکریپت شخص ثالث اضافه کنید که حاوی عملکرد مفید باشد، اما همچنین کاری ناخواسته انجام دهد، به عنوان مثال تبلیغات `<div class="ads">Unwanted ads</div>` را نشان می دهد.


به طور طبیعی، اسکریپت شخص ثالث هیچ مکانیزمی برای حذف آن ارائه نمی دهد.

با استفاده از `MutationObserver`، می توانیم تشخیص دهیم که عنصر ناخواسته در DOM ما ظاهر می شود و آن را حذف می کنیم.

موقعیت‌های دیگری هم وجود دارد که یک اسکریپت شخص ثالث چیزی را به سند ما اضافه می‌کند، و ما می‌خواهیم زمانی که این اتفاق می‌افتد، صفحه خود را تطبیق دهیم، اندازه چیزی را به صورت پویا تغییر اندازه دهیم و غیره.

 هم چنین `MutationObserver` امکان اجرای این را فراهم می کند.

## Usage for architecture

همچنین شرایطی وجود دارد که `MutationObserver` از نظر معماری خوب است.

فرض کنید در حال ساخت یک وب سایت در مورد برنامه نویسی هستیم. به طور طبیعی، مقالات و سایر مطالب ممکن است حاوی کد منبع باشند.

چنین قطعه ای در نشانه گذاری HTML به شکل زیر است:

```html
...
<pre class="language-javascript"><code>
  // here's the code
  let hello = "world";
</code></pre>
...
```
 کردن آن، از کتابخانه برجسته سازی نحوی جاوا اسکریپت در سایت خود مانند [Prism.js](https://prismjs.com/) استفاده خواهیم کرد. برای دریافت syntax highlighting برای قطعه بالا درprism، که `Prism.highlightElem(pre)` نامیده می‌شود، که محتویات چنین عناصر`pre`را بررسی می‌کند و تگ‌ها و سبک‌های خاصی را برای  syntax highlighting رنگی به آن عناصر اضافه می‌کند، مشابه آنچه در این صفحه می بینید.

دقیقاً چه زمانی باید آن روش برجسته سازی را اجرا کنیم؟ خوب، می‌توانیم این کار را در رویداد  `DOMContentLoaded` انجام دهیم یا اسکریپت را در پایین صفحه قرار دهیم. لحظه‌ای که DOM ما آماده است، می‌توانیم عناصر `pre[class*="language"]` را جستجو کنیم و روی آنها  `Prism.highlightElem` را صدا کنیم:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Everything's simple so far, right? We find code snippets in HTML and highlight them.

Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch). For now it only matters that we fetch an HTML article from a webserver and display it on demand:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won't get highlighted.

**Where and when to call `Prism.highlightElem` for a dynamically loaded article?**

We could append that call to the code that loads an article, like this:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.

Luckily, there's another option.

We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.

So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.

### Dynamic highlight demo

Here's the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // examine new nodes, is there anything to highlight?

    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // or maybe there's a code snippet somewhere in its subtree?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

در اینجا، در زیر، یک عنصر HTML و جاوااسکریپت وجود دارد که به صورت پویا با استفاده از `innerHTML` آن را پر می کند.

لطفا کد قبلی را اجرا کنید (در بالا، آن عنصر را مشاهده کنید)، و سپس کد زیر را اجرا کنید. خواهید دید که چگونه  `MutationObserver` قطعه را شناسایی و برجسته می کند.

<p id="highlight-demo" style="border: 1px solid #ddd">یک عنصر آزمایشی با <code>id="highlight-demo"</code>، کد بالا را اجرا کنید تا آن را مشاهده کنید.</ p>

کد زیر `innerHTML` خود را پر می کند، که باعث می شود`MutationObserver` واکنش نشان داده و محتوای آن را برجسته کند:

```js run
let demoElem = document.getElementById('highlight-demo');

// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

اکنون `MutationObserver` را داریم که می تواند تمام برجسته سازی ها در عناصر مشاهده شده یا کل `document` را ردیابی کند. ما می‌توانیم تکه‌های کد را بدون فکر کردن در HTML اضافه یا حذف کنیم.

## Additional methods

روشی برای توقف مشاهده گره وجود دارد:

- `observer.disconnect()` - مشاهده را متوقف می کند.

وقتی مشاهده را متوقف می کنیم، ممکن است برخی از تغییرات هنوز توسط ناظر پردازش نشده باشد. در چنین مواردی استفاده می کنیم

-`observer.takeRecords()` - لیستی از سوابق جهش پردازش نشده را دریافت می کند - مواردی که اتفاق افتاده اند، اما پاسخ تماس آنها را مدیریت نکرده است.

این روش ها را می توان با هم استفاده کرد، مانند:

```js
// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
let mutationRecords = observer.takeRecords();

// stop tracking changes
observer.disconnect();
...
```


```smart header="Records returned by `observer.takeRecords()` are removed from the processing queue"
The callback won't be called for records, returned by `observer.takeRecords()`.
```

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
```

## Summary  

 پس`MutationObserver` می تواند به تغییرات در DOM - ویژگی ها، محتوای متن و افزودن/حذف عناصر واکنش نشان دهد.

ما می‌توانیم از آن برای ردیابی تغییرات ایجاد شده توسط بخش‌های دیگر کدمان و همچنین برای ادغام با اسکریپت‌های شخص ثالث استفاده کنیم.

هم چنین `MutationObserver` می تواند هر تغییری را ردیابی کند. تنظیمات "چه چیزی را مشاهده کنیم" برای بهینه سازی استفاده می شود، نه برای صرف منابع در فراخوانی های غیر ضروری.
