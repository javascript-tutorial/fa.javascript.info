'use strict';

class HoverIntent {

  constructor({
    
    sensitivity = 0.1, // سرعتی کمتر از 0.1px/ms به این معنی است که "اشاره‌گر موس روی عنصر قرار گرفته"
    interval = 100,    // سرعت موس هر 100ms یکبار اندازه‌گیری می‌شود
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

    // و همچنین در تابع اندازه‌گیری زمان (که درون setInterval صدا زده می‌شود)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);

  }

  onMouseOver(event) {

    if (this.isOverElement) {
      // if we're over the element, then ignore the event
      // we are already measuring the speed
      return;
    }

    this.isOverElement = true;

    // after every mousemove we'll be check the distance
    // between the previous and the current mouse coordinates
    // if it's less than sensivity, then the speed is slow

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener('mousemove', this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // اگر اشاره‌گر موس عنصر را ترک کند
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // اگر روی عنصر یک توقف وجود داشته باشد
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {

    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // اشاره‌گر حرکتی نداشته
      speed = 0;
    } else {
      speed = Math.sqrt(
        Math.pow(this.prevX - this.lastX, 2) +
        Math.pow(this.prevY - this.lastY, 2)
      ) / (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem, event);
    } else {
      // سرعت بالا، مختصات فعلی را برای اندازه‌گیری بعدی ذخیره می‌کنیم
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }

}
