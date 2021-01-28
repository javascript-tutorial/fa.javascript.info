

1. یا یک پوشه بدهیم٬ که توابع فلشی خلاصه تر هستند

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    الان این `user` را از مقادیر بیرونی میگیرد و به صورت عادی اجرا میکند.

2. یا یک تابع جزی از `user.login` بسازیم که از `user` برای محتوا استفاده میکند و آرگومان اول را دارد:‌


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
