این تست، نمونه ای از وسوسه‌هایی را که یک توسعه دهنده(برنامه نویس) هنگام نوشتن تست‌ ها با آن رو به رو می‌شود را نشان می دهد.

آنچه که در اینجا داریم در واقع 3 تست است، اما به عنوان یک تابع با 3 assert نوشته شده است.

بعضی وقت ها نوشتن به این مدل ساده تر است، اما اگر خطایی رخ بدهد، خیلی کمتر مشخص میشود که مشکل از کجاست.

اگر خطایی در وسط اجرای یک جریان پیچیده رخ بدهد، در این مرحله باید داده ها را کشف کنیم. ما در واقع باید *تست را دیباگ(اشکال زدایی) کنیم*.

خیلی بهتر میشود که تست را به چندین بلوک `it` با ورودی ها و خروجی های کامل نوشته شده تقسیم کنیم.

به طور مثال:
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

ما یک `it` را با `describe` و گروهی از بلوک‌های `it` جایگزین میکنیم. حالا اگر مشکلی پیش بیاید، به وضوح می‌بینیم که داده‌ها چه بوده‌اند.

همچنین می‌توانیم با نوشتن `it.only` به جای `it`، یک تست را جدا کرده و آن را در حالت مستقل(به تنهایی) اجرا کنیم:


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha will run only this block
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
