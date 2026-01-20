var controlBtn = document.querySelector(".control");
var lights = document.querySelector(".lights");
var timeText = document.querySelector(".time");

var startTime = null;
var isRunning = false;

controlBtn.addEventListener("click", function () {
  if (!isRunning) {
    startTime = Date.now();
    isRunning = true;

    controlBtn.textContent = "Stop";
    timeText.textContent = "0.00 s";

    lights.classList.remove("red");
    lights.classList.add("green", "active");
  }
  else {
    var stopTime = Date.now();
    var totalTime = ((stopTime - startTime) / 1000).toFixed(2);

    isRunning = false;
    startTime = null;

    controlBtn.textContent = "Start";
    timeText.textContent = totalTime + " s";

    lights.classList.remove("green");
    lights.classList.add("red", "active");
  }
});
