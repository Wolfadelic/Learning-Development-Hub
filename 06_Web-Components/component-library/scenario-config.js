/* Scenario content only. Edit this file to create or revise scenarios. */
window.LDH_SCENARIO_CONFIGS = [
  {
    id: "ebilling-rate-rejection",
    title: "The rejected invoice",
    role: "EBILLING ASSOCIATE",
    description: "A client has rejected an invoice because the timekeeper rate does not match its records. The invoice is due for resubmission today.",
    context: "The matter profile shows $400 per hour. The client's rejection note refers to an approved rate of $425 per hour. You have not yet confirmed whether the approval document is available.",
    instruction: "Choose an action. Incorrect choices include a reason and let you try again. Some decisions lead to different follow-up situations.",
    startNode: "verify-approval",
    nodes: {
      "verify-approval": {
        type: "decision",
        label: "DECISION 1",
        prompt: "What should you do first?",
        choices: [
          {
            id: "change-now",
            text: "Change the rate to $425 and resubmit immediately.",
            correct: false,
            feedback: "Changing a rate before checking its approval and effective date could create an unsupported billing change. Verify the source information first."
          },
          {
            id: "verify",
            text: "Review the rejection details and verify the approved rate, effective date, and supporting approval.",
            correct: true,
            feedback: "Correct. Verify the source approval and its effective date before changing billing data. This protects the matter record and the invoice.",
            nextNode: "update-matter"
          },
          {
            id: "override",
            text: "Override the rate on this invoice so it can meet today's deadline.",
            correct: false,
            feedback: "An invoice-only override may hide the underlying matter setup issue and bypass required controls. Investigate the cause before making a correction."
          },
          {
            id: "approval-missing",
            text: "The approval cannot be located. Pause the correction and request confirmation from the authorised billing contact.",
            correct: true,
            feedback: "That is the appropriate control when the source approval is unavailable. Do not guess or change the rate without evidence.",
            nextNode: "await-confirmation"
          }
        ]
      },
      "await-confirmation": {
        type: "information",
        label: "ALTERNATE PATH",
        title: "Approval needs confirmation",
        content: "Record the rejection details, keep the invoice on hold in line with the team's procedure, and request the approval record or written confirmation from the authorised billing contact. Once the approved rate and effective date are confirmed, continue to the matter correction.",
        continueLabel: "Approval confirmed — continue",
        nextNode: "update-matter"
      },
      "update-matter": {
        type: "decision",
        label: "DECISION 2",
        prompt: "The approved rate of $425 per hour is now confirmed, effective from the start of the current billing period. The matter profile still shows $400. What should you do next?",
        choices: [
          {
            id: "skip-validation",
            text: "Update the matter rate and resubmit without checking the invoice lines.",
            correct: false,
            feedback: "The correction is incomplete until the affected invoice details are checked. Validate the relevant time entries, rates, and invoice output before resubmission."
          },
          {
            id: "invoice-only",
            text: "Leave the matter profile unchanged and manually edit only the rejected invoice.",
            correct: false,
            feedback: "An invoice-only edit may leave the matter setup inconsistent and cause repeat rejections. Follow the approved matter-maintenance process."
          },
          {
            id: "approved-process",
            text: "Follow the approved rate-maintenance process, update the matter details with the correct effective date, then validate the invoice before resubmission.",
            correct: true,
            feedback: "Correct. Use the authorised process, preserve the effective date, and validate the affected invoice details before resubmitting.",
            nextNode: "resolved"
          }
        ]
      },
      "resolved": {
        type: "outcome",
        label: "SCENARIO COMPLETE",
        title: "Resolve the cause before resubmitting.",
        content: "You verified the approval, corrected the matter setup through the approved process, and validated the invoice before resubmission.",
        takeaway: "Do not treat a rejected invoice as an isolated data-entry problem. Verify the source approval, effective date, matter setup, and invoice details. Keep a clear record of the correction and follow the required review process."
      }
    }
  }
];
