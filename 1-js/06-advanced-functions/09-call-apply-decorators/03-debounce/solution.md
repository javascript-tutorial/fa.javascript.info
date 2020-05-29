<<<<<<< HEAD


```js run no-beautify
function debounce(f, ms) {

  let isCooldown = false;

=======
```js demo
function debounce(func, ms) {
  let timeout;
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
<<<<<<< HEAD
```

The call to `debounce` returns a wrapper. There may be two states:
=======
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

