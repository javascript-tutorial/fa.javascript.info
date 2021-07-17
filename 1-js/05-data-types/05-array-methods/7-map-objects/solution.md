
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

لطفا در نظر داشته باشید که در تابع‌های کمانی ما باید از پرانتزهای اضافی استفاده کنیم.

نمی‌توانیم اینگونه بنویسیم:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

همانطور که به یاد داریم، دو نوع تابع کمانی وجود دارد: بدون بدنه `value => expr` و همراه با بدنه `value => {...}`.

اینجا جاوااسکریپت با `}` به عنوان آغاز بدنه تابع رفتار می‌کند نه آغاز شیء. راه حل در پیچیدن آنها درون یک «پرانتر» است:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

حالا درست است.


