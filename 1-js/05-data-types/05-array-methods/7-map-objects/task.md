importance: 5

---

# دست‌یابی به شیءها

شما آرایه‌ای از شیءهای `user` دارید که هر کدام دارای `name`، `surname` و `id` هستند.

کدی برای ساختن یک آرایه دیگر از آن بنویسید که شامل شیءهای دارای `id` و `fullName` است، که `fullName` از `name` و `suname` ایجاد می‌شود.

برای مثال:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... کد شما ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

پس در واقع شما باید طرحی از آرایه‌ای از شیءها برای آرایه‌ای دیگر بیابید. سعی کنید از `<=` اینجا استفاده کنید. یک فریب کوچک وجود دارد.
