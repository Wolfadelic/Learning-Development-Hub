(() => {
  "use strict";

  const completedActivities = new Set();
  const progressBar = document.querySelector("#progress-bar");
  const progressFill = document.querySelector("#progress-fill");
  const progressLabel = document.querySelector("#progress-label");

  function updateProgress() {
    if (!progressBar || !progressFill || !progressLabel) return;
    const total = document.querySelectorAll("[data-flashcard], [data-knowledge-check], [data-scenario]").length;
    const count = completedActivities.size;
    const percent = total ? Math.min(100, (count / total) * 100) : 0;
    progressFill.style.width = percent + "%";
    progressBar.setAttribute("aria-valuemax", String(total));
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


  // Scenario component: retry incorrect choices, then progress through the decision path.
  document.querySelectorAll("[data-scenario]").forEach((scenario, scenarioIndex) => {
    const steps = Array.from(scenario.querySelectorAll("[data-scenario-step]"));
    const outcome = scenario.querySelector("[data-scenario-outcome]");
    const restart = scenario.querySelector("[data-scenario-restart]");
    const activityId = "scenario-" + scenarioIndex;

    steps.forEach((step, stepIndex) => {
      const choices = Array.from(step.querySelectorAll("[data-scenario-choice]"));
      const feedback = step.querySelector("[data-scenario-feedback]");
      const feedbackText = step.querySelector("[data-scenario-feedback-text]");
      const next = step.querySelector("[data-scenario-next]");
      if (!feedback || !feedbackText || !next) return;

      choices.forEach((choice) => {
        choice.addEventListener("click", () => {
          const correct = choice.dataset.correct === "true";
          feedback.hidden = false;
          feedback.classList.toggle("is-correct", correct);
          choices.forEach((item) => {
            item.classList.toggle("is-selected", item === choice);
            item.disabled = correct;
          });

          if (correct) {
            feedbackText.textContent = stepIndex === 0
              ? "Correct. Verify the source approval and its effective date before changing billing data. This prevents an unsupported rate change."
              : "Correct. Update the matter through the approved process, then validate the affected invoice details before resubmitting.";
            next.hidden = false;
          } else {
            feedbackText.textContent = stepIndex === 0
              ? "That creates a risk. Do not change or override a rate until the approval and effective date are verified. Review the rejection and supporting documentation, then try again."
              : "That skips an important control. The matter-level correction must follow the approved process, and the invoice still needs validation. Choose the option that addresses both.";
            next.hidden = true;
            choices.forEach((item) => {
              item.disabled = false;
              item.classList.remove("is-selected");
            });
          }
        });
      });

      next.addEventListener("click", () => {
        step.hidden = true;
        const following = steps[stepIndex + 1];
        if (following) {
          following.hidden = false;
          const heading = following.querySelector("h4");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus();
          }
        } else if (outcome) {
          outcome.hidden = false;
          completedActivities.add(activityId);
          updateProgress();
          const heading = outcome.querySelector("h4");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus();
          }
        }
      });
    });

    if (restart) {
      restart.addEventListener("click", () => {
        completedActivities.delete(activityId);
        if (outcome) outcome.hidden = true;
        steps.forEach((step, index) => {
          step.hidden = index !== 0;
          const feedback = step.querySelector("[data-scenario-feedback]");
          const next = step.querySelector("[data-scenario-next]");
          if (feedback) {
            feedback.hidden = true;
            feedback.classList.remove("is-correct");
          }
          if (next) next.hidden = true;
          step.querySelectorAll("[data-scenario-choice]").forEach((choice) => {
            choice.disabled = false;
            choice.classList.remove("is-selected");
          });
        });
        updateProgress();
        const heading = steps[0] && steps[0].querySelector("h4");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus();
        }
      });
    }
  });

  updateProgress();
})();