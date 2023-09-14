# حمله‌ی کلیک جک

حمله‌ی "clickjacking" به یک صفحه‌ی شیطانی اجازه می‌دهد تا روی "سایت قربانی" *از طرف بازدیدکننده* کلیک کند.

تعداد زیادی از سایت‌ها با این راه هک می‌شوند، شامل Twitter، Facebook، Paypal و سایت‌های دیگر. البته همه‌ی آن‌ها درست شده‌اند.

## ایده

ایده بسیار ساده است.

اینجا می‌گوییم که clickjacking چگونه با Facebook انجام شد:

1. یک بازدیدکننده به صفحه‌ی شیطانی اغوا می‌شود. مهم نیست چگونه.
2. این صفحه درون خود یک لینک به ظاهر غیرآسیب‌زننده دارد (مثال "الان ثروتمند شوید" یا "اینجا کلیک کنید،‌ بسیار بامزه است").
3. روی آن لینک، آن صفحه‌ی شیطانی یک `<iframe>` شفاف با `src` از facebook.com قرار می‌دهد، به طوری که دکمه‌ی "پسندیدن" درست بالای لینک است. معمولا این کار با `z-index` انجام می‌شود.
4. در تلاش برای کلیک کردن لینک، بازدیدکننده در واقع روی دکمه کلیک می‌کند.

## نسخه‌ی نمایشی

اینجا می‌بینیم که صفحه‌ی شیطانی چگونه به نظر می‌رسد. برای واضح شدن همه چیز، `<iframe>` نیمه‌شفاف است (در صفحات شیطانی واقعی، کاملا شفاف است):

```html run height=120 no-beautify
<style>
iframe { /* از سایت قربانی iframe */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* opacity:0 در واقع */
*/!*
  z-index: 1;
}
</style>

<div>کلیک کنید تا الان ثروتمند شوید:</div>

<!-- لینک سایت قربانی -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>!اینجا کلیک کنید</button>
*/!*

<div>!و شما باحال هستید(در واقع من یک هکر باحال هستم)...</div>
```

نسخه‌ی نمایشی کامل این حمله:

[codetabs src="clickjacking-visible" height=160]

اینجا ما یک `<iframe src="facebook.html">` نیمه‌شفاف داریم، و در مثال می‌توانیم ببینیم که روی دکمه شناور است. یک کلیک روی دکمه در واقع روی  iframe کلیک می‌کند، اما این برای کاربر قابل دیدن نیست، چون iframe شفاف است.

در نتیجه،‌اگر بازدیدکننده در Facebook مجاز باشد (معمولا "مرا به خاطر بسپار" روشن است)، آنگاه یک "پسندیدم" اضافه می‌کند. در Twitter، این یک دکمه‌ی "دنبال کردن" خواهد بود.

اینجا مثال نمونه را داریم، اما نزدیک‌تر به واقعیت، با `opacity:0` برای `<iframe>`:

[codetabs src="clickjacking" height=160]

تمام چیزی که برای حمله نیاز داریم -- این است که `<iframe>` را در صفحه‌ی شیطانی به گونه‌ای قرار دهیم که دکمه درست روی لینک باشد. بنابراین، وقتی یک کاربر روی لینک کلیک می‌کند، در واقع روی دکمه کلیک می‌کند. این معمولا با CSS قابل انجام است.

```smart header="Clickjacking برای کلیک‌ها است،‌ نه برای keyboard"
The attack only affects mouse actions (or similar, like taps on mobile).

Keyboard input is much difficult to redirect. Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input they see on the page, they actually focus on the input inside the iframe.

But then there's a problem. Everything that the visitor types will be hidden, because the iframe is not visible.

People will usually stop typing when they can't see their new characters printing on the screen.
```

## Old-school defences (weak)

The oldest defence is a bit of JavaScript which forbids opening the page in a frame (so-called "framebusting").

That looks like this:

```js
if (top != window) {
  top.location = window.location;
}
```

That is: if the window finds out that it's not on top, then it automatically makes itself the top.

This not a reliable defence, because there are many ways to hack around it. Let's cover a few.

### Blocking top-navigation

We can block the transition caused by changing `top.location` in  [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) event handler.

The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:

```js
window.onbeforeunload = function() {
  return false;
};
```

When the `iframe` tries to change `top.location`, the visitor gets a message asking them whether they want to leave.

In most cases the visitor would answer negatively because they don't know about the iframe - all they can see is the top page, there's no reason to leave. So `top.location` won't change!

In action:

[codetabs src="top-location"]

### Sandbox attribute

One of the things restricted by the `sandbox` attribute is navigation. A sandboxed iframe may not change `top.location`.

So we can add the iframe with `sandbox="allow-scripts allow-forms"`. That would relax the restrictions, permitting scripts and forms. But we omit `allow-top-navigation` so that changing `top.location` is forbidden.

Here's the code:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

There are other ways to work around that simple protection too.

## X-Frame-Options

The server-side header `X-Frame-Options` can permit or forbid displaying the page inside a frame.

It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML `<meta>` tag. So, `<meta http-equiv="X-Frame-Options"...>` won't do anything.

The header may have 3 values:


`DENY`
: Never ever show the page inside a frame.

`SAMEORIGIN`
: Allow inside a frame if the parent document comes from the same origin.

`ALLOW-FROM domain`
: Allow inside a frame if the parent document is from the given domain.

For instance, Twitter uses `X-Frame-Options: SAMEORIGIN`.

````online
Here's the result:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Depending on your browser, the `iframe` above is either empty or alerting you that the browser won't permit that page to be navigating in this way.
````

## Showing with disabled functionality

The `X-Frame-Options` header has a side effect. Other sites won't be able to show our page in a frame, even if they have good reasons to do so.

So there are other solutions... For instance, we can "cover" the page with a `<div>` with styles `height: 100%; width: 100%;`, so that it will intercept all clicks. That `<div>` is to be removed if `window == top` or if we figure out that we don't need the protection.

Something like this:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // there will be an error if top window is from the different origin
  // but that's ok here
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

The demo:

[codetabs src="protector"]

## Samesite cookie attribute

The `samesite` cookie attribute can also prevent clickjacking attacks.

A cookie with such attribute is only sent to a website if it's opened directly, not via a frame, or otherwise. More information in the chapter <info:cookie#samesite>.

If the site, such as Facebook, had `samesite` attribute on its authentication cookie, like this:

```
Set-Cookie: authorization=secret; samesite
```

...Then such cookie wouldn't be sent when Facebook is open in iframe from another site. So the attack would fail.

The `samesite` cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.

## Summary

Clickjacking is a way to "trick" users into clicking on a victim site without even knowing what's happening. That's dangerous if there are important click-activated actions.

A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

From one perspective -- the attack is "not deep": all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

The attack is quite dangerous, because when we engineer the UI we usually don't anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It is recommended to use `X-Frame-Options: SAMEORIGIN` on pages (or whole websites) which are not intended to be viewed inside frames.
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, but still stay safe.
