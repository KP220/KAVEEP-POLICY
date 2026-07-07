# KAVEEP-POLICY Approval Model

Version: 0.1

---

## Purpose

This document summarizes the KAVEEP approval model for developers, Codex, and future agents.

Source specification:

```text
specs/SPEC-003.md
```

---

## Core Principle

Observation is automatic.

Execution is never automatic.

Human approval is required before actions that may affect real systems, repositories, or user data.

---

## Approval Levels

```text
A0 = No approval required
A1 = Inform user
A2 = Single confirmation
A3 = Explicit approval
A4 = Critical approval
```

---

## A0 — No Approval

Used for read-only actions.

Examples:

* Scan storage
* Read repository
* Analyze logs
* Collect evidence
* Generate reports

Execution:

```text
Not applicable
```

---

## A1 — Inform User

The agent may inform the user and continue with non-executing work.

Examples:

* Produce recommendations
* Show simulations
* Generate analysis reports
* Explain possible next steps

Execution:

```text
Forbidden
```

---

## A2 — Single Confirmation

Requires one explicit user confirmation.

Examples:

* Move files
* Rename files
* Create backups
* Create branches
* Open pull requests

Valid approval examples:

```text
Yes
Approve
Continue
Proceed
```

---

## A3 — Explicit Approval

Requires clear approval after presenting:

* Action
* Reason
* Risk level
* Evidence summary
* Confidence score
* Expected impact
* Rollback plan

Examples:

* Install software
* Modify repository settings
* Merge pull requests
* Change system configuration
* Modify permissions

---

## A4 — Critical Approval

Highest approval level.

Requires:

* Explicit confirmation
* Second confirmation
* Complete risk explanation
* Complete evidence summary
* Rollback explanation
* Final user confirmation

Examples:

* Delete repositories
* Delete user files
* Format storage
* Rewrite repository history
* Delete backups
* Wipe databases

---

## Risk to Approval Mapping

```text
R0 → A0
R1 → A1
R2 → A1
R3 → A2
R4 → A3
R5 → A4
```

Policy may require stricter approval.

Policy must never require weaker approval than the risk level demands.

---

## Approval Workflow

```text
Observe
↓
Classify Risk
↓
Collect Evidence
↓
Check Convergence
↓
Run Simulation
↓
Generate Recommendation
↓
Request Approval
↓
Receive Approval
↓
Execute only if approved
↓
Verify Result
↓
Log Everything
```

---

## Approval Request Requirements

Every approval request must include:

* Action
* Reason
* Risk level
* Approval level
* Evidence summary
* Confidence score
* Expected impact
* Rollback availability
* Whether simulation was completed

---

## Approval Expiration

Approval becomes invalid if:

* Target files change
* Repository state changes
* Risk level changes
* Evidence changes
* User instruction changes
* Time-sensitive assumptions become stale
* The action differs from what was approved

Expired approval must not be reused.

A new approval request is required.

---

## Multiple Actions

Approval applies only to the requested action.

Approving one action does not approve a different action.

Example:

Approving:

```text
Rename File A
```

does not approve:

```text
Rename File B
```

---

## Batch Approval

Batch approval is allowed only when:

* All actions have identical risk
* All actions share the same purpose
* All actions share the same rollback strategy
* All actions affect the same approved target scope

Otherwise, individual approval is required.

---

## Emergency Rule

If any of the following are true:

* Required evidence is missing
* Confidence is low
* Risk is uncertain
* Simulation is incomplete
* Rollback is unclear

The agent must:

```text
Stop
↓
Explain
↓
Request more information
↓
Do not execute
```

Never guess.

---

## Human Authority

The human always has authority to:

* Approve
* Reject
* Modify
* Cancel
* Pause
* Delay

Any recommendation.

The AI must not treat silence as approval.

The AI must not treat previous approval as permanent approval.

---

## Audit Requirements

Approval logs should record:

* Timestamp
* User
* Action
* Risk level
* Approval level
* Evidence summary
* Approval result
* Execution result
* Rollback result, if applicable

---

## Final Rule

No KAVEEP agent may cross from recommendation or simulation into real execution without the approval level required by policy.
