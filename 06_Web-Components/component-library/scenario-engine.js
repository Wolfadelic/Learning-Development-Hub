(() => {
  "use strict";

  const configs = window.LDH_SCENARIO_CONFIGS || [];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function announce(root, eventName, detail) {
    root.dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail }));
  }

  function renderScenario(root, config) {
    if (!config || !config.id || !config.nodes || !config.startNode) {
      root.textContent = "This scenario configuration is incomplete. Check its ID, start node, and node definitions.";
      return;
    }

    let currentNodeId = config.startNode;
    let attempts = 0;
    let firstTryCorrect = 0;
    let decisionsCompleted = 0;
    let decisionAttemptCount = 0;
    let complete = false;

    const intro = element("div", "scenario-context");
    intro.append(
      element("p", "eyebrow", config.role || "LEARNING SCENARIO"),
      element("h4", "scenario-intro-title", config.title),
      element("p", "", config.description || ""),
      element("p", "", config.context || ""),
      element("p", "scenario-instruction", config.instruction || "Choose the most appropriate action.")
    );

    const stage = element("section", "scenario-stage");
    stage.setAttribute("aria-live", "polite");
    stage.setAttribute("aria-atomic", "true");
    root.replaceChildren(intro, stage);

    function showNode(nodeId) {
      const node = config.nodes[nodeId];
      if (!node) {
        stage.replaceChildren(element("p", "feedback retry", "The next scenario step could not be found. Check the nextNode value in the configuration."));
        return;
      }
      currentNodeId = nodeId;
      decisionAttemptCount = 0;
      const panel = element("div", "scenario-step");
      panel.append(element("p", "eyebrow", node.label || node.type.toUpperCase()));

      if (node.type === "outcome") {
        complete = true;
        const outcome = element("div", "scenario-outcome");
        outcome.append(
          element("h4", "", node.title || "Scenario complete"),
          element("p", "", node.content || "")
        );
        if (node.takeaway) {
          const takeaway = element("div", "scenario-takeaway");
          takeaway.append(element("strong", "", "Key learning"), element("p", "", node.takeaway));
          outcome.append(takeaway);
        }
        outcome.append(element("p", "scenario-score", "Decisions completed: " + decisionsCompleted + " · First-try correct: " + firstTryCorrect));
        const restart = element("button", "button button-secondary", "Try the scenario again");
        restart.type = "button";
        restart.addEventListener("click", reset);
        outcome.append(restart);
        panel.append(outcome);
        stage.replaceChildren(panel);
        announce(root, "ldh:scenario-complete", { scenarioId: config.id, decisionsCompleted, firstTryCorrect, attempts });
        const heading = outcome.querySelector("h4");
        heading.tabIndex = -1;
        heading.focus();
        return;
      }

      if (node.title) panel.append(element("h4", "", node.title));
      if (node.content) panel.append(element("p", "scenario-node-content", node.content));
      if (node.prompt) panel.append(element("h4", "scenario-prompt", node.prompt));

      if (node.type === "information") {
        const next = element("button", "button button-primary", node.continueLabel || "Continue");
        next.type = "button";
        next.addEventListener("click", () => showNode(node.nextNode));
        panel.append(next);
      } else if (node.type === "decision") {
        const options = element("div", "scenario-options");
        options.setAttribute("role", "group");
        options.setAttribute("aria-label", node.prompt || "Decision options");
        const feedback = element("div", "scenario-feedback");
        feedback.hidden = true;
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        const feedbackText = element("p");
        const continueButton = element("button", "button button-primary", node.continueLabel || "Continue");
        continueButton.type = "button";
        continueButton.hidden = true;
        feedback.append(feedbackText, continueButton);

        (node.choices || []).forEach((choice) => {
          const button = element("button", "scenario-choice", choice.text);
          button.type = "button";
          button.addEventListener("click", () => {
            attempts += 1;
            decisionAttemptCount += 1;
            const correct = choice.correct === true;
            feedback.hidden = false;
            feedback.classList.toggle("is-correct", correct);
            feedbackText.textContent = choice.feedback || (correct ? "That is the appropriate decision." : "Review the situation and try again.");
            options.querySelectorAll("button").forEach((item) => {
              item.disabled = correct;
              item.classList.toggle("is-selected", item === button);
            });

            if (correct) {
              if (decisionAttemptCount === 1) firstTryCorrect += 1;
              decisionsCompleted += 1;
              continueButton.hidden = false;
              continueButton.onclick = () => showNode(choice.nextNode);
            } else {
              continueButton.hidden = true;
              options.querySelectorAll("button").forEach((item) => {
                item.disabled = false;
                item.classList.remove("is-selected");
              });
              button.focus();
            }
          });
          options.append(button);
        });

        panel.append(options, feedback);
      } else {
        panel.append(element("p", "feedback retry", "Unsupported node type: " + String(node.type)));
      }

      stage.replaceChildren(panel);
      const heading = panel.querySelector("h4");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus();
      } else {
        const firstControl = panel.querySelector("button");
        if (firstControl) firstControl.focus();
      }
    }

    function reset() {
      currentNodeId = config.startNode;
      attempts = 0;
      firstTryCorrect = 0;
      decisionsCompleted = 0;
      decisionAttemptCount = 0;
      complete = false;
      announce(root, "ldh:scenario-reset", { scenarioId: config.id });
      showNode(currentNodeId);
    }

    root.dataset.scenarioId = config.id;
    root.classList.add("scenario-shell");
    root.replaceChildren();
    showNode(currentNodeId);
  }

  document.querySelectorAll("[data-scenario-engine]").forEach((root) => {
    const configId = root.dataset.scenarioId;
    const config = configs.find((item) => item.id === configId);
    renderScenario(root, config);
  });
})();