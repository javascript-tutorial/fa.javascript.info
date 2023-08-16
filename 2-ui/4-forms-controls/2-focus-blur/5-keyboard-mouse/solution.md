
ما می‌توانیم برای هندل کردن click از `mouse.onclick`، برای قابل حرکت دادن mouse از `position:fixed` و سپس از `mouse.onkeydown` برای هندل کردن کلید‌های جهت‌دار استفاده کنیم.

تنها مشکل این است که `keydown` فقط روی elementهایی که focus دارند فعال می‌شود. پس باید `tabindex` را به element اضافه کنیم. چون اجازه نداریم که HTML را تغییر دهیم، می‌توانیم برای آن از `mouse.tabIndex` استفاده کنیم.

پی‌نوشت: همچنین می‌توانیم `mouse.onclick` را با `mouse.onfocus` جایگزین کنیم.
