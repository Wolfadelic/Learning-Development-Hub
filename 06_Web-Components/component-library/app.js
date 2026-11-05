(() => {
  "use strict";

  const completedActivities = new Set();
  const progressBar = document.querySelector("#progress-bar");
  const progressFill = document.querySelector("#progress-fill");
  const progressLabel = document.querySelector("#progress-label");

  function updateProgress() {
    if (!progressBar || !progressFill || !progressLabel) return;
    const total = 2;
    const count = completedActivities.size;
    progressFill.style.width = ((count / total) * 100) + "%";
    progressBar.setAttribute("aria-valuenow", String(count));
    progressLabel.textContent = count + " of " + total + " activities complete";
  }

  // Each tab group manages its own tabs and panels.
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));

    function activate(tab, moveFocus) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        item.classList.toggle("is-active", selected);
        const panelId = item.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab, false));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[nextIndex], true);
      });
    });
  });

  // Flashcards are initialised independently, so multiple cards can share a page.
  document.querySelectorAll("[data-flashcard]").forEach((card, index) => {
    const toggle = card.querySelector("[data-flashcard-toggle]");
    const answer = card.querySelector("[data-flashcard-answer]");
    const state = card.querySelector("[data-flashcard-state]");
    if (!toggle || !answer || !state) return;

    const activityId = "flashcard-" + index;
    toggle.addEventListener("click", () => {
      const revealed = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!revealed));
      answer.hidden = revealed;
      toggle.textContent = revealed ? "Reveal answer" : "Hide answer";
      state.textContent = revealed ? "QUESTION" : "ANSWER";
      if (!revealed) {
        completedActivities.add(activityId);
        updateProgress();
      }
    });
  });

  // Knowledge checks can be repeated; each form keeps its own feedback and state.
  document.querySelectorAll("[data-knowledge-check]").forEach((form, index) => {
    const feedback = form.querySelector("[data-quiz-feedback]");
    const activityId = "knowledge-check-" + index;
    if (!feedback) return;

    form.addEventListener("change", (event) => {
      if (event.target.matches('input[type="radio"]')) {
        form.querySelectorAll(".answer-option").forEach((label) => {
          const input = label.querySelector('input[type="radio"]');
          label.classList.toggle("is-selected", Boolean(input && input.checked));
        });
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = form.querySelector('input[type="radio"]:checked');
      feedback.hidden = false;

      if (!selected) {
        feedback.className = "feedback retry";
        feedback.textContent = "Choose an option before checking your answer.";
        return;
      }

      if (selected.value === "b") {
        feedback.className = "feedback success";
        feedback.textContent = "Correct. Useful feedback is respectful, specific, and gives the learner a next step or explanation. It supports improvement rather than simply labelling the response.";
        completedActivities.add(activityId);
      } else {
        feedback.className = "feedback retry";
        feedback.textContent = "Not quite. The most useful feedback explains the issue and helps the learner understand what to consider next. Try the option that gives guidance without blame.";
        completedActivities.delete(activityId);
      }
      updateProgress();
    });
  });

  updateProgress();
})();