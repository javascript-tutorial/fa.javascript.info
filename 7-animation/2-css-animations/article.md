# CSS انیمیشن های

نیمیشن‌های CSS امکان انجام انیمیشن‌های ساده را بدون جاوا اسکریپت فراهم می‌کنند.

جاوا اسکریپت می تواند برای کنترل انیمیشن های CSS و حتی بهتر کردن آنها با کد کمی استفاده شود.

## انتقال CSS [#css-transition]

ایده انتقال CSS ساده است. ما یک ویژگی را توضیح می دهیم و چگونه تغییرات آن باید متحرک شود. هنگامی که ویژگی تغییر می کند، مرورگر انیمیشن را رنگ می کند.

یعنی تنها چیزی که نیاز داریم تغییر ویژگی است و انتقال سیال توسط مرورگر انجام می شود.

برای مثال، CSS زیر تغییرات 'رنگ پس‌زمینه' را به مدت ۳ ثانیه متحرک می‌کند:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

حال اگر عنصری دارای کلاس '.animated' باشد، هر تغییری در 'رنگ پس‌زمینه' در طول 3 ثانیه متحرک می‌شود.

برای متحرک سازی پس زمینه روی دکمه زیر کلیک کنید:

```html run autorun height=60
<button id="color">Click me</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

4 ویژگی برای توصیف انتقال CSS وجود دارد:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

ما آنها را در یک لحظه پوشش خواهیم داد، فعلاً توجه داشته باشیم که ویژگی مشترک 'transition' اجازه می دهد تا آنها را با هم به ترتیب اعلام کنیم: 'تأخیر زمان بندی-عملکرد مدت زمان' و همچنین متحرک سازی چندین ویژگی به طور همزمان.

به عنوان مثال، این دکمه هم `color` و هم `font-size` را متحرک می کند:

```html run height=80 autorun no-beautify
<button id="growing">Click me</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

حالا بیایید ویژگی های انیمیشن را یکی یکی پوشش دهیم.

## transition-property

در «transition-property»، ما فهرستی از ویژگی‌ها را برای متحرک کردن می‌نویسیم، به‌عنوان مثال: `left`, `margin-left`, `height`, `color`. یا می‌توانیم `all` را بنویسیم که به معنای «animate به همه ویژگی‌ها» است.

