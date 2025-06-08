
  const FULL_DASH = 2 * Math.PI * 54; // circumference for r=54

  const totalDays = Math.floor((new Date("July 29, 2025").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  function updateCountdown() {
    const now = new Date().getTime();
    const targetDate = new Date("July 29, 2025 00:00:00").getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById("countdown").innerHTML = "Countdown Ended";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days-num").textContent = days;
    document.getElementById("hours-num").textContent = hours;
    document.getElementById("minutes-num").textContent = minutes;
    document.getElementById("seconds-num").textContent = seconds;

    // Animate progress rings
    const hourOffset = FULL_DASH * (1 - hours / 24);
    const minuteOffset = FULL_DASH * (1 - minutes / 60);
    const secondOffset = FULL_DASH * (1 - seconds / 60);
    const dayOffset = FULL_DASH * (1 - days / totalDays);

    document.getElementById("days-ring").style.strokeDashoffset = dayOffset;
    document.getElementById("hours-ring").style.strokeDashoffset = hourOffset;
    document.getElementById("minutes-ring").style.strokeDashoffset = minuteOffset;
    document.getElementById("seconds-ring").style.strokeDashoffset = secondOffset;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
