# Reusable Learning Components

A dependency-free demonstration library of interactive learning patterns.

## Contents

- `index.html` — semantic demo page and sample content.
- `styles.css` — hybrid theme, component styling, and responsive layout.
- `app.js` — tab, flashcard, knowledge-check, and progress interactions.

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
