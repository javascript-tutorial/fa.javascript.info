# دریافت کاربران از گیت هاب

یک تابع async به نام `getUsers(names)`بسازید که یک آرایه از نام‌های ورود به سیستم گیت هاب دریافت کرده، کاربران را از گیت هاب بارگیری کند و یک آرایه از کاربران گیت هاب را برگرداند.

آدرس گیت هاب برای دریافت اطلاعات کاربران `USERNAME` به این صورت است: `https://api.github.com/users/USERNAME`.

در سندباکس (sandbox) یک مثال آزمایشی وجود دارد

موارد مهم:

1. باید یک درخواست `fetch` برای هر کاربر وجود داشته باشد.
2. درخواست‌ها باید منتظر یکدیگر نباشند تا داده‌ها به سرعت برسند.
3. اگر هر درخواست موفق آمیز نباشد یا چنین کاربری وجود نداشته باشد،تابع باید مقدار `null` را در آرایه نتیجه برگرداند.
