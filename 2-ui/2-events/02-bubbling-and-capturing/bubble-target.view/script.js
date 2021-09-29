
form.onclick = function(event) {
  event.target.style.backgroundColor = 'yellow';

  // مرورگر کروم مقداری زمان نیاز دارد تا زرد را نقاشی کند
  setTimeout(() => {
    alert("target = " + event.target.tagName + ", this=" + this.tagName);
    event.target.style.backgroundColor = ''
  }, 0);
};
