function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // روز هفته 0 (یکشنبه) به اروپایی برابر با 7 است
    day = 7;
  }

  return day;
}
