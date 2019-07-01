# ویرایشگرهای متن 

ویرایشگرهای متن محلی ‌است که برنامه‌نویسان بیشتر وقت خود را آنجا صرف میکنند. 

در مجموع دو نوع ویرایشگر وجود دارد : یکی IDE ها و دیگری ویرایشگرهای سبک برای کد نویسی. بعضی از هر دوی اینها استفاده می‌کنند. 

## IDE

عبارت [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) یا همان Integrated Development Environment به یک ویرایشگر قدرتمند با امکانات بسیار اشاره دارد که معمولا از این امکانات در "کل" یک پروژه استفاده می‌شود. 

درواقع IDE امکاناتی چون بارگذاری کل پروژه، امکان جابجایی بین فایل‌ها، امکان تکمیل خودکار کدها بر اساس نوع پروژه‌ای که انجام می‌دهید (و نه بر اساس صرفا یک فایل) را دارد، همینطور با یک سیستم کنترل نسخه مانند [Git](https://git-scm.com/) سازگار است، امکاناتی مانند محیط تست نرم افزار را در اختیار شما قرار می‌دهد و سایر امکاناتی که در سطح پروژه اهمیت دارد. 

اگر هنوز یک IDE انتخاب نکرده‌اید، موارد زیر را در نظر داشته باشید : 

<<<<<<< HEAD:1-js/01-getting-started/2-code-editors/article.md
- [WebStorm](http://www.jetbrains.com/webstorm/) برای توسعه Front End . کمپانی Jetbrains همینطور IDE های دیگری را برای زبان‌های دیگر ارائه می‌کند (که رایگان نیستند) 

- [Netbeans](http://netbeans.org/) (رایگان) 

این IDE ها اصطلاحا Cross Platform هستند. 

همینطور برای Windows می‌توانید از Visual Studio استفاده کنید (منظور Visual Studio Code نیست). Visual Studio یک نرم افزار غیر رایگان است و فقط بر روی Windows کار می‌کند که برای توسعه پلتفرم dot net مناسب است. نسخه رایگان این نرم افزار [Visual Studio Community](https://www.visualstudio.com/vs/community/) نام دارد.  
=======
- [Visual Studio Code](https://code.visualstudio.com/) (cross-platform, free).
- [WebStorm](http://www.jetbrains.com/webstorm/) (cross-platform, paid).

For Windows, there's also "Visual Studio", not to be confused with "Visual Studio Code". "Visual Studio" is a paid and mighty Windows-only editor, well-suited for the .NET platform. It's also good at JavaScript. There's also a free version [Visual Studio Community](https://www.visualstudio.com/vs/community/).

Many IDEs are paid, but have a trial period. Their cost is usually negligible compared to a qualified developer's salary, so just choose the best one for you.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd:1-js/01-getting-started/3-code-editors/article.md

بعضی از IDE ها پولی هستند ولی برای مدتی به صورت آزمایشی می‌توان از آنها به رایگان استفاده کرد. معمولا قیمت آنها در مقایسه با درآمد برنامه‌نویسان ناچیز است، پس یک IDE خوب برای خود انتخاب کنید. 

## ویرایشگرهای سبک 

این دسته از ویرایشگرها به اندازه IDE ها قدرتمند نیستند، ولی سبک، زیبا و ساده هستند.  

معمولا برای ویرایش سریع یک فایل استفاده می‌شوند. 

تفاوت اصلی بین ویرایشگرهای سبک و IDE ها در آن است که IDE ها در سطح پروژه استفاده می‌‌شوند، در نتیجه در آغاز اطلاعات زیادی را بارگذاری می‌کنند، ساختار پروژه را تحلیل میکنند و موارد این‌چنینی. در زمانیکه بخواهیم روی یک فایل کار کنیم ویرایشگرهای سبک بسیار سریع‌تر هستند. 

در عمل ویرایشگرهای سبک دارای افزونه‌های متعددی هستند، مانند تحلیل‌کننده‌های سینتَکس (syntax)، تکمیل‌کننده های کد و غیره. به همین دلیل نمی‌تواند مرز دقیقی بین IDE و ویرایشگرهای سبک قائل بود. 

<<<<<<< HEAD:1-js/01-getting-started/2-code-editors/article.md
موارد زیر ارزش توجه را دارند : 

- [Visual Studio Code](https://code.visualstudio.com/) : رایگان - Cross Platform و همچنین تعدادی از قابلیت‌های IDE ها را دارد 

- [Atom](https://atom.io/) : رایگان - Cross Platform 

- [Sublime Text](http://www.sublimetext.com) : رایگان برای مدت محدود - Cross Platform 

- [Notepad++](https://notepad-plus-plus.org/) : برای Windows - رایگان 

- [Vim](http://www.vim.org/) و [Emacs](https://www.gnu.org/software/emacs/) هم اگر با نحوه کارشان آشنا باشید خوب هستند. 
=======
- [Atom](https://atom.io/) (cross-platform, free).
- [Sublime Text](http://www.sublimetext.com) (cross-platform, shareware).
- [Notepad++](https://notepad-plus-plus.org/) (Windows, free).
- [Vim](http://www.vim.org/) and [Emacs](https://www.gnu.org/software/emacs/) are also cool if you know how to use them.

## Let's not argue
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd:1-js/01-getting-started/3-code-editors/article.md

## مورد علاقه‌های من 

ترجیح نویسنده بر آن است که برای پروژه‌ها از IDE و برای کارهای سریع و ساده از ویرایشگرهای سبک استفاده کند. 

من از این نرم‌افزارها استفاده می‌کنم : 

- به عنوان IDE : برای توسعه JavaScript از [WebStorm](http://www.jetbrains.com/webstorm/) (در کار با زبان‌های دیگر از دیگر محصولات JetBrains استفاده می‌کنم) 

- به عنوان یک ویرایشگر سبک : [Sublime Text](http://www.sublimetext.com) یا [Atom](https://atom.io/) 

## بیایید بحث نکنیم 

ویرایشگرهایی بالا آنهایی هستند که من و دوستانم که آنها را توسعه‌دهندگان خوبی می‌دانم مورد استفاده قرار ‌می‌دهند و راضی هستند. 

ویرایشگرهای دیگری نیز وجود دارند پس همانی که مورد علاقه شماست را انتخاب کنید. 

انتخاب ویرایشگر یا هر ابزار دیگری شخصی بوده و به نوع پروژه، عادات و سلیقه شخصی بستگی دارد. 