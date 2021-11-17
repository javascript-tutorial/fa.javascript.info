# با استفاده از بازگشت

اینجا منطق بازگشتی کمی مشکل است.

ما نیاز داریم که اول بقیه لیست را نمایش دهیم و *سپس* لیست کنونی را نمایش دهیم:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# با استفاده از حلقه

روش حلقه کمی پیچیده‌تر از نمایش‌دادن به صورت مستقیم است.

هیچ راهی برای گرفتن آخرین مقدار `list` ما وجود ندارد. همچنین نمی‌توانیم «به عقب برگردیم».

پس کاری که می‌توانیم کنیم این است که اول با ترتیب مستقیم در المان‌های پیمایش کنیم و آنها را در یک آرایه ذخیره کنیم و سپس چیزی که ذخیره کردیم را با ترتیب برعکس نمایش دهیم:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

لطفا در نظر داشته باشید که راه‌حل بازگشتی کار یکسانی را انجام می‌دهد: لیست را دنبال می‌کند، المان‌ها را در زنجیره‌ای از فراخوانی‌های تودرتو ذخیره می‌کند (در پشته زمینه اجرا)، و سپس آنها را نمایش می‌دهد.
