importance: 5

---

# مقداردهی تجزیه‌کننده‌ی ساختار

ما یک شیء داریم:

```js
let user = {
  name: "John",
  years: 30
};
```

مقداردهی تجزیه‌کننده‌ی ساختاری بنویسید که این‌ها را بخواند:

- ویژگی `name` درون متغیر `name`.
- ویژگی `years` درون متغیر `age`.
- ویژگی `isAdmin` درون متغیر `isAdmin` (اگر این ویژگی ناموجود بود، مقدار false باشد)

یک مثال برای مقدارها بعد از مقداردهی شما:

```js
let user = { name: "John", years: 30 };

// :کد شما در سمت چپ
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
