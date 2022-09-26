importance : 4

---

# ثابت با حروف بزرگ?

کد زیر را آزمایش کنید :

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
ما در اینجا یک ثابت با نام `birthday` داریم و ثابتی دیگر با نام `age` که با کمک کدهای دیگر از `birthday` محاسبه می‌شود (برای کوتاه شدن ارائه نشده‌است، و همچنین به دلیل اینکه جزییات اینجا اهمیت ندارند).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

آیا نوشتن `birthday` با حروف بزرگ درست است؟ برای `age` چطور؟

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // با حروف بزرگ؟

const AGE = someCode(BIRTHDAY); // با حروف بزرگ؟
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4
```
