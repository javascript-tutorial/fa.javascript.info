libs:
  - d3
  - domtree

---

# درخت DOM
ستون فقرات سند html تگ ها هستند.

طبق مدل Document Object (DOM)، هر تگ HTML یک شی است. تگ های داخلی "فرزندانِ" برچسب های دربرگیرنده هستند. متن داخل تگ نیز یک شی است.

همه این اشیا با استفاده از جاوا اسکریپت قابل دسترسی هستند و ما می توانیم از آنها برای تغییر صفحه استفاده کنیم.

به عنوان مثال، `document.body` شیئی است که تگ `<body>` را نشان می دهد.

با اجرای این کد، `<body>` به مدت 3 ثانیه قرمز می شود:

```js run
document.body.style.background = 'red'; // پس زمینه را قرمز کن

setTimeout(() => document.body.style.background = '', 3000); // برگرد
```

در اینجا ما از `style.background` برای تغییر رنگ پس زمینه `document.body` استفاده کردیم، اما ویژگی های زیادِ دیگری وجود دارد، مانند:

- `innerHTML` -- HTML محتویاتِ گره
- `offsetWidth` -- عرض گره (بر حسب پیکسل)
- غیره و ...

به زودی راه های بیشتری برای دستکاری DOM یاد خواهیم گرفت، اما ابتدا باید ساختار آن را بدانیم.

## نمونه ای از DOM

بیایید با سند ساده زیر شروع کنیم:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>درباره گوزن شمالی</title>
</head>
<body>
  حقیقت درباره گوزن شمالی.
</body>
</html>
```

اینجا چگونه به نظر می رسد که DOM اچ تی ام ال را به عنوان یک ساختار درختی از تگ ها نشان می دهد:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"درباره گوزن شمالی"}]},{"name":"#text","nodeType":3,"content":"\n"}]},{"name":"#text","nodeType":3,"content":"\n"},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  حقیقت درباره گوزن شمالی.\n\n\n"}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>


```online
در تصویر بالا، می توانید روی گره های عنصر کلیک کنید و فرزندان آنها باز می شوند.
```

هر گره ی درخت یک شی است.

تگها *گره های عنصر* (عناصر) هستند و ساختار درختی را تشکیل می دهند: `<html>` در ریشه است، سپس `<head>` و `<body>` فرزندان آن هستند و ....

متن داخل عناصر *گره های متنی* را تشکیل می دهد که با عنوان `text#` برچسب گذاری شده اند. یک گره متنی فقط شامل یک رشته است. ممکن است فرزندی نداشته باشد و همیشه برگ درخت باشد.

به عنوان مثال تگِ `<title>` متن `"درباره ی گوزن شمالی"` را دارد.

لطفاً به کاراکترهای خاص در گره های متن توجه کنید:

