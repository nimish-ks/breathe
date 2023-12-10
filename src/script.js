document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer");
  const instructionElement = document.getElementById("instruction");
  const descriptionElement = document.getElementById("description");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");

  let countdown;
  let isPaused = true;
  let stage = -1; // Start with -1 to trigger the initial countdown
  let remainingTime = 0; // Track the remaining time for pausing/resuming

  const stages = [
    {
      duration: 5,
      instruction: "Get Ready",
      description: "Relax, get comfortable.",
    },
    {
      duration: 30,
      instruction: "In and Out",
      description: "Take deep breaths. Fill your lungs to max capacity.",
    },
    {
      duration: 3,
      instruction: "Exhale Fully",
      description: "Exhale all the air out.",
    },
    {
      duration: 60,
      instruction: "Hold Breath",
      description: "HODL for 60 seconds.",
    },
    {
      duration: 0,
      instruction: "Take Two Deep Breaths",
      description: "Quickly take two deep breaths.",
    },
    {
      duration: 30,
      instruction: "Hold Breath",
      description: "HODL for 30 seconds",
    },
    {
      duration: 0,
      instruction: "Final Exhale",
      description: "Exhale and relax.",
    },
  ];

  function startTimer(seconds) {
    remainingTime = seconds;
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      remainingTime = secondsLeft;
      if (secondsLeft < 0) {
        clearInterval(countdown);
        nextStage();
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    timerElement.textContent = display;
  }

  function nextStage() {
    stage = (stage + 1) % stages.length;
    const currentStage = stages[stage];
    instructionElement.textContent = currentStage.instruction;
    descriptionElement.textContent = currentStage.description;

    if (currentStage.duration > 0) {
      startTimer(currentStage.duration);
    } else {
      // Handle stages with custom actions
      if (currentStage.instruction === "Take Two Deep Breaths") {
        // Custom action for taking two deep breaths
        setTimeout(() => nextStage(), 5000); // Wait 5 seconds before next stage
      } else if (currentStage.instruction === "Final Exhale") {
        // Custom action for final exhale
        setTimeout(() => resetExercise(), 5000); // Wait 5 seconds before resetting
      }
    }
  }

  function resetExercise() {
    clearInterval(countdown);
    stage = -1;
    isPaused = true;
    startButton.textContent = "Start";
    instructionElement.textContent = "Get Ready";
    descriptionElement.textContent = "Prepare for breathing exercise.";
    displayTimeLeft(5); // Reset to initial 5-second countdown
  }

  startButton.addEventListener("click", () => {
    if (isPaused) {
      isPaused = false;
      startButton.textContent = "Pause";
      if (stage === -1 || remainingTime === 0) {
        nextStage();
      } else {
        startTimer(remainingTime);
      }
    } else {
      clearInterval(countdown);
      isPaused = true;
      startButton.textContent = "Resume";
    }
  });

  resetButton.addEventListener("click", () => {
    resetExercise();
  });
});
