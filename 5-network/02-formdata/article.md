
# FormData

این فصل در مورد ارسال فرم‌های HTML است، با یا بدون فایل، با فیلدهای اضافی و غیره.

شیء [FormData](https://xhr.spec.whatwg.org/#interface-formdata) میتواند به شما در این زمینه کمک کنند. همانطور که ممکن است حدس زده باشید، این شیء برای نمایش دادن داده‌های فرم HTML استفاده میشود.

constructor به صورت زیر است:
```js
let formData = new FormData([form]);
```

اگر عنصر `فرم` HTML وجود داشته باشد به طور خودکار فیلدهای آن را گرفته و ذخیره می‌کند.

 ویژگی مهم اینکه از `FormData` متدهای شبکه مانند `fetch` می‌توانند یک شیء `FormData` را در بدنه (body) درخواست قبول کنند. این داده‌ها با هدر  `Content-Type: multipart/form-data` رمزگذاری شده و ارسال میشوند.
 
.از نظر سرور، این مانند  ارسال فرم معمولی به نظر میرسد

##  ارسال یک فرم ساده

بیایید ابتدا یک فرم ساده را بفرستیم.

همانطور که مشاهده می‌کنید، این تقریباً یک خط کد است:

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

در این مثال، کد سرور نمایش داده نشده است، چرا که خارج از بحث ما است. سرور درخواست POST را قبول کرده و با پاسخ "کاربر ذخیره شد" پاسخ میدهد.

## متدهای FormData

ما می‌توانیم با استفاده از متدهای `FormData` فیلدها را تغییر دهیم:

- `formData.append(name, value)` - اضافه کردن یک فیلد به فرم با `name` و `value` داده شده
- `formData.append(name, blob, fileName)` -  اضافه کردن یک فیلد به عنوان  `<input type="file">` آرگومان سوم `fileName` نام فایل را تنظیم میکند (نه نام فیلد فرم)، به عنوان نام فایل در سیستم کاربر
- `formData.delete(name)` - حذف فیلد با `name` داده شده
- `formData.get(name)` - دریافت مقدار فیلد با `name` داده شده
- `formData.has(name)` -   اگر یک فیلد با `name` داده شده وجود داشته باشد `true` و در غیر اینصورت `false` را برمی‌گرداند.

یک فرم به طور فنی اجازه دارد که فیلدهای زیادی با همان `name` داشته باشد بنابراین فراخوانی‌های چندگانه به `append` منجر به افزودن فیلدهایی با همان نام میشود.

همچنین یک متد `set` وجود دارد با همان سینتکسی که `append` دارد. تفاوت این است که `set.` تمامی فیلدهایی که `name`داده شده را دارا میباشند را حذف کرده و سپس یک فیلد جدید با همان نام اضافه می‌کند. بنابراین، این گونه مطمئن می‌شود که تنها یک فیلد با این `name` وجود دارد بقیه همانند `append` هستند:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

همچنین می‌توانیم با استفاده از حلقه `for..of` روی فیلدهای formData حلقه بزنیم:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// List key/value pairs
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
}
```

## ارسال فرم به همراه یک فایل:

فرم همواره به عنوان `Content-Type: multipart/form-data` ارسال میشود. این رمزگذاری امکان ارسال فایل‌ها را فراهم میکند. بنابراین، فیلدهای `<input type="file">` نیز مشابه یک فرم ارسال میشوند.

مثال با چنین فرمی به صورت زیر است:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## ارسال یک فرم با داده Blob

همانطور که در فصل <info:fetch> دیدیم، ارسال داده‌های دودویی به صورت پویا مانند یک تصویر به عنوان `Blob` آسان است. میتوانیم آن را به عنوان پارامتر `body` مستقیماً با `fetch` ارسال کنیم.

در عمل اغلب مناسبتر است که تصویر را به صورت جداگانه نفرستیم بلکه به عنوان یک قسمت از فرم با فیلدهای اضافی مانند "نام" و دیگر فراداده‌ها بفرستیم.

همچنین، سرورها معمولاً برای پذیرش فرم‌های رمزگذاری چند قسمتی (multipart-encoded) مناسب‌تر از داده دودویی خام هستند.

یک مثال از ارسال تصویر`<canvas>` به همراه باقی فیلد ها در قالب یک فرم با استفاده از `FormData`:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

به نحوه اضافه شدن `Blob` توجه کنید:

```js
formData.append("image", imageBlob, "image.png");
```

این همانند این است که در فرم `<input type="file" name="image">` وجود داشته باشد و بازدیدکننده یک فایل به نام `"image.png"` (آرگومان سوم) را با داده `imageBlob` (آرگومان دوم) از سیستم خود ارسال کند.

سرور داده‌های فرم و فایل را می‌خواند انگار که یک ارسال فرم معمولی انجام شده است.

## خلاصه

شی های [FormData](https://xhr.spec.whatwg.org/#interface-formdata) برای گرفتن فرم HTML و ارسال آن با استفاده از `fetch` یا یک متد های دیگر شبکه استفاده می‌شوند.

ما می‌توانیم یا یک `new FormData(form)` جدید از یک فرم HTML ایجاد کنیم، یا یک شیء بدون فرم ایجاد کنیم و سپس با استفاده از متدها فیلدها را اضافه کنیم:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

به دو نکته ویژه در اینجا توجه کنید:

1.  متد `set` فیلدهای با همان نام را حذف می‌کند، اما `append` اینکار را نمیکند. این تنها تفاوت بین آنهاست.
2. برای ارسال یک فایل، نیاز به سینتکس با 3 آرگومان است، آخرین آرگومان نام فایل است که به طور معمول از فایل سیستم کاربر برای `<input type="file">` گرفته میشود.

متدهای دیگر:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

کل داستان همین بود!
