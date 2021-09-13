'use strict';

// طرح کوتاهی از کلاسی که باید بنویسید
// با چیزهایی که به هر حال به آنها نیاز پیدا خواهید کرد
class HoverIntent {

  constructor({
    sensitivity = 0.1, // سرعتی کمتر از 0.1px/ms به این معنی است که "اشاره‌گر موس روی عنصر قرار گرفته"
    interval = 100, // سرعت اشاره‌گر موس هر 100ms یکبار چک می‌شود: مسافت طی شده بین مختصات قبلی و کنونی محسابه شود
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // مطمئن شویم که "this" در کنترل‌کننده‌های رویدادها وجود خواهد داشت
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // کنترل‌کننده‌ها را به عنصر متصل می‌کنیم
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // از اینجا شروع کنید

  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }


  destroy() {
    /* کدی که برای "غیرفعال" کردن عملکرد تولتیپ می‌نویسید، همه کنترل‌کننده‌ها را از روی عنصر حذف کنید */
    /* برای آزمایش راه حل شما نیاز است */
  }

}
