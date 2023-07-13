هسته راه‌حل تابعی است که تاریخ های بیشتر را  هنگامی که در انتهای صفحه هستیم به صفحه اضافه می‌کند (یا در واقعیت بارگذاری اجناس بیشتر).

ما می‌توانیم بلافاصله آن را call کنیم و به عنوان هندلر `window.onscroll` اضافه‌اش کنیم.

مهم‌ترین سوال این است که: "چگونه تشخیص دهیم که صفحه به پایین اسکرول شده است؟"

بیایید از مختصات مربوط به window استفاده کنیم.

داکیومنت در تگ `<html>` نمایش داده می‌شود که آن `document.documentElement` است.

ما می‌توانیم مختصات مروبط به window کل داکیومنت را به صورت `()document.documentElement.getBoundingClientRect` دریافت کنیم. پراپرتی `bottom`، مختصات مربوط به window document bottom خواهد بود.

برای مثال اگر ارتفاع کل داکیومنت `2000px` HTML است سپس:

```js
// when we're on the top of the page
// window-relative top = 0
document.documentElement.getBoundingClientRect().top = 0

// window-relative bottom = 2000
// the document is long, so that is probably far beyond the window bottom
document.documentElement.getBoundingClientRect().bottom = 2000
```

اگر ما `500px` به پایین اسکرول کنیم سپس:

```js
// document top is above the window 500px
document.documentElement.getBoundingClientRect().top = -500
// document bottom is 500px closer
document.documentElement.getBoundingClientRect().bottom = 1500
```

هنگامی که ما تا انها اسکرول می‌کنیم فرض می‌کنیم ارتفاع `600px` window است:

```js
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

لطفا توجه داشته باشید که `bottom` نمی‌تواند `0` باشد چون هیچوقت به بالای window نمی‌رسد. پایین‌ترین حد مختصات `bottom` ارتفاع window است (ما فرض کردیم `600` است)، ما نمی‌توانیم دیگر بیشتر اسکرول کنیم.

ما می‌توانیم ارتفاع window را به صورت `document.documentElement.clientHeight` به دست آوریم.

برای تمرین‌مان، ما باید بدانیم تا پایین داکیومنت چه زمانی بیشتر از `100px` فاصله دارد (آن: `600px-700px` است اگر ارتفاع `600` باشد)

پس این تابع است:

```js
function populate() {
  while(true) {
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // let's add more data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
