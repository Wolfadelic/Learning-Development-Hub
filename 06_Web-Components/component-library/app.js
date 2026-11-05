(() => {
  "use strict";

  const completed = new Set();
  const progressBar = document.querySelector("#progress-bar");
  const progressFill = document.querySelector("#progress-fill");
  const progressLabel = document.querySelector("#progress-label");

  function updateProgress() {
    const total = 2;
    const count = completed.size;
    const percent = (count / total) * 100;
    progressFill.style.width = percent + "%";
    progressBar.setAttribute("aria-valuenow", String(count));
    progressLabel.textContent = count + " of " + total + " activities complete";
  }

  // Tabs: support arrow keys, Home, End, and normal tab navigation.
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));

    function activate(tab, moveFocus = true) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        item.classList.toggle("is-active", selected);
        const panel = document.getElementById(item.getAttribute("aria-controls"));
        panel.hidden = !selected;
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab, false));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[nextIndex]);
      });
    });
  });

  // Flashcard: reveal the explanation and count the activity once.
  const flashcardToggle = document.querySelector("#flashcard-toggle");
  const flashcardAnswer = document.querySelector("#flashcard-answer");
  const flashcardState = document.querySelector("#flashcard-state");
  flashcardToggle.addEventListener("click", () => {
    const isRevealed = flashcardToggle.getAttribute("aria-expanded") === "true";
    flashcardToggle.setAttribute("aria-expanded", String(!isRevealed));
    flashcardAnswer.hidden = isRevealed;
    flashcardToggle.textContent = isRevealed ? "Reveal answer" : "Hide answer";
    flashcardState.textContent = isRevealed ? "QUESTION" : "ANSWER";
    if (!isRevealed) {
      completed.add("flashcard");
      updateProgress();
    }
  });

  // Knowledge check: explain the design principle, not only the score.
  const quiz = document.querySelector("#knowledge-check");
  const feedback = document.querySelector("#quiz-feedback");
  quiz.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = quiz.querySelector('input[name="answer"]:checked');
    feedback.hidden = false;

    if (!selected) {
      feedback.className = "feedback retry";
      feedback.textContent = "Choose an option before checking your answer.";
      return;
    }

    if (selected.value === "b") {
      feedback.className = "feedback success";
      feedback.textContent = "Correct. Useful feedback is respectful, specific, and gives the learner a next step or explanation. It supports improvement rather than simply labelling the response.";
      completed.add("knowledge-check");
      updateProgress();
    } else {
      feedback.className = "feedback retry";
      feedback.textContent = "Not quite. The most useful feedback explains the issue and helps the learner understand what to consider next. Try the option that gives guidance without blame.";
      completed.delete("knowledge-check");
      updateProgress();
    }
  });

  updateProgress();
})();