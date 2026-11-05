# Component Library Manual QA Checklist

**Release:** 0.2  
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
