// <td> که هم اکنون زیر موس قرار دارد (در صورت وجود)
let currentElem = null;

table.onmouseover = function (event) {
  // قبل از ورود به عنصر جدید، اشاره‌گر موس همیشه قبلی را ترک می‌کند
  // اگر currentElem مقدار داشته باشد، پس ما <td> قبلی را ترک نکرده‌ایم،
  // که یعنی یک رویداد mouseover درون آن رخ داده، پس آنرا نادیده می‌گیریم.
  if (currentElem) return;

  let target = event.target.closest('td');

  // وارد یک <td> نشده پس آنرا نادیده می‌گیریم
  if (!target) return;

  // وارد یک <td> شده، اما نه درون جدول مورد نظر ما (در صورتی که جدول‌های تو در تو داشته باشیم این امکان وجود دارد)
  // نادیده می‌گیریم
  if (!table.contains(target)) return;

  // هوورا! ما وارد یک <td> جدید شدیم
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function (event) {
  // اگر که ما اکنون بیرون هر یک از <td> باشیم، پس این رویداد را نادیده می‌گیریم
  // احتمالا اشاره‌گر موس وارد یک جدول شده اما هنوز بیرون از <td> است،
  // مثلا از یک <tr> به <tr> دیگر
  if (!currentElem) return;

  // ما در حال ترک عنصر هستیم، اما به کجا؟ شاید به یک فرزند؟
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // زنجیره پدر-فرزندی را بالا می‌رویم و چک می‌کنیم که آیا هنوز داخل currentElem هستیم یا نه
    // در این صورت این یک گذر داخلی است، که آنرا نادیده می‌گیریم
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // ما واقعا <td> را ترک کردیم
  onLeave(currentElem);
  currentElem = null;
};

// هر تابعی برای کنترل ورود/خروج یک عنصر
function onEnter(elem) {
  elem.style.background = 'pink';

  // نمایش آن
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // نمایش آن در textarea
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
