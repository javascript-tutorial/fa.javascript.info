To get the number of seconds, we can generate a date using the current day and time 00:00:00, then substract it from "now".

The difference is the number of milliseconds from the beginning of the day, that we should divide by 1000 to get seconds:

```js run
function getSecondsToday() {
  let now = new Date();

  // create an object using the current day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}

alert( getSecondsToday() );
```

An alternative solution would be to get hours/minutes/seconds and convert them to seconds:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
<<<<<<< HEAD
};
=======
}

alert( getSecondsToday() );
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```
