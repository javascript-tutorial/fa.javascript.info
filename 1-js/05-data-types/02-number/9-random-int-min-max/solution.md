# جواب ساده اما اشتباه

جواب اشتباه اما ساده این است که مقداری از `min` تا `max` رو تولید کنیم و رندش کنیم: 

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

این تابع کار میکند اما غلط است. احتمال اینکه مقادیر لبه `min` و `max` را در نتیجه بگیریم، نصف بقیه‌ست.

اگر شما مثال بالا را به کرات اجرا کنید، میبینید که عدد ۲ اکثر اوقات ظاهر می‌شود.

به این علت است که `Math.round()` اعداد تصادفی از بازه `1..3` را میگیرد و به شکل زیر رند می‌کند.

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

حالا میتوانیم به وضوح ببینیم که عدد ۲، دو برابر عدد یک مقادیر به آن نسبت داده میشود. همینطور هم برای عدد ۳. 
# راه حل صحیح

راه حال‌های صحیح زیادی وجود دارد. یکی از آنها تنظیم نقاط مرزی‌ست. برای اطمینان یافتن از ازینکه بازه‌ها برابرند میتوانیم مقادیر را از `0.5 تا 3.5` تولید کنیم، سپس احتمال لازم صحیح را به حالات لبه نسبت دهیم:

```js run
*!*
function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

راه دیگر میتواند استفاده از `Math.floor` باشد برای یک عدد تصادفی از `min` تا `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

حال، تمام بازه ها بدین شکل می‌شوند:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

همه ی بازه‌ها الان طول یکسانی دارند و در نهایت توزیع یکسانی دارند.