- یک خط جدید: `↵` (در جاوااسکریپت به `n\` شناخته میشود.)
- یک فاصله(space) : `␣`

فاصله ها و خطوط جدید کاراکترهای کاملاً معتبری هستند، مانند حروف و اعداد. آنها گره های متنی را تشکیل می دهند و بخشی از DOM می شوند. بنابراین، برای مثال، در مثال بالا، تگ `<head>` حاوی چند فاصله قبل از `<title>` است، و آن متن به یک گره `text#` تبدیل می‌شود (که فقط حاوی یک خط جدید و چند فاصله است).

فقط دو استثناء سطح بالا وجود دارد:
1. فاصله ها و خطوط جدید قبل از `<head>` به دلایل تاریخی نادیده گرفته می شوند.
2. اگر چیزی را بعد از `</body>` قرار دهیم، در پایان به طور خودکار به داخل `body` منتقل می‌شود، زیرا مشخصات HTML ایجاب می‌کند که تمام محتوا باید داخل `<body>` باشد. بنابراین هیچ فاصله ای بعد از `</body>` وجود ندارد.

در موارد دیگر همه چیز سر راست است -- اگر در سند فاصله وجود داشته باشد(دقیقاً مانند هر کاراکتری)، آنها به گره های متنی در DOM تبدیل می شوند، و اگر آنها را حذف کنیم،   وجود نخواهند داشت.

در اینجا هیچ گره متنی صرفا-فاصله وجود ندارد:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>درباره ی گوزن شمالی</title></head><body>حقیقت در مورد گوزن شمالی.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elk."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="Spaces at string start/end and space-only text nodes are usually hidden in tools"
ابزارهای مرورگر (به زودی نشان داده خواهد شد) که با DOM کار می کنند معمولاً فاصله ها را در ابتدا / انتهای متن و گره های متنِ خالیِ بین تگ ها(خطوط شکسته)  را نشان نمی دهند.

ابزارهای توسعه دهنده(ابزارهای مرورگر) از این طریق فضای صفحه را حفظ می کنند.

در ادامه ی تصاویر DOM ، گاهی اوقات زمانی که نامربوط هستند آنها را حذف می کنیم. چنین فضاهایی معمولاً بر نحوه نمایش سند تأثیر نمی گذارد.
```

## تصحیح خودکار

اگر مرورگر با HTML نادرست مواجه شود، هنگام ساخت DOM به طور خودکار آن را تصحیح می کند.

به عنوان مثال، تگ بالا همیشه `<html>` است. حتی اگر در سند وجود نداشته باشد، در DOM وجود خواهد داشت، زیرا مرورگر آن را ایجاد می کند. `<body>` هم همینطور.

به عنوان مثال، اگر فایل HTML تنها کلمه `"Hello"` باشد، مرورگر آن را با `<html>` و `<body>` می پیچد و `<head>` ضروری را اضافه می‌کند و DOM اینطور خواهد بود:


<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

هنگام تولید DOM، مرورگرها به طور خودکار خطاهای سند را پردازش می کنند، تگ ها را می بندند و غیره.

سندی با تگ های بسته نشده:

```html no-beautify
<p>سلام
<li>مامان
<li>و
<li>بابا
```

...وقتی مرورگر تگ ها را می خواند و قسمت های از دست رفته را بازیابی می کند، به یک DOM معمولی تبدیل می شود:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````
warn header="جداول همیشه تگ `<tbody>` دارند."

یک چیز جالب "مورد خاص" جداول است. بر اساس مشخصات DOM، آنها باید تگ `<tbody>` داشته باشند، اما متن HTML ممکن است آن را از قلم انداخته باشد. سپس مرورگر به صورت خودکار `<tbody>` را در DOM ایجاد می کند.

برای HTML:

 ```html no-beautify
 <table id="table"><tr><td>1</td></tr></table>
 ```
ساختار DOM اینطور خواهد بود:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

می بینی؟ `<tbody>` از ناکجاآباد ظاهر شد. هنگام کار با جداول باید این را در نظر داشته باشیم تا از غافلگیری جلوگیری کنیم.
````

## انواع دیگر گره ها

علاوه بر عناصر و گره های متن، انواع گره های دیگری نیز وجود دارد.

به عنوان مثال، نظرات:

```html
<!DOCTYPE HTML>
<html>
<body>
  حقیقت در مورد گوزن.
  <ol>
    <li>گوزن شمالی باهوش است</li>
*!*
    <!-- comment -->
*/!*
    <li>...و حیوانی حیله گر!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  حقیقت در مورد گوزن.\n  "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"گوزن شمالی باهوش است"}]},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...و حیوانی حیله گر!"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n\n\n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

ما می‌توانیم در اینجا یک نوع گره درختی جدید ببینیم -- *گره comment*، با برچسب `comment#`، بین دو گره متن.

ممکن است فکر کنیم -- چرا یک comment به DOM اضافه شده است؟ به هیچ وجه بر نمایش بصری تأثیر نمی گذارد. اما یک قانون وجود دارد - اگر چیزی در HTML است، باید در درخت DOM نیز باشد.

**Everything in HTML, even comments, becomes a part of the DOM.**

Even the `<!DOCTYPE...>` directive at the very beginning of HTML is also a DOM node. It's in the DOM tree right before `<html>`. Few people know about that. We are not going to touch that node, we even don't draw it on diagrams, but it's there.

The `document` object that represents the whole document is, formally, a DOM node as well.

There are [12 node types](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

1. `document` -- the "entry point" into DOM.
2. element nodes -- HTML-tags, the tree building blocks.
3. text nodes -- contain text.
4. comments -- sometimes we can put information there, it won't be shown, but JS can read it from the DOM.

## See it for yourself

To see the DOM structure in real-time, try [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.

Another way to explore the DOM is to use the browser developer tools. Actually, that's what we use when developing.

To do so, open the web page [elk.html](elk.html), turn on the browser developer tools and switch to the Elements tab.

It should look like this:

![](elk.svg)

You can see the DOM, click on elements, see their details and so on.

Please note that the DOM structure in developer tools is simplified. Text nodes are shown just as text. And there are no "blank" (space only) text nodes at all. That's fine, because most of the time we are interested in element nodes.

Clicking the <span class="devtools" style="background-position:-328px -124px"></span> button in the left-upper corner allows us to choose a node from the webpage using a mouse (or other pointer devices) and "inspect" it (scroll to it in the Elements tab). This works great when we have a huge HTML page (and corresponding huge DOM) and would like to see the place of a particular element in it.

Another way to do it would be just right-clicking on a webpage and selecting "Inspect" in the context menu.

![](inspect.svg)

At the right part of the tools there are the following subtabs:
- **Styles** -- we can see CSS applied to the current element rule by rule, including built-in rules (gray). Almost everything can be edited in-place, including the dimensions/margins/paddings of the box below.
- **Computed** -- to see CSS applied to the element by property: for each property we can see a rule that gives it (including CSS inheritance and such).
- **Event Listeners** -- to see event listeners attached to DOM elements (we'll cover them in the next part of the tutorial).
- ...and so on.

The best way to study them is to click around. Most values are editable in-place.

## Interaction with console

As we work the DOM, we also may want to apply JavaScript to it. Like: get a node and run some code to modify it, to see the result. Here are few tips to travel between the Elements tab and the console.

For the start:

1. Select the first `<li>` in the Elements tab.
2. Press `key:Esc` -- it will open console right below the Elements tab.

Now the last selected element is available as `$0`, the previously selected is `$1` etc.

We can run commands on them. For instance, `$0.style.background = 'red'` makes the selected list item red, like this:

![](domconsole0.svg)

That's how to get a node from Elements in Console.

There's also a road back. If there's a variable referencing a DOM node, then we can use the command `inspect(node)` in Console to see it in the Elements pane.

Or we can just output the DOM node in the console and explore "in-place", like `document.body` below:

![](domconsole1.svg)

That's for debugging purposes of course. From the next chapter on we'll access and modify DOM using JavaScript.

The browser developer tools are a great help in development: we can explore the DOM, try things and see what goes wrong.

## Summary

An HTML/XML document is represented inside the browser as the DOM tree.

- Tags become element nodes and form the structure.
- Text becomes text nodes.
- ...etc, everything in HTML has its place in DOM, even comments.

We can use developer tools to inspect DOM and modify it manually.

Here we covered the basics, the most used and important actions to start with. There's an extensive documentation about Chrome Developer Tools at <https://developers.google.com/web/tools/chrome-devtools>. The best way to learn the tools is to click here and there, read menus: most options are obvious. Later, when you know them in general, read the docs and pick up the rest.

DOM nodes have properties and methods that allow us to travel between them, modify them, move around the page, and more. We'll get down to them in the next chapters.