توجه داشته باشید که ویژگی هایی وجود دارد که نمی توان آنها را متحرک کرد. با این حال، [بیشتر ویژگی‌هایی که معمولاً مورد استفاده قرار می‌گیرند متحرک هستند](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## مدت زمان انتقال

در 'transition-duration' می‌توانیم مشخص کنیم که انیمیشن چقدر طول می‌کشد. زمان باید در [قالب زمان CSS](https://www.w3.org/TR/css3-values/#time): بر حسب ثانیه یا میلی ثانیه «ms» باشد.

## transition-delay

در `transition-delay` می‌توانیم تاخیر *قبل از* انیمیشن را مشخص کنیم. برای مثال، اگر `تاخیر انتقال` `1 ثانیه` و `مدت انتقال` `2 ثانیه` باشد، انیمیشن 1 ثانیه پس از تغییر ویژگی شروع می‌شود و مدت زمان کل 2 ثانیه خواهد بود.

مقادیر منفی نیز ممکن است. سپس انیمیشن بلافاصله نشان داده می شود، اما نقطه شروع انیمیشن پس از مقدار داده شده (زمان) خواهد بود. به عنوان مثال، اگر `تاخیر انتقال` `-۱ ثانیه` و `مدت انتقال` `۲ ثانیه` باشد، انیمیشن از نیمه شروع می‌شود و مدت زمان کل ۱ ثانیه خواهد بود.

در اینجا انیمیشن با استفاده از ویژگی `translate` CSS اعداد را از `0` به `9` تغییر می‌دهد:

[codetabs src="digits"]

ویژگی `transform` به شکل زیر متحرک است:
```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

در مثال بالا جاوا اسکریپت کلاس `.animate` را به عنصر اضافه می کند -- و انیمیشن شروع می شود:

```js
stripe.classList.add('animate');
```

ما همچنین می‌توانیم آن را از جایی در میانه انتقال، از یک عدد دقیق شروع کنیم، به عنوان مثال. متناظر با ثانیه فعلی، با استفاده از `transition-delay` منفی.

در اینجا اگر روی رقم کلیک کنید -- انیمیشن را از ثانیه فعلی شروع می کند:
[codetabs src="digits-negative-delay"]

جاوا اسکریپت این کار را با یک خط اضافی انجام می دهد:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // for instance, -3s here starts the animation from the 3rd second
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## تابع انتقال-زمان

تابع زمان بندی نحوه توزیع فرآیند انیمیشن در طول جدول زمانی آن را توصیف می کند. آیا به آرامی شروع می شود و سپس سریع می رود یا برعکس.

به نظر می رسد در ابتدا پیچیده ترین ویژگی باشد. اما اگر کمی زمان را به آن اختصاص دهیم بسیار ساده می شود.

این ویژگی دو نوع مقدار را می پذیرد: منحنی Bezier یا مراحل. بیایید با منحنی شروع کنیم، زیرا بیشتر استفاده می شود.

### Bezier منحنی

تابع زمان بندی را می توان به عنوان یک [منحنی Bezier](/bezier-curve) با 4 نقطه کنترل که شرایط را برآورده می کند تنظیم کرد:
1. اولین نقطه کنترل: `(0,0)`.
2. آخرین نقطه کنترل: `(1,1)`.
3. برای نقاط میانی، مقادیر `x` باید در بازه `0..1` باشد، `y` می تواند هر چیزی باشد.

نحو برای منحنی Bezier در `CSS: cubic-bezier(x2، y2، x3، y3)`. در اینجا باید فقط نقاط کنترل 2 و 3 را مشخص کنیم، زیرا اولین نقطه روی `(0,0)` ثابت شده است و نقطه چهارم `(1،1)` است.

تابع زمان بندی سرعت فرآیند انیمیشن را توصیف می کند.

- محور `x` زمان است: `0` -- شروع، `1` -- پایان `transition-duration`.
- محور `y` تکمیل فرآیند را مشخص می کند: `0` -- مقدار شروع ویژگی، `1` -- مقدار نهایی.

ساده ترین حالت زمانی است که انیمیشن به طور یکنواخت و با همان سرعت خطی پیش می رود. این را می توان با منحنی `cubic-bezier(0، 0، 1، 1)` مشخص کرد.

در اینجا این منحنی به نظر می رسد:

![](bezier-linear.svg)

... همانطور که می بینیم، فقط یک خط مستقیم است. با گذشت زمان (`x`)، تکمیل (`y`) انیمیشن به طور پیوسته از 0 به 1 می رود.

قطار در مثال زیر از چپ به راست با سرعت دائمی حرکت می کند (روی آن کلیک کنید):
[codetabs src="train-linear"]

`انتقال` CSS بر اساس آن منحنی است:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* click on a train sets left to 450px, thus triggering the animation */
}
```

... و چگونه می توانیم قطاری را در حال کاهش سرعت نشان دهیم؟

می‌توانیم از منحنی دیگر Bezier استفاده کنیم: `cubic-bezier(0.0، 0.5، 0.5، 1.0)`.

نمودار:

![](train-curve.svg)

همانطور که می بینیم، این روند سریع شروع می شود: منحنی به اوج می رسد و سپس کندتر و کندتر می شود.

در اینجا تابع زمان بندی در عمل آمده است (روی train کلیک کنید):
[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* click on a train sets left to 450px, thus triggering the animation */
}
```

  چندین منحنی داخلی وجود دارد: `linear`, `ease`, `ease-in`, `ease-out` و `ease-in-out`.
.

`linear` مخفف `cubic-bezier(0، 0، 1، 1)` است - یک خط مستقیم، که در بالا توضیح دادیم.

نام‌های دیگر مخفف عبارت `cubic-bezier` زیر هستند:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- به‌طور پیش‌فرض، اگر تابع زمان‌بندی وجود نداشته باشد، `ease` استفاده می‌شود.

بنابراین می‌توانیم از `ease-out` برای کاهش سرعت قطار خود استفاده کنیم:

```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

اما کمی متفاوت به نظر می رسد.

**یک منحنی Bezier می تواند باعث شود که انیمیشن از محدوده خود فراتر رود.**

نقاط کنترل روی منحنی می توانند هر مختصات `y` داشته باشند: حتی منفی یا بزرگ. سپس منحنی Bezier نیز بسیار کم یا زیاد می شود و باعث می شود انیمیشن از محدوده طبیعی خود فراتر رود.

در مثال زیر کد انیمیشن به شرح زیر است:

```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* click on a train sets left to 450px */
}
```

ویژگی "چپ" باید از `100px` تا `400px` متحرک شود.

اما اگر روی قطار کلیک کنید، خواهید دید که:

- ابتدا، قطار *به عقب* می رود: «چپ» کمتر از `100px` می شود.
- سپس به جلو می رود، کمی دورتر از `400px`.
- و سپس دوباره -- به `400px`.
[codetabs src="train-over"]

اگر به نمودار منحنی Bezier داده شده نگاه کنیم، چرا این اتفاق می افتد کاملاً واضح است:

![](bezier-train-over.svg)

  مختصات `y` نقطه دوم را به زیر صفر رساندیم و برای نقطه سوم آن را روی `1` قرار دادیم، بنابراین منحنی از ربع `منظم` خارج می‌شود. `y` خارج از محدوده `استاندارد` `0..1` است.

همانطور که می دانیم، `y` "تکمیل فرآیند انیمیشن" را اندازه گیری می کند. مقدار "y = 0" مربوط به مقدار ویژگی شروع و `y = 1` - مقدار پایانی است. بنابراین مقادیر `y<0` ویژگی را فراتر از `چپ` شروع و `y>1` - از `چپ` نهایی عبور می‌کند.

مطمئناً این یک نوع "نرم" است. اگر مقادیر `y` مانند `-99` و «99» را قرار دهیم، قطار بسیار بیشتر از محدوده خارج خواهد شد.

اما چگونه یک منحنی Bezier برای یک کار خاص بسازیم؟ ابزارهای زیادی وجود دارد.

- به عنوان مثال، ما می توانیم این کار را در سایت <https://cubic-bezier.com> انجام دهیم.
- ابزارهای توسعه دهنده مرورگر همچنین از منحنی های Bezier در CSS پشتیبانی می کنند:
     1. ابزارهای توسعه دهنده را با `key:F12` باز کنید (`Mac: key:Cmd+Opt+I`).
     2. برگه `Elements` را انتخاب کنید، سپس به پنل فرعی `Styles` در سمت راست توجه کنید.
     3. ویژگی های CSS با کلمه `cubic-bezier` یک نماد قبل از این کلمه خواهد داشت.
     4. برای ویرایش منحنی روی این نماد کلیک کنید.


### مراحل

The timing function `steps(number of steps[, start/end])` allows splitting an transition into multiple steps.

Let's see that in an example with digits.

Here's a list of digits, without any animations, just as a source:

[codetabs src="step-list"]

In the HTML, a stripe of digits is enclosed into a fixed-length `<div id="digits">`:

```html
<div id="digit">
  <div id="stripe">0123456789</div>
</div>
```

The `#digit` div has a fixed width and a border, so it looks like a red window.

We'll make a timer: the digits will appear one by one, in a discrete way.

To achieve that, we'll hide the `#stripe` outside of `#digit` using `overflow: hidden`, and then shift the `#stripe` to the left step-by-step.

There will be 9 steps, a step-move for each digit:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

The first argument of `steps(9, start)` is the number of steps. The transform will be split into 9 parts (10% each). The time interval is automatically divided into 9 parts as well, so `transition: 9s` gives us 9 seconds for the whole animation – 1 second per digit.

The second argument is one of two words: `start` or `end`.

The `start` means that in the beginning of animation we need to make the first step immediately.

In action:

[codetabs src="step"]

A click on the digit changes it to `1` (the first step) immediately, and then changes in the beginning of the next second.

The process is progressing like this:

- `0s` -- `-10%` (first change in the beginning of the 1st second, immediately)
- `1s` -- `-20%`
- ...
- `8s` -- `-90%`
- (the last second shows the final value).

Here, the first change was immediate because of `start` in the `steps`.

The alternative value `end` would mean that the change should be applied not in the beginning, but at the end of each second.

So the process for `steps(9, end)` would go like this:

- `0s` -- `0` (during the first second nothing changes)
- `1s` -- `-10%` (first change at the end of the 1st second)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Here's `steps(9, end)` in action (note the pause before the first digit change):

[codetabs src="step-end"]

There are also some pre-defined shorthands for `steps(...)`:

- `step-start` -- is the same as `steps(1, start)`. That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
- `step-end` -- the same as `steps(1, end)`: make the animation in a single step at the end of `transition-duration`.

These values are rarely used, as they represent not a real animation, but rather a single-step change. We mention them here for completeness.

## Event: "transitionend"

When the CSS animation finishes, the `transitionend` event triggers.

It is widely used to do an action after the animation is done. Also we can join animations.

For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

The event object for `transitionend` has a few specific properties:

`event.propertyName`
: The property that has finished animating. Can be good if we animate multiple properties simultaneously.

`event.elapsedTime`
: The time (in seconds) that the animation took, without `transition-delay`.

## Keyframes

We can join multiple simple animations together using the `@keyframes` CSS rule.

It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.

Here's an example with explanations:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* give it a name: "go-left-right" */
    from { left: 0px; }             /* animate from left: 0px */
    to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* apply the animation "go-left-right" to the element
       duration 3 seconds
       number of times: infinite
       alternate direction every time
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

There are many articles about `@keyframes` and a [detailed specification](https://drafts.csswg.org/css-animations/).

You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.

## Performance

Most CSS properties can be animated, because most of them are numeric values. For instance, `width`, `color`, `font-size` are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

However, not all animations will look as smooth as you'd like, because different CSS properties cost differently to change.

In more technical details, when there's a style change, the browser goes through 3 steps to render the new look:

1. **Layout**: re-compute the geometry and position of each element, then
2. **Paint**: re-compute how everything should look like at their places, including background, colors,
3. **Composite**: render the final results into pixels on screen, apply CSS transforms if they exist.

During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as `color`, may skip the Layout step. If a `color` changes, the browser  doesn't calculate any new geometry, it goes to Paint -> Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at <https://csstriggers.com>.

The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to "jittery", less fluid animations.

Animations of properties that skip the Layout step are faster. It's even better if Paint is skipped too.

The `transform` property is a great choice, because:
- CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
- CSS transforms never affect neighbour elements.

...So browsers apply `transform` "on top" of existing Layout and Paint calculations, in the Composite stage.

In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies `transform` to element boxes that need it.

Changes (animations) of the `transform` property never trigger Layout and Paint steps. More than that, the browser  leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very efficient.

Luckily, the `transform` property is very powerful. By using `transform` on an element, you could rotate and flip it, stretch and shrink it, move it around, and [much more](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). So instead of `left/margin-left` properties we can use `transform: translateX(…)`, use `transform: scale` for increasing element size, etc.

The `opacity` property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

Paring `transform` with `opacity` can usually solve most of our needs, providing fluid, good-looking animations.

For example, here clicking on the `#boat` element adds the class with `transform: translateX(300)` and `opacity: 0`, thus making it move `300px` to the right and disappear:

```html run height=260 autorun no-beautify
<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>
```

Here's a more complex example, with `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>
```

## Summary

CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

They are good for most animation tasks. We're also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.

But in the next chapter we'll do some JavaScript animations to cover more complex cases.
