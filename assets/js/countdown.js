class CircleTimer {
  constructor(elementId, timeLimit) {
    this.elementId = elementId;
    this.timeLimit = timeLimit;
    this.timePassed = 0;
    this.timeLeft = timeLimit;
    this.timerInterval = null;
    this.remainingPathColor = COLOR_CODES.info.color;
    this.fullDashArray = FULL_DASH_ARRAY;

    this.init();
  }

  init() {
    const element = document.getElementById(this.elementId);
    element.innerHTML = `
      <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
              id="${this.elementId}-path-remaining"
              stroke-dasharray="283"
              class="base-timer__path-remaining ${this.remainingPathColor}"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="${this.elementId}-label" class="base-timer__label">${this.formatTime(
          this.timeLeft
        )}</span>
      </div>
    `;

    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed += 1;
      this.timeLeft = this.timeLimit - this.timePassed;
      document.getElementById(`${this.elementId}-label`).innerHTML =
        this.formatTime(this.timeLeft);
      this.setCircleDasharray();
      this.setRemainingPathColor();

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  setRemainingPathColor() {
    const path = document.getElementById(`${this.elementId}-path-remaining`);
    const { alert, warning, info } = COLOR_CODES;

    path.classList.remove(alert.color, warning.color, info.color);

    if (this.timeLeft <= alert.threshold) {
      path.classList.add(alert.color);
    } else if (this.timeLeft <= warning.threshold) {
      path.classList.add(warning.color);
    } else {
      path.classList.add(info.color);
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.timeLimit;
    return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const dashArray = `${(
      this.calculateTimeFraction() * this.fullDashArray
    ).toFixed(0)} ${this.fullDashArray}`;
    document
      .getElementById(`${this.elementId}-path-remaining`)
      .setAttribute("stroke-dasharray", dashArray);
  }
}
new CircleTimer("timer1", 20); // 20 seconds
new CircleTimer("timer2", 45); // 45 seconds
