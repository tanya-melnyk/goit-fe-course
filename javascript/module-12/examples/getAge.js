function getAgeFromBirthday() {
  var month = document.getElementById('b-month').value;
  var day = document.getElementById('b-day').value;
  var year = document.getElementById('b-year').value;

  var b_date = new Date(year, month, day);

  if (
    b_date.getDate() != day ||
    b_date.getMonth() != month ||
    b_date.getFullYear() != year
  ) {
    alert('Пожалуйста, введите правильную дату рождения');

    return false;
  }

  today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  if (b_date > today) {
    alert('Вы из будущего или ещё не родились');

    return false;
  }

  alert('Вам ' + Math.floor((today - b_date) / 31556952000));
}
