راه حل با کمک `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

راه حل با علامت سوال `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

پی‌نوشت: در حالت `a == b`، مهم نیست که چه چیزی برگردانده شود.
