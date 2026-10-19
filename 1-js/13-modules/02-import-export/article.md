# Export و Import

دستورات export و import شامل چندین نوع پیاده سازی هستند.

در مقاله قبلی استفاده ساده ای از آنها را دیدیم، حال بیایید مثال های بیشتری را بررسی کنیم.

## اکسپورت قبل از تعریف

می‌توانیم هر تعریفی را با قرار دادن `export` در قبل آن به عنوان اکسپورت شده علامت گذاری کنیم، که آن می‌تواند تعریف متغیر، تابع یا کلاس باشد.

به عنوان مثال، در اینجا همه export ها معتبر هستند:

```js
// export an array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="بعد از export تابع و کلاس سمی‌کالِن نیست"
لطفا توجه داشته باشید که export قبل از یک کلاس یا تابع آن را به یک [function expression](info:function-expressions) تبدیل نمی‌کند. هنوز هم تعریف یک تابع است اگرچه export شده.

اکثر راهنماهای استایل کد جاوااسکریپت توصیه نمی‌کنند پس از تعریف توابع و کلاس ها از سمی‌کالِن یا همان نقطه ویرگول استفاده شود.

به همین دلیل نیازی به سمی‌کالِن در انتهای `export class` و `export function` نیست: 

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // no ; at the end */!*
```

````

## اکسپورت جدا از تعریف

همچنین، می‌توانیم `export` را به طور جداگانه قرار دهیم.

