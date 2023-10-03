# JavaScript انیمیشن های

انیمیشن‌های جاوا اسکریپت می‌توانند چیزهایی را که CSS قادر به انجام آن نیست، مدیریت کنند.

به عنوان مثال، حرکت در امتداد یک مسیر پیچیده، با یک تابع زمان بندی متفاوت از منحنی های Bezier، یا یک انیمیشن روی بوم.

## بکار بردن setInterval

یک انیمیشن را می توان به عنوان دنباله ای از فریم ها پیاده سازی کرد - معمولاً تغییرات کوچکی در ویژگی های HTML/CSS.

برای مثال، تغییر «style.left» از `0px` به `100px` عنصر را جابه‌جا می‌کند. و اگر آن را در `setInterval` افزایش دهیم، با یک تاخیر کوچک، مانند 50 بار در ثانیه، `2px` تغییر کند، آنگاه صاف به نظر می رسد. این همان اصل در سینما است: 24 فریم یا بیشتر در ثانیه برای صاف به نظر رسیدن کافی است.

شبه کد می تواند به شکل زیر باشد:

```js
let timer = setInterval(function() {
  if (animation complete) clearInterval(timer);
  else increase style.left by 2px
}, 20); // change by 2px every 20ms, about 50 frames per second
```

نمونه کاملتر انیمیشن:

```js
let start = Date.now(); // remember start time

let timer = setInterval(function() {
  // how much time passed from the start?
  let timePassed = Date.now() - start;

  if (timePassed >= 2000) {
    clearInterval(timer); // finish the animation after 2 seconds
    return;
  }

  // draw the animation at the moment timePassed
  draw(timePassed);

}, 20);

// as timePassed goes from 0 to 2000
// left gets values from 0px to 400px
function draw(timePassed) {
  train.style.left = timePassed / 5 + 'px';
}
```

برای دمو کلیک کنید:

[codetabs height=200 src="move"]

## بکار بردن requestAnimationFrame

بیایید تصور کنیم چندین انیمیشن به طور همزمان اجرا می شوند.

اگر آن‌ها را جداگانه اجرا کنیم، حتی اگر هر کدام دارای `setInterval(...، 20)` باشند، مرورگر باید بیشتر از هر `20 میلی‌ثانیه` دوباره رنگ‌آمیزی کند.

این به این دلیل است که آنها زمان شروع متفاوتی دارند، بنابراین "هر 20 میلی ثانیه" بین انیمیشن های مختلف متفاوت است. فواصل هم تراز نیستند. بنابراین ما چندین اجرا مستقل در عرض `20 میلی ثانیه` خواهیم داشت.

به عبارت دیگر، این:


```js
setInterval(function() {
  animate1();
  animate2();
  animate3();
}, 20)
```

... سبکتر از سه تماس مستقل است:

```js
setInterval(animate1, 20); // independent animations
setInterval(animate2, 20); // in different places of the script
setInterval(animate3, 20);
```

این چندین تصویر مجدد مستقل باید با هم گروه بندی شوند تا ترسیم مجدد برای مرورگر آسان تر شود و در نتیجه بار CPU کمتری بارگیری شود و روان تر به نظر برسد.

یک چیز دیگر را باید در نظر داشت. گاهی اوقات CPU بیش از حد بارگیری می شود، یا دلایل دیگری برای ترسیم مجدد کمتر وجود دارد (مانند زمانی که برگه مرورگر پنهان است)، بنابراین ما واقعاً نباید آن را هر 20 میلی ثانیه اجرا کنیم.

