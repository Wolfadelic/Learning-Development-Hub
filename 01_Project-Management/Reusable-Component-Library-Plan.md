# Reusable Interactive Learning Component Library

**Status:** Foundation implementation  
**Theme:** Hybrid — light learning canvas with dark navigation and header  
**Preview target:** GitHub Pages (manual deployment)  
**Source location:** `06_Web-Components/component-library/`

## 1. Purpose

Create a small, reusable collection of browser-based learning interactions that can be previewed from GitHub and later adapted for approved course projects. The first release is a technology-neutral demonstration using synthetic example content.

## 2. Outcomes

- Establish a consistent visual system for interactive learning content.
- Provide accessible, responsive interaction patterns that can be reused across courses.
- Keep HTML, CSS, and JavaScript separate and dependency-free.
- Provide a browser preview path without requiring local installations.
- Create a documented foundation for future assessment and SCORM integration.

## 3. Initial component scope

| Component | Learner purpose | Expected behaviour |
|---|---|---|
| Accordion | Explore grouped information | Expand/collapse sections; keyboard accessible |
| Tabs | Compare related content | Switch panels; keyboard support |
| Flashcards | Recall key concepts | Reveal and hide the answer |
| Knowledge check | Practise a decision | Select one answer and receive explanatory feedback |
| Progress indicator | Understand activity progress | Update as learning interactions are completed |

## 4. Design system

- **Canvas:** warm, near-white background.
- **Navigation/header:** deep navy.
- **Primary accent:** blue.
- **Secondary accent:** green for completion and positive feedback.
- **Typography:** system font stack; no remote font dependency.
- **Layout:** responsive, card-based, generous spacing, clear hierarchy.
- **Interaction:** visible focus states, clear labels, meaningful feedback, reduced-motion support.

## 5. Technical approach

- Semantic HTML5.
- CSS custom properties and responsive layout.
- Vanilla JavaScript; no package manager or build step.
- No remote scripts, trackers, APIs, or third-party dependencies.
- GitHub Pages preview through a manually triggered GitHub Actions workflow.
- Source files remain in the repository; the workflow publishes only this component-library directory.

## 6. Acceptance criteria

1. The page loads in a modern desktop and mobile browser.
2. All five components work using mouse, keyboard, and touch.
3. Knowledge-check feedback explains why an answer is correct or incorrect.
4. Progress updates when a flashcard is revealed and the knowledge check is submitted.
5. Layout remains usable at narrow viewport widths.
6. No external runtime dependency is required.
7. The repository includes usage and preview instructions.
8. Accessibility is reviewed against WCAG 2.1 AA expectations; formal conformance is not claimed until tested.

## 7. Implementation sequence

1. Establish the project folder and this brief.
2. Build the semantic page structure.
3. Add hybrid theme tokens and responsive component styles.
4. Implement interactions and state updates in plain JavaScript.
5. Review keyboard behaviour, labels, focus, feedback, and reduced motion.
6. Preview through GitHub Pages after enabling Pages with GitHub Actions.
7. Record browser and accessibility test results.
8. Reuse the patterns in a pilot course after content-owner approval.

## 8. Risks and controls

- **Public repository exposure:** keep this demo generic and synthetic. Do not add company or learner information until repository visibility and company approval are addressed.
- **GitHub Pages exposure:** published pages are publicly reachable for a public repository. Do not publish confidential content.
- **LMS integration:** this first release is a component demonstration, not a SCORM package. SCORM tracking and LMS validation are separate future work.
- **Storyline integration:** this source does not replace Storyline 360 authoring or publishing.

## 9. Release boundary

This project creates source files and a manual preview workflow. It does not change repository visibility, enable GitHub Pages, trigger a deployment, or claim formal accessibility certification.
