

1. برای کوتاه بودن یا از تابع دربرگیرنده استفاده کنید یا از تابع کمانی:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    حالا `user` را از متغیرهای بیرونی دریافت می‌کند و به صورت معمولی آن را اجرا می‌شود.

2. یا یک تابع جزئی از `user.login` بسازید که از `user` به عنوان زمینه استفاده می‌کند و آرگومان اول درست را دارد:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
