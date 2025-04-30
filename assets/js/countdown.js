const countDate = new Date('Jul 29, 2025 00:08:00').getTime();
let previousTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function updateFlipCards() {
  const now = new Date().getTime();
  const timeLeft = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(timeLeft / day);
  const hours = Math.floor((timeLeft % day) / hour);
  const minutes = Math.floor((timeLeft % hour) / minute);
  const seconds = Math.floor((timeLeft % minute) / second);

  updateCard('days', days, previousTime.days);
  updateCard('hours', hours, previousTime.hours);
  updateCard('minutes', minutes, previousTime.minutes);
  updateCard('seconds', seconds, previousTime.seconds);

  previousTime = { days, hours, minutes, seconds };
}

function updateCard(unit, current, previous) {
  const card = document.querySelector(`.${unit}`);
  if (current !== previous) {
    card.classList.add('flipping');
    setTimeout(() => {
      card.textContent = current.toString().padStart(2, '0');
      card.classList.remove('flipping');
    }, 150);
  }
}

setInterval(updateFlipCards, 1000);
updateFlipCards();