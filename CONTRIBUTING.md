# Contribution Guidelines

These guidelines apply to people and AI tools contributing to the Learning Development Hub.

## 1. Before making changes

1. Read the root `README.md` and any project-level documentation.
2. Inspect the existing folder structure and related files.
3. Check whether an approved reusable component or template already exists.
4. Confirm the intended audience, requirements, and acceptance criteria.
5. Identify dependencies, licensing requirements, and any information that must not be shared.

## 2. General standards

- Use descriptive, consistent file and folder names.
- Keep editable source files separate from published output.
- Prefer reusable, maintainable components over duplicated code.
- Document setup steps, dependencies, and important design decisions.
- Avoid adding dependencies unless they provide clear value.
- Do not commit credentials, API keys, personal data, or confidential material.
- Use approved assets and record attribution or licensing information where required.

## 3. Learning design and course development

For each course or learning project, document where applicable:

- Business need and target audience
- Learning objectives and prerequisites
- Course outline and storyboard
- Assessment strategy and passing criteria
- Media and asset requirements
- Accessibility requirements
- LMS and SCORM requirements
- Review, approval, and release status

## 4. Web development

- Use semantic HTML and maintainable CSS.
- Keep JavaScript organized and avoid unnecessary global variables.
- Build responsive layouts for supported screen sizes.
- Provide keyboard access, visible focus states, labels, and meaningful alternative text.
- Follow WCAG 2.1 AA as a target where applicable.
- Test interactive behavior and provide useful error or feedback states.

## 5. SCORM and LMS validation

Before a course is released:

- Confirm the required SCORM version.
- Validate the package manifest and launch behavior.
- Test completion, success, score, and bookmarking behavior where applicable.
- Test the package in the intended LMS or an approved test environment.
- Record test results and known limitations.
- Do not include real learner records or confidential production data in test fixtures.

## 6. Testing and review

Before submitting a change:

- Check links, navigation, and interactive elements.
- Test supported desktop and mobile layouts.
- Check keyboard operation and accessibility basics.
- Run relevant project checks or validation tools.
- Review changed files for accidental secrets or unrelated edits.
- Update documentation and `CHANGELOG.md` when the change is significant.

## 7. AI-assisted development

AI tools must follow the same repository standards as human contributors.

- Read the relevant project instructions before proposing or making changes.
- Do not assume requirements that are not documented; ask when a decision materially affects the result.
- Do not overwrite, rename, or delete existing files without explicit approval.
- Do not publish, deploy, or change repository settings without explicit approval.
- Explain the purpose and impact of proposed changes.
- Report what was tested and what remains unverified.
- Never expose secrets, credentials, learner information, or confidential company material.

## 8. Change records

Use clear commit messages that describe the change, for example:

- `Add storyboard template for onboarding courses`
- `Fix keyboard navigation in accordion component`
- `Document SCORM 1.2 validation process`

Record significant additions, changes, fixes, and removals in `CHANGELOG.md`.