در اینجا ابتدا تعریف می‌کنیم و سپس export می‌کنیم:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // لیستی از متغیرهای اکسپورت شده
*/!*
```

یا از نظر فنی می‌توان خط شامل export را در بالای تعریف توابع قرار داد.

## Import *‎

معمولاً ما لیستی از آنچه را که می‌خواهیم import کنیم درون کرلی‌بریس `import {...}‎` قرار می‌دهیم، مانند:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

اما اگر چیزهای زیادی برای import از یک ماژول وجود داشته باشد، می‌توانیم همه را به عنوان یک شیء با استفاده از `import * as <obj>‎` درون برنامه import کنیم.

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

در نگاه اول "import همه چیز" چیز خیلی خوبی به نظر می‌رسد، حجم کمتری کد می‌نویسیم، با این حال چرا باید همیشه به صراحت آنچه نیاز داریم را import کنیم؟

خب، چند دلیل وجود دارد.

1. فهرست کردن صریح مواردی که باید وارد شوند، نام‌های کوتاه‌تری را نشان می‌دهد: `sayHi()‎` به جای `say.sayHi()‎`.
2. لیست واضح از import مرور بهتری از ساختار کد ایجاد می‌کند: چه چیزی استفاده شده و کجا. این پشتیبانی و بازبینی کد را آسان تر می‌کند.

<<<<<<< HEAD
```smart header="از import کردن زیاد نترسید."
ابزارهای مدرن بیلد مانند [webpack](https://webpack.js.org/) و مانند آن، ماژول ها را با هم باندل (ترکیب و فشرده سازی) می‌کنند و بهینه می‌کنند تا سرعت بارگذاری را افزایش دهند. آنها همچنین import های استفاده نشده را حذف می‌کنند. 

به عنوان مثال، اگر `import * as library` از یک کتابخانه کد بزرگ import کنیم و سپس تنها از چند تابع آن استفاده کنیم، موارد استفاده نشده [درون بسته بهینه شده نخواهد بود](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs).
=======
```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
```

## Import "as"‎

همچنین می‌توانیم از `as` برای import تحت نام های متفاوت استفاده کنیم.

به  عنوان مثال، اجازه دهید برای اختصار `sayHi` را import کنیم و آن را در متغیر محلی `hi` قرار دهیم، همچنین `sayBye` تحت عنوان `bye` :

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"‎

ساختار مشابهی برای export وجود دارد.

اجازه دهید توابع را تحت عناوین hi و bye در پایین export کنیم:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

اکنون `hi` و `bye` نام های رسمی برای استفاده در بیرون ماژول هستند، برای استفاده در import ها:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

در عمل، عمدتاً دو نوع ماژول وجود دارد.

1. ماژول هایی که حاوی کتابخانه، بسته ای از توابع، مانند `say.js` بالا هستند.
2. ماژول هایی که یک موجودیت واحد را اعلان می‌کنند، به عنوان مثال ماژول `user.js` فقط کلاس `User` را export می‌کند.

اغلب، رویکرد دوم ترجیح داده می‌شود، به طوری که هر "چیزی" در ماژول خودش قرار دارد.

طبیعتاً، این نیاز به تعداد زیادی فایل دارد، زیرا هر چیزی ماژول خود را می‌خواهد، اما این اصلا مشکلی نیست. در واقع، پیمایش کد با نامگذاری و ساختاربندی خوب فایل ها در پوشه ها آسان تر می‌شود.

ماژول ها ساختار `export default` ("export به صورت پیش فرض") را برای بهبود دادن رویکرد "یک چیز در هر ماژول" فراهم می‌کنند.

عبارت `export default` را قبل از موجودیتی که می‌خواهید export کنید قرار دهید:

```js
// 📁 user.js
export *!*default*/!* class User { // .اضافه شد default فقط
  constructor(name) {
    this.name = name;
  }
}
```

در هر فایل فقط می‌توان یک `export default` داشت.

و سپس آن را بدون کرلی‌بریس import کنید.

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // not {User}, just User

new User('John');
```

بدون کرلی‌بریس import ظاهر بهتری می‌گیرد. اما یک اشتباه رایج هنگام شروع استفاده از ماژول‌ها فراموش کردن کرلی‌بریس‌ها در همه جا است. پس به یاد داشته باشید `import` برای export های نامگذاری شده نیاز به کرلی‌بریس دارد و برای export های پیش فرض نیازی ندارد.

| (export نامگذاری شده) Named export | (export پیش فرض) Default export |
|:----|:----|
| `export class User {...}‎` | `export default class User {...}‎` |
| `import {User} from ...‎` | `import User from ...‎`|

از نظر فنی، ممکن است هم export پیش فرض و هم export نامگذاری شده در یک ماژول وجود داشته باشد، اما در عمل معمولا افراد آنها را مخلوط نمی‌کنند. یک ماژول یا export نامگذاری شده دارد یا export پیش فرض.

از آنجایی که فقط امکان تعریف یک export پیش فرض در هر فایل وجود دارد، موجودیت export شده ممکن است نامی نداشته باشد.

به عنوان مثال، همه اینها export پیش فرضِ معتبر هستند:

```js
export default class { // کلاس اسم ندارد
  constructor() { ... }
}
```

```js
export default function(user) { // تابع اسم ندارد
  alert(`Hello, ${user}!`);
}
```

```js
// شده export یک مقدار واحد را بدون ایجاد متغیر
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

عدم استفاده از نام مشکلی ایجاد نمی‌کند، زیرا در هر فایل فقط یک `export default` وجود دارد، بنابراین `import` بدون کرلی‌بریس می‌داند چه چیزی را import کند.

بدون `default` چنین export کردنی خطا می‌دهد:

```js
export class { // Error! (non-default export needs a name)
  constructor() {}
}
```

### The "default" name

در برخی موقعیت‌ها از کلمه‌ی کلیدی `default` برای اشاره به export پیش فرض استفاده می‌شود.

 به عنوان مثال، برای export جداگانه یک تابع از تعریف آن:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// را اضافه کرده‌ایم "export default" شبیه این می‌ماند که قبل از تابع
export {sayHi as default};
```

یا موقعیت دیگری، فرض کنید ماژول `user.js` یک چیز را بصورت پیش فرض export می‌کند و چند export بصورت نامگذاری شده دارد (این عمل نادر انجام می‌شود، اما ممکن است):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

اینجا نحوه import کردن export پیش فرض همراه با یک export نامگذاری شده را مشاهده می‌کنید:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

 و در نهایت، اگر همه چیز را به عنوان یک شیء با استفاده از `*` در برنامه import کنیم، آنگاه خاصیت `default` در شیء، همان export پیش فرض می‌باشد:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

### کلمه ای در برابر export پیش فرض

باید دانست که export های نامگذاری شده صریح هستند. آنها دقیقا می‌گویند که چه چیزی را import می‌کنند، بنابراین از آنها این اطلاعات را داریم؛ این یک چیز خوب است.

همچنین export های نامگذاری شده ما را مجبور می‌کنند از دقیقاً همان نام درست برای import استفاده کنیم:

```js
import {User} from './user.js';
// باشد {User} کار نمی‌کند، نام باید {MyUser} کردن import
```

در صورتی که برای export پیش فرض در هنگام import از یک نام انتخابی استفاده می‌کنیم.

```js
import User from './user.js';   // کار می‌کند
import MyUser from './user.js'; // این هم کار می‌کند
// کند... و همچنان کار خواهد کرد import می‌تواند هر نامی را
```

بنابراین اعضای تیم ممکن است برای import یک ماژول از نام های متفاوتی استفاده کنند و این خوب نیست.

معمولاً، برای جلوگیری از این موضوع و حفظ یکنواختی کد، قاعده ای وجود دارد که متغیرهای import شده باید مطابق با نام فایل‌ها باشند، به عنوان مثال:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

با این حال، برخی تیم‌ها این را یک نقطه ضعف جدی export پیش فرض می‌دانند. بنابراین ترجیح می‌دهند همیشه از import نامگذاری شده استفاده کنند. حتی اگر فقط یک چیز صادر شود، همچنان تحت یک نام export می‌شود، بدون `default`.

این همچنین export مجدد (رجوع کنید به زیر) را اندکی آسان تر می‌کند.

## export مجدد

ساختار "export مجدد" `export ... from ...‎` این امکان را فراهم می‌سازد تا چیزها را import کنیم و بعد ازآن بتوانیم آن را export کنیم (احتمالا تحت نامی دیگر)، مانند:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

چرا این امر مورد نیاز است؟ بیایید یک کاربرد عملی ببینیم.

فرض کنید درحال نوشتن یک "پکیج" هستیم: یک پوشه با تعداد زیادی ماژول، که برخی از عملکردهای آن به بیرون export می‌شود (ابزارهایی مانند NPM به ما اجازه انتشار و توزیع چنین پکیج‌هایی را می‌دهد، اما اینجا نیازی به استفاده از آنها نیست) و ماژول‌های زیادی فقط "کمکی" هستند، برای استفاده داخلی در سایر ماژول‌های پکیج.

ساختار فایل ممکن است به این شکل باشد:
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

می‌خواهیم عملکرد پکیج را از طریق یک نقطه ورودی در معرض نمایش قرار دهیم.

به عبارت دیگر، شخصی که می‌خواهد از پکیج ما استفاده کند، فقط باید "فایل اصلی" `auth/index.js` را import کند.

مانند:

```js
import {login, logout} from 'auth/index.js'
```

"فایل اصلی"، `auth/index.js` ، همه عملکردهایی را که می‌خواهیم در پکیج خود ارائه دهیم export می‌کند.

ایده این است که بیرونی‌ها ، برنامه نویسان دیگری که از پکیج ما استفاده می‌کنند ، نباید دخالتی در فایل ها و ساختار پکیج داشته باشند. ما ففط آنچه را که لازم است در `auth/index.js` پکیج خود export می‌کنیم و بقیه را از چشم های کنجکاو پنهان نگه می‌داریم.

از آنجایی که عملکرد export شده واقعا در سراسر پکیج پراکنده است، می‌توانیم آن را در `auth/index.js` که نقطه ارتباط پکیج با بیرون است import کنیم و سپس از آنجا export بگیریم:

```js
// 📁 auth/index.js

// شده export شده و سپس بلافاصله import ابتدا login/logout
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
...
```

اکنون کاربران پکیج ما می‌توانند از `import {login} from "auth/index.js"‎` استفاده کنند.

ساختار `export ... from ...‎` فقط یک نمایش مختصر از همین import/export است:

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
export {default as User} from './user.js';
...
```

تفاوت قابل توجه `export ... from‎` نسبت به `import/export` این است که در اولی ماژول ها در فایل جاری در دسترس نیستند، بنابر این در مثال بالا نمی‌توان از توابع `login/logout` در فایل `auth/index.js` استفاده کرد.

### export مجدد export پیش فرض

هنگام export مجدد، export پیش فرض (export default) نیاز به دستکاری جداگانه دارد.

فرض کنید `user.js` با `export default class User` و می‌خواهیم آن را مجدد export کنیم:

```js
// 📁 user.js
export default class User {
  // ...
}
```

ممکن است با دو مشکل مواجه شویم:

1. عبارت `export User from './user.js'‎` کار نمی‌کند. این به خطای نحوی (سینتکس) منجر می‌شود.

    برای export مجدد export پیش فرض، باید بنویسیم `export {default as User} from './user.js'‎`، مانند مثال بالا.

2. عبارت `export * from './user.js'‎` فقط export های نامگذاری شده را export مجدد می‌کند، اما export پیش فرض را نادیده می‌گیرد.

    اگر بخواهیم هم export نامگذاری شده و هم پیش فرض را export مجدد کنیم، آنگاه دو عبارت لازم است:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

چنین عجایبی از export مجددِ export پیش فرض یکی از دلایلی است که برخی توسعه دهندگان از export پیش فرض خوششان نمی‌آید و ترجیح می‌دهند از export نامگذاری شده استفاده کنند.

## جمع بندی

در اینجا انواع `export` را که در این مقاله و مقالات قبلی پوشش داده‌ایم، مرور می‌کنیم.

می‌توانید خود را با خواندن آنها و به یاد آوردن معنایشان بررسی کنید:

- export قبل از تعریف کلاس / تابع / ... :
  - `export [default] class/function/variable ...‎`
- export مستقل (standalone export):
  - `export {x [as y], ...}‎`.
- export مجدد (re-export):
  - `export {x [as y], ...} from "module"‎`
  - `export * from "module"‎` (doesn't re-export default).
  - `export {default [as y]} from "module"‎` (re-export default).

Import:

- import از export نامگذاری شده:
  - `import {x [as y], ...} from "module"‎`
- import از export پیش فرض:
  - `import x from "module"‎`
  - `import {default as x} from "module"‎`
- import همه:
  - `import * as obj from "module"‎`
- import کردن ماژول (کد آن اجرا می‌شود)، اما هیچ یک از export های آن به متغیر خاصی اختصاص نمی‌یابد.
  - `import "module"‎`

می‌تونیم عبارات `import/export` را در بالا یا پایین اسکریپت قرار دهیم، اهمیتی ندارد.

بنابراین از نظر فنی این کد درست است:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // شده import در انتهای فایل
```

در عمل import ها معمولا در ابتدای فایل قرار دارند، اما این فقط برای راحتی بیشتر است.

**لطفاً توجه داشته باشید که عبارات import/export در داخل `{...}` کار نمی‌کنند.**

یک import شرطی مانند زیر، کار نمی‌کند:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

اما اگر واقعاً نیاز به import شرطی داشتیم چه؟ مثلاً بارگذاری یک ماژول هنگامی که واقعاً لازم است؟ چه باید کرد؟

در مقاله بعدی import های پویا (dynamic imports) را خواهیم دید.