اما چگونه در مورد آن در جاوا اسکریپت بدانیم؟ یک مشخصات [Animation timeing](https://www.w3.org/TR/animation-timing/) وجود دارد که تابع "requestAnimationFrame" را ارائه می دهد. به همه این مسائل و حتی بیشتر می پردازد.

نحو:
```js
let requestId = requestAnimationFrame(callback)
```

زمانی که مرورگر می‌خواهد انیمیشن انجام دهد، عملکرد `callback` را برنامه‌ریزی می‌کند تا در نزدیک‌ترین زمان اجرا شود.

اگر تغییراتی را در عناصر در `بازگشت به تماس` انجام دهیم، آن‌ها با دیگر تماس‌های `requestAnimationFrame` و با انیمیشن‌های CSS گروه‌بندی می‌شوند. بنابراین یک محاسبه مجدد هندسی و رنگ آمیزی مجدد به جای تعداد زیادی وجود خواهد داشت.

مقدار بازگشتی درخواست Id می تواند برای لغو تماس استفاده شود:
```js
// cancel the scheduled execution of callback
cancelAnimationFrame(requestId);
```

`بازگشت به تماس` یک آرگومان دریافت می کند -- زمان سپری شده از آغاز بارگیری صفحه بر حسب میلی ثانیه. این زمان را نیز می توان از طریق تماس دریافت کرد[performance.now()](mdn:api/Performance/now).

معمولاً `callback` خیلی زود اجرا می‌شود، مگر اینکه CPU بیش از حد بارگیری شده باشد یا باتری لپ‌تاپ تقریباً خالی شده باشد یا دلیل دیگری وجود داشته باشد.

کد زیر زمان بین 10 اجرای اول درخواست AnimationFrame را نشان می دهد. معمولاً 10-20 میلی ثانیه است:

```html run height=40 refresh
<script>
  let prev = performance.now();
  let times = 0;

  requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;

    if (times++ < 10) requestAnimationFrame(measure);
  })
</script>
```

## انیمیشن ساخت یافته

اکنون می‌توانیم یک تابع انیمیشن جهانی‌تر بر اساس `requestAnimationFrame` ایجاد کنیم:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction)

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

Function `animate` accepts 3 parameters that essentially describes the animation:

`duration`
: Total time of animation. Like, `1000`.

`timing(timeFraction)`
: Timing function, like CSS-property `transition-timing-function` that gets the fraction of time that passed (`0` at start, `1` at the end) and returns the animation completion (like `y` on the Bezier curve).

    For instance, a linear function means that the animation goes on uniformly with the same speed:

    ```js
    function linear(timeFraction) {
      return timeFraction;
    }
    ```

    Its graph:
    ![](linear.svg)

    That's just like `transition-timing-function: linear`. There are more interesting variants shown below.

`draw(progress)`
: The function that takes the animation completion state and draws it. The value `progress=0` denotes the beginning animation state, and `progress=1` -- the end state.

    This is that function that actually draws out the animation.

    It can move the element:
    ```js
    function draw(progress) {
      train.style.left = progress + 'px';
    }
    ```

    ...Or do anything else, we can animate anything, in any way.


Let's animate the element `width` from `0` to `100%` using our function.

Click on the element for the demo:

[codetabs height=60 src="width"]

The code for it:

```js
animate({
  duration: 1000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    elem.style.width = progress * 100 + '%';
  }
});
```

Unlike CSS animation, we can make any timing function and any drawing function here. The timing function is not limited by Bezier curves. And `draw` can go beyond properties, create new elements for like fireworks animation or something.

## Timing functions

We saw the simplest, linear timing function above.

Let's see more of them. We'll try movement animations with different timing functions to see how they work.

### Power of n

If we want to speed up the animation, we can use `progress` in the power `n`.

For instance, a parabolic curve:

```js
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
```

The graph:

![](quad.svg)

See in action (click to activate):

[iframe height=40 src="quad" link]

...Or the cubic curve or even greater `n`. Increasing the power makes it speed up faster.

Here's the graph for `progress` in the power `5`:

![](quint.svg)

In action:

[iframe height=40 src="quint" link]

### The arc

Function:

```js
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
```

The graph:

![](circ.svg)

[iframe height=40 src="circ" link]

### Back: bow shooting

This function does the "bow shooting". First we "pull the bowstring", and then "shoot".

Unlike previous functions, it depends on an additional parameter `x`, the "elasticity coefficient". The distance of "bowstring pulling" is defined by it.

The code:

```js
function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
```

**The graph for `x = 1.5`:**

![](back.svg)

For animation we use it with a specific value of `x`. Example for `x = 1.5`:

[iframe height=40 src="back" link]

