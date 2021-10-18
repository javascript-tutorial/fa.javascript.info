function spy(func) {

  function wrapper(...args) {
    // wrapper.calls برای ذخیره کردن آرایه «واقعی» درون arguments به جای ...args استفاده از
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
