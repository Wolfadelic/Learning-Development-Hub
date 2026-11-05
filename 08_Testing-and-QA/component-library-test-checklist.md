# Component Library Manual QA Checklist

**Release:** 0.4  
**Status:** Pending hands-on browser verification

Record browser and version, operating system, viewport size, date, tester, result, and defect reference. Do not mark a test passed until it has been performed.

## Functional checks

- [ ] Page and local assets load without errors.
- [ ] Accordion sections open and close.
- [ ] Tabs switch by click.
- [ ] Tabs switch with Left/Right arrows, Home, and End.
- [ ] Tab selection and panel visibility remain synchronised.
- [ ] Flashcard reveals and hides its answer.
- [ ] Knowledge check prompts when no answer is selected.
- [ ] Incorrect answer gives constructive guidance.
- [ ] Correct answer gives explanatory feedback.
- [ ] Progress updates when the flashcard is first revealed.
- [ ] Progress updates after a correct answer and reverses if a later answer is incorrect.

## Scenario interaction checks

- [ ] Scenario begins at decision one.
- [ ] Each incorrect choice provides an explanation and allows another attempt.
- [ ] Correct choices unlock the next decision.
- [ ] Focus moves to the next decision heading.
- [ ] Final outcome appears after the second correct decision.
- [ ] Completing the scenario updates the progress indicator.
- [ ] Restart returns to decision one and clears scenario completion.

## User-reported scenario test results — 2026-11-05

The user manually tested the deployed scenario and reported the following outcomes:

| Test | Result | Notes |
|---|---|---|
| Incorrect choice allows retry | Pass | Retry was available after an incorrect selection. |
| Completing both decisions updates progress | Pass | Progress indicator changed after scenario completion. |
| Restart returns to decision one | Pass | Scenario returned to the first decision. |
| Restart clears scenario completion | Pass | Progress indicator changed after selecting “Try the scenario again”. |

**Interpretation:** The progress change on restart is expected. The scenario's completion is removed from the total, while any other completed activities remain counted. For example, if all three activities were complete before restart, the expected result is 2 of 3 complete afterward—not 0 of 3.

Browser version, device viewport, and screen-reader behaviour were not recorded in this test report. Other accessibility and responsive checks remain pending.

## Configurable scenario engine checks

- [ ] Scenario is loaded by its configured ID.
- [ ] Introduction, role, context, and instructions display from configuration.
- [ ] Each decision choice displays the configured text.
- [ ] Incorrect choices show the configured feedback and can be retried.
- [ ] Correct choices show feedback and navigate to the configured next node.
- [ ] Alternate correct choices reach their own configured branches.
- [ ] Information nodes display content and continue to the configured next node.
- [ ] Outcome nodes display the configured title, content, and takeaway.
- [ ] Completion event updates the shared progress indicator.
- [ ] Restart returns to the configured start node and clears scenario completion.
- [ ] A missing node ID displays a safe configuration error rather than breaking the page.
- [ ] Configured text is rendered as text, not interpreted as HTML.

## Accessibility checks

- [ ] Skip link is visible on keyboard focus and moves to main content.
- [ ] All interactive controls can be reached and operated by keyboard.
- [ ] Focus indicator is visible.
- [ ] Tab controls expose selected state and associated panel.
- [ ] Feedback is announced by assistive technology.
- [ ] Content remains understandable at 200% browser zoom.
- [ ] Reduced-motion preference is respected.
- [ ] Contrast is checked with an approved contrast checker.
- [ ] Screen-reader review is completed with a supported browser/screen-reader pair.

## Responsive checks

- [ ] Desktop layout (minimum 1280 px wide).
- [ ] Tablet layout (around 768 px wide).
- [ ] Mobile layout (around 375 px wide).
- [ ] No horizontal page scrolling at supported widths.
- [ ] Text and controls remain readable and usable.

## Results

| Date | Browser / version | Viewport | Tester | Passed / total | Defects |
|---|---|---|---|---|---|
| Not yet tested | — | — | — | — | — |

## Release decision

Do not describe this component library as accessibility-certified or production-ready until the relevant checks have been completed and defects resolved.
