importance: 5

---

# یک ماشین حساب قابل توسعه بسازید

یک تابع سازنده `Calculator` بسازید که شیءهای ماشین حساب «قابل توسعه» می‌سازد.

این تکلیف از دو بخش تشکیل شده است.

1. اول، متد `calculate(str)` را بسازید که یک رشته مانند `"1 + 2"` را در شکل «عدد عملگر عدد» دریافت می‌کند و نتیجه را برمی‌گرداند. این متد باید جمع `+` و منها `-` را متوجه شود.

    مثالی از کاربرد آن:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. سپس متد `addMethod(name, func)` را اضافه کنید که به ماشین حساب یک عملیات جدید را آموزش می‌دهد. این متد اسم عملگر `name` و تابع دو آرگومانی `func(a,b)` که عملیات را پیاده‌سازی می‌کند را دریافت می‌کند.

    برای مثال، بیایید عمل ضرب `*`، تقسیم `/` و به توان رساندن `**` را اضافه کنیم:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- پرانتز یا عبارات پیچیده در این تکلیف وجود ندارند.
- اعداد و عملگر دقیقا به یک فاصله خالی محدود می‌شوند.
- اگر دوست داشته باشید می‌توانید مدیریت ارور را هم اضافه کنید.
