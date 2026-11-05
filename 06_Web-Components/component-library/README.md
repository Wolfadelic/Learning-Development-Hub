# Reusable Learning Components

A dependency-free demonstration library of interactive learning patterns.

## Contents

- `index.html` — semantic demo page and sample content.
- `styles.css` — hybrid theme, component styling, and responsive layout.
- `app.js` — tab, flashcard, knowledge-check, shared progress and scenario event integration.
- `scenario-engine.js` — reusable renderer and interaction engine for configured scenarios.
- `scenario-config.js` — editable scenario content, decision nodes, feedback, branches and outcomes.

## Configurable scenario engine

The scenario engine separates the content from the interaction code:

- Edit `scenario-config.js` to add or revise scenario definitions.
- Keep the renderer and decision logic in `scenario-engine.js`.
- Add a mount element with `data-scenario-engine` and a matching `data-scenario-id` in the page.
- The engine supports decision nodes, information nodes, branching destinations, correct/incorrect feedback, retry paths, final outcomes, key learning takeaways, restart, and completion events.
- Each scenario needs a unique `id`, a valid `startNode`, and a `nodes` object. Each decision choice needs a unique `id`, display `text`, a Boolean `correct`, feedback, and a `nextNode` when correct.
- A decision can offer more than one correct option, allowing a valid alternate path.
- An information node uses `type: "information"`, `content`, `continueLabel`, and `nextNode`.
- An outcome node uses `type: "outcome"`, `title`, `content`, and optional `takeaway`.

### Add another scenario

1. Add a new object to the `window.LDH_SCENARIO_CONFIGS` array in `scenario-config.js`.
2. Give it a unique ID and a valid starting node.
3. Define each decision, information node, and outcome under `nodes`.
4. Add a mount element in `index.html` using the new scenario ID.
5. Run the GitHub Pages workflow and test every branch, retry, completion, and restart path.

Use plain text in configuration fields. The engine inserts content as text rather than interpreting it as HTML. Do not put confidential client, employee, or learner data in scenarios.

The included eBilling rate-rejection scenario is fictional. Actual rate changes must follow the organisation's approved matter-maintenance and review procedures.

## Run the demo

No local installation, package manager, build step, or external library is required.

- Open `index.html` in a browser if you have downloaded the folder.
- Or use the GitHub Pages preview after the repository owner enables Pages and manually runs the workflow.

## GitHub Pages preview

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open **Actions → Publish component library preview**.
4. Select **Run workflow** and run it from the `main` branch.
5. When the run succeeds, open the published Pages URL shown in the workflow summary.

The workflow publishes only this directory. It is manual by design; normal commits do not automatically publish a new preview.

## Manual quality check

Before treating a preview as ready for reuse:

1. Open the page at desktop width and at a narrow mobile width.
2. Use only the keyboard: Tab, Shift+Tab, Enter, Space, Left/Right arrows, Home, and End.
3. Confirm the skip link moves focus to the main content.
4. Open and close every accordion section.
5. Move through the tabs with arrow keys and confirm only the selected panel is exposed.
6. Reveal and hide the flashcard answer.
7. Submit the knowledge check without an answer, with a wrong answer, and with the correct answer.
8. Confirm progress changes only for completed activities.
9. Check browser console output for errors.
10. Repeat with browser zoom at 200%.

Record browser, device/viewport, test date, results, and defects in the repository QA checklist. These checks are manual and do not replace screen-reader or formal accessibility testing.

## Reuse

Copy the relevant markup pattern into an approved course project and adapt its text and labels. Keep the matching CSS and JavaScript behaviour together. Change identifiers when using multiple instances on one page.

## Accessibility notes

The demo includes semantic headings, a skip link, labelled controls, tab roles and keyboard support, visible focus styling, live feedback, and reduced-motion handling. These are implementation intentions, not a formal WCAG conformance claim. Test with keyboard-only navigation and a screen reader before production use.

## Scope and limitations

- Demonstration content is synthetic.
- This is not a SCORM package and does not communicate with an LMS.
- Progress is held only in the current browser page and is not saved.
- No analytics, tracking, or external network requests are included.
- GitHub Pages is a public website. Do not publish confidential company, client, employee, or learner information.