### Bounce

Imagine we are dropping a ball. It falls down, then bounces back a few times and stops.

The `bounce` function does the same, but in the reverse order: "bouncing" starts immediately. It uses few special coefficients for that:

```js
function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}
```

In action:

[iframe height=40 src="bounce" link]

### Elastic animation

One more "elastic" function that accepts an additional parameter `x` for the "initial range".

```js
function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
```

**The graph for `x=1.5`:**
![](elastic.svg)

In action for `x=1.5`:

[iframe height=40 src="elastic" link]

## Reversal: ease*

So we have a collection of timing functions. Their direct application is called "easeIn".

Sometimes we need to show the animation in the reverse order. That's done with the "easeOut" transform.

### easeOut

In the "easeOut" mode the `timing` function is put into a wrapper `timingEaseOut`:

```js
timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)
```

In other words, we have a "transform" function `makeEaseOut` that takes a "regular" timing function and returns the wrapper around it:

```js
// accepts a timing function, returns the transformed variant
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
```

For instance, we can take the `bounce` function described above and apply it:

```js
let bounceEaseOut = makeEaseOut(bounce);
```

Then the bounce will be not in the beginning, but at the end of the animation. Looks even better:

[codetabs src="bounce-easeout"]

Here we can see how the transform changes the behavior of the function:

![](bounce-inout.svg)

If there's an animation effect in the beginning, like bouncing -- it will be shown at the end.

In the graph above the <span style="color:#EE6B47">regular bounce</span> has the red color, and the <span style="color:#62C0DC">easeOut bounce</span> is blue.

- Regular bounce -- the object bounces at the bottom, then at the end sharply jumps to the top.
- After `easeOut` -- it first jumps to the top, then bounces there.

### easeInOut

We also can show the effect both in the beginning and the end of the animation. The transform is called "easeInOut".

Given the timing function, we calculate the animation state like this:

```js
if (timeFraction <= 0.5) { // first half of the animation
  return timing(2 * timeFraction) / 2;
} else { // second half of the animation
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
```

The wrapper code:

```js
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(bounce);
```

In action, `bounceEaseInOut`:

[codetabs src="bounce-easeinout"]

The "easeInOut" transform joins two graphs into one: `easeIn` (regular) for the first half of the animation and `easeOut` (reversed) -- for the second part.

The effect is clearly seen if we compare the graphs of `easeIn`, `easeOut` and `easeInOut` of the `circ` timing function:

![](circ-ease.svg)

- <span style="color:#EE6B47">Red</span> is the regular variant of `circ` (`easeIn`).
- <span style="color:#8DB173">Green</span> -- `easeOut`.
- <span style="color:#62C0DC">Blue</span> -- `easeInOut`.

As we can see, the graph of the first half of the animation is the scaled down `easeIn`, and the second half is the scaled down `easeOut`. As a result, the animation starts and finishes with the same effect.

## More interesting "draw"

Instead of moving the element we can do something else. All we need is to write the proper `draw`.

Here's the animated "bouncing" text typing:

[codetabs src="text"]

## Summary

For animations that CSS can't handle well, or those that need tight control, JavaScript can help. JavaScript animations should be implemented via `requestAnimationFrame`. That built-in method allows to setup a callback function to run when the browser will be preparing a repaint. Usually that's very soon, but the exact time depends on the browser.

When a page is in the background, there are no repaints at all, so the callback won't run: the animation will be suspended and won't consume resources. That's great.

Here's the helper `animate` function to setup most animations:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

Options:

- `duration` -- the total animation time in ms.
- `timing` -- the function to calculate animation progress. Gets a time fraction from 0 to 1, returns the animation progress, usually from 0 to 1.
- `draw` -- the function to draw the animation.

Surely we could improve it, add more bells and whistles, but JavaScript animations are not applied on a daily basis. They are used to do something interesting and non-standard. So you'd want to add the features that you need when you need them.

JavaScript animations can use any timing function. We covered a lot of examples and transformations to make them even more versatile. Unlike CSS, we are not limited to Bezier curves here.

The same is about `draw`: we can animate anything, not just CSS properties.
