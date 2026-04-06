# Transaction Recurrence Validation Runbook

## Purpose
Centralize the manual validation steps for feature 018-transaction-recurrence in a single runbook.

This file is for manual verification only. It does not define automated tests.

## How to Use
1. Open the app in the browser.
2. Execute the scenarios below in order, or use the matching scenario files if you prefer to split the work.
3. Record what you observed under each evidence block.
4. When a scenario fails, note the exact step and the state you saw.

## Scenario 1: Form Conditional Validation

Reference: [form-conditional-validation.md](form-conditional-validation.md)

### Steps
- Activate and deactivate recurrence in the new transaction form.
- Select `limited` and verify that `maxCycles` becomes required.
- Select `unlimited` and verify that `mode` becomes required.
- Switch between types and modes and confirm that irrelevant fields are cleared.
- Save a transaction without recurrence and confirm the original flow still works.

### Expected Outcome
- The recurrence section appears only when enabled.
- Required-field messages are shown for the active recurrence combination.
- Non-applicable values are cleared when the user changes type or mode.
- Saving without recurrence behaves exactly like the non-recurrence flow.

### Evidence
- Date:
- Browser/device:
- Result:
- Notes:

## Scenario 2: Limited Cycles

Reference: [limited-recurrence-cycles.md](limited-recurrence-cycles.md)

### Steps
- Create a `limited` recurrence with a valid `maxCycles` value.
- Confirm that generation starts on the next monthly cycle.
- Reopen the dashboard and confirm that already processed cycles are not duplicated.
- Verify that exactly the configured number of cycles is generated.
- Verify that no new cycle appears after the limit is reached.

### Expected Outcome
- The first occurrence starts on the next cycle after creation.
- The rule stops generating after reaching `maxCycles`.
- Reconciliation is idempotent across repeated loads.

### Evidence
- Date:
- Rule ID:
- Expected cycles:
- Observed cycles:
- Result:
- Notes:

## Scenario 3: Unlimited Automatic Idempotency

Reference: [unlimited-automatic-idempotency.md](unlimited-automatic-idempotency.md)

### Steps
- Create an `unlimited` recurrence in `automatic` mode.
- Calculate the expected projection horizon.
- Confirm that the projected months reach the expected horizon.
- Reload the dashboard and verify that already projected cycles do not duplicate.
- Confirm logical uniqueness by `ruleId + monthRef`.
- If applicable, simulate a later reference date and verify the projection window extends.

### Expected Outcome
- Projection reaches the longest required horizon.
- Repeated reconciliation does not create duplicate transactions.
- Projection window extends when the current window is reached.

### Evidence
- Date:
- Rule ID:
- Expected horizon:
- Observed horizon:
- Result:
- Notes:

## Scenario 4: Unlimited Manual Pending Confirmations

Reference: [unlimited-manual-pending-confirmation.md](unlimited-manual-pending-confirmation.md)

### Steps
- Create an `unlimited` recurrence in `manual` mode.
- Confirm that one pending item is created per monthly cycle.
- Confirm one pending item and verify that it becomes an effective transaction.
- Cancel another pending item and verify that it stays canceled in the same cycle.
- Trigger confirm/cancel conflict and verify that the first terminal action wins.
- Disable the rule and verify that existing pendings remain available while new cycles stop.
- Edit or remove the base transaction and verify the recurrence rule remains independent.

### Expected Outcome
- Each cycle creates at most one pending item.
- Confirmed pendings appear in dashboard/history as effective transactions.
- Canceled pendings do not reappear in the same cycle.
- Existing pendings preserve their snapshot even after rule edits.

### Evidence
- Date:
- Pending IDs:
- Confirmed IDs:
- Canceled IDs:
- Result:
- Notes:

## Scenario 5: Day Fallback 29/30/31

Reference: [day-fallback-29-30-31.md](day-fallback-29-30-31.md)

### Steps
- Create a recurrence with `dayOfMonth=31` and test a 30-day month.
- Create a recurrence with `dayOfMonth=31` and test February in a non-leap year.
- Create a recurrence with `dayOfMonth=30` and test February in a non-leap year.
- If applicable, test February in a leap year.
- Verify that `monthRef` stays unchanged and only the due date is adjusted.

### Expected Outcome
- The transaction lands on the last valid day of the target month.
- No blocking error occurs during creation or reconciliation.

### Evidence
- Date:
- Test month/year:
- Expected due dates:
- Observed due dates:
- Result:
- Notes:

## Scenario 6: Dashboard and History Impact

Reference: [dashboard-history-impact.md](dashboard-history-impact.md)

### Steps
- Create an `unlimited manual` rule and verify that the pending item does not change dashboard totals.
- Confirm the pending item and verify that it appears in transaction history.
- Cancel a different pending item and verify that it is not counted as effective.
- Confirm that refresh completes after confirm/cancel within one invalidate + reload cycle.
- Verify the recurring source marker in history where applicable.

### Expected Outcome
- Only effective transactions affect totals.
- Pending transactions do not change the dashboard before confirmation.
- Confirm/cancel actions update the views after the persisted state is committed.

### Evidence
- Date:
- Pending IDs:
- Dashboard before:
- Dashboard after:
- History before:
- History after:
- Result:
- Notes:

## Final Notes
- If any scenario fails, keep the failed step and the exact UI/storage state in the evidence block.
- Use the individual scenario files as supporting checklists when you need a narrower run.