<!---
ترجمه تیتر اول از متن
-->
# درگ و دراپ با رویداد های موس 

گرفتن یک آیتم از صفحه وب و انداختن اون در جایی دیگر گاهی اوقات راه حلی واضح و ساده واسه انجام کارای خفنه که مثلا میتونه برای انداختن آیتم ها توی سبد خرید یا چینش ترتیب فایل ها توی فایل منیجر کاربردی باشه 

در استاندارد
html 
مدرن یک راهکاری به اسم
[section about Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) 
وجود داره که با 
event 
هایی مثل 
`dragstart`, `dragend`
و... کار میکنه 

این 
event 
ها به شما توانایی پیاده سازی نوع خاصی از سیستم درگ و دراپ رو میدن برای مثال درگ کردن فایل از فایل منیجر و انداختنش توی مرورگر دقیقا مثل همون سیستمی که کتابخانه های آپلودر کار میکنن 

ولی این 
Event 
های بومی جاوااسکریپت محدودیتم زیاد دارن مثلا ما نمی تونیم محدوده مشخصی برای درگ کردن بزاریم و یوزر میتونه از هرفایلی رو درگ کنه و روی مرورگر دراپ کنه یا نمی تونیم بگیم میتونه چند تا فایل رو هم زمان درگ و دراپ کنه و کلی محدودیت دیگه که حسابی دست و پامون رو میبنده تازه موبایل ها هم ازشون به درستی پشتیبانی نمی کنن و حسابی دردسر ساز میشن

پس حالا میخوایم بریم ببینیم چطوری خودمون با استفاده از 
mouse event 
ها سیستم درگ و دراپ خودمون رو بسازیم 

# الگوریتم درگ و دراپ

الگوریتم درگ و دراپ در مراحل اولیه اینطوری به نظر میرسه 

1. 
ابتدا از
`mousedown` 
استفاده می کنیم تا متوجه بشیم یوزر میخواد المنت رو حرکت بده 
2. 
سپس از 
`mousemove` 
برای پیدا کردن موقعیت موس استفاده میکنیم. تا بتونیم با 
`position:absolute` 
مقادیر 
`left/top` 
رو تغییر بدیم 
3. 
در نهایت از 
`mouseup` 
بهره می بریم تا بفهمیم کار تموم شده و المنت باید دراپ شه 

اما اینا که مقدماتن بعدا خواهیم دید چطور باید فیچر های جذاب دیگه ای بهش اضافه کرد مثلا المانی که داریم درگ و دراپ می کنیم رو هایلایت کنیم

حالا وقتشه مراحل پیاده سازی درگ و دراپ کردن یک توپ رو ببینیم

```js
ball.onmousedown = function(event) {
  // (1) prepare to moving: make absolute and on top by z-index
  // (1) آماده سازی واسه جابه جایی : absolute اش می کنیم و z-index اش رو زیاد میکنیم که بیاد لایه بالاتر
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // از هر والدی خارجش میکنیم و مستقیما در body قرار میدیمش 
  // to make it positioned relative to the body
  // تا مکان اش با body در تناسب باشه 
  document.body.append(ball);

  // centers the ball at (pageX, pageY) coordinates
  //  توپ رو میاریم وسط ورودی های (pageX, pageY)
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // (1) move our absolutely positioned ball under the pointer
  // (1) توپ مون رو زیر نشانگر موس میاریم
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the ball on mousemove
  // (2) با حرکت موس توپ مون هم حرکت میدیم
  document.addEventListener('mousemove', onMouseMove);

  // (3) drop the ball, remove unneeded handlers
  // (3) توپ رو دراپ می کنیم و اضافات رو پاک می کنیم 
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```
اگر ما این کد رو اجرا کنیم می فهمیم یک چیزی عجیب و غریبه اونم اینه توپ سر جاش میمونه و ما یک نسحه کپی شده از اون رو می کشیم 

```online
این مثالی از این موضوعه : 

[iframe src="ball" height=230]

سعی کنید درگ و دراپ کنید تا همچین رفتاری ببینید 
```

دلیلش اینه مرورگر خودش برای تصاویر و متن ها و دیگر المان ها از درگ و دراپ پشتیبانی می کنه. خودش خودکار اجرا میشه و البته با درگ و دراپ ای که ما نوشتیم تداخل داره. چون اونی برای خود مرورگره برای اجرا شدن اولویت داره 

برای غیرفعال کردنش :‌

```js
ball.ondragstart = function() {
  return false;
};
```

الان دیگه همه چیز درست پیش میره.

```online
[iframe src="ball2" height=230]
```