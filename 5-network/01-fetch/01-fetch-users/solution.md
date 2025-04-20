
برای دریافت کاربران به این موارد نیاز داریم: `fetch('https://api.github.com/users/USERNAME')`.

اگر پاسخ دارای وضعیت `200` است،برای خواندن شی `.json()` را فراخوانی کنید.

در غیر اینصورت اگر  `fetch` ناموفق بود یا پاسخ دارای وضعیت غیر 200 (200-299) بود در آرایه نتیجه `null` قرار میگیرد.

پس کد به اینصورت است:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

لطفا توجه کنید: فراخوانی `.then` به صورت مستقیم به `fetch` متصل شده است، بنابراین وقتی پاسخ را داریم، منتظر دیگر fetch ها نمی‌ماند، بلکه به طور فوری شروع به خواندن `.json()` میکند.

اگر از `await Promise.all(names.map(name => fetch(...)))` استفاده کنیم و `.json()` را برروی نتایج فراخوانی کنیم، آنگاه باید منتظر بماند تا همه درخواست‌ها پاسخ دهند. با اضافه کردن `.json()` به صورت مستقیم به هر `fetch` اطمینان حاصل می‌کنیم که هر کدام آنها به صورت جداگانه شروع به خواندن داده‌ها به صورت JSON می‌کند و منتظر یکدیگر نمی‌ماند.

این مثال نشان‌دهنده این است که چگونه متدهای Promise در سطح پایین همچنان می‌تواند مفید باشد حتی اگر بیشتر از `async/await` استفاده شود.