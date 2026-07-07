# SPEC-003

# Approval Model

Version

0.1

---

## Purpose

Define the approval workflow required before any KAVEEP agent performs actions beyond observation.

Approval protects the user by ensuring that important actions cannot be executed solely by AI.

---

# Core Principle

Observation is automatic.

Execution is never automatic.

Human approval is the default requirement for all actions that may affect real systems, repositories, or user data.

---

# Approval Levels

## A0 — No Approval

Used for:

- Read-only observation
- Risk analysis
- Evidence collection
- Reporting

Examples:

- Scan storage
- Read repository
- Analyze logs

Execution:

Not applicable.

---

## A1 — Inform User

The AI may continue automatically after informing the user.

Examples:

- Generate reports
- Produce recommendations
- Show simulations

Execution:

None.

---

## A2 — Single Confirmation

Requires one explicit user confirmation.

Examples:

- Move files
- Rename files
- Create backups
- Open pull requests

Example confirmation:

"Yes"

"Approve"

"Continue"

---

## A3 — Explicit Approval

Requires clear approval after presenting:

- Risk
- Evidence
- Expected impact
- Rollback plan

Examples:

- Install software
- Modify repository settings
- Merge pull requests
- Change system configuration

---

## A4 — Critical Approval

Highest approval level.

Requires:

- Explicit confirmation
- Second confirmation
- Complete risk explanation
- Complete evidence summary

Examples:

- Delete repositories
- Delete user files
- Format storage
- Rewrite repository history

---

# Approval Workflow

```text
Observe
↓
Classify Risk
↓
Collect Evidence
↓
Run Simulation
↓
Generate Recommendation
↓
Request Approval
↓
Receive Approval
↓
Execute
↓
Verify Result
↓
Log Everything
```

---

# Approval Rules

Every approval request must include:

- Action
- Reason
- Risk Level
- Evidence Summary
- Confidence Score
- Expected Impact
- Rollback Availability

---

# Approval Expiration

Approvals are temporary.

If the environment changes before execution:

Approval becomes invalid.

The approval process must restart.

---

# Multiple Actions

Approval applies only to the requested actions.

Approving:

Rename File A

does not approve:

Rename File B

---

# Batch Approval

Batch approval may be allowed only when:

- All actions have identical risk
- Same rollback strategy
- Same target
- Same purpose

Otherwise:

Individual approval is required.

---

# Emergency Rule

If:

- Required evidence is missing
- Confidence is low
- Risk is uncertain

The AI must:

Stop.

Explain.

Request more information.

Never guess.

---

# Human Authority

The human always has the authority to:

Approve

Reject

Modify

Cancel

Pause

Delay

Any recommendation.

---

# Audit Requirements

Approval logs must record:

Timestamp

User

Action

Risk

Evidence

Approval Level

Execution Result

Rollback Result

---

# Relationship to Risk

Suggested mapping:

R0 → A0

R1 → A1

R2 → A1

R3 → A2

R4 → A3

R5 → A4

Policy may require stricter approval.

Never weaker approval.

---

# Acceptance Criteria

Every executable action

must know

its required approval level.

Every approval request

must provide

enough information

for an informed human decision.

---

# Next

SPEC-004

Evidence & Convergence
