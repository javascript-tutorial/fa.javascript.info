``` js run
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // اگر بیرون از بازه بود آن را حذف کن
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // تمام اعداد به جز 1 تا 4 را حذف کرد

alert( arr ); // [3, 1]

```
