# KAVEEP-POLICY Risk Classification

Version: 0.1

---

## Purpose

This document summarizes the KAVEEP risk classification model for developers, Codex, and future agents.

Source specification:

```text
specs/SPEC-002.md
```

---

## Core Principle

Higher risk requires:

```text
More evidence
↓
More verification
↓
Stronger approval
↓
Better logging
↓
Safer execution
```

Risk must be classified before recommendation, simulation, approval request, or execution.

---

## Risk Levels

```text
R0 = Read-only observation
R1 = Recommendation
R2 = Simulation
R3 = Controlled reversible action
R4 = High-risk action
R5 = Critical or destructive action
```

---

## R0 — Read-only Observation

Read-only behavior.

No modification.

Examples:

* Scan files
* Read repositories
* Analyze logs
* View metadata
* Inspect specifications
* Generate reports

Approval:

```text
A0 = No approval required
```

Execution:

```text
None
```

Allowed by default if it does not expose private data outside the approved context.

---

## R1 — Recommendation

Produces suggestions only.

No real-world change.

Examples:

* Recommend cleanup
* Recommend optimization
* Recommend file organization
* Recommend branch cleanup
* Recommend architecture improvement

Approval:

```text
A1 = Inform user
```

Execution:

```text
Forbidden
```

Recommendation must not be treated as approval.

---

## R2 — Simulation

Predicts the effect of an action without performing it.

Examples:

* Cleanup preview
* Repository impact analysis
* Storage recovery estimate
* Dependency analysis
* Pull request impact preview

Approval:

```text
A1 = Inform user
```

Execution:

```text
Forbidden
```

Simulation must not modify real files, repositories, or system state.

---

## R3 — Controlled Reversible Action

A real action that is intended to be reversible.

Examples:

* Move files
* Rename files
* Create backups
* Create branches
* Open pull requests

Approval:

```text
A2 = Single confirmation
```

Requirements:

* Simulation required
* Human approval required
* Rollback required when technically possible
* Audit logging required

---

## R4 — High-risk Action

Actions affecting important assets or system behavior.

Examples:

* Modify repositories
* Merge pull requests
* Install software
* Remove applications
* Change system configuration
* Modify permissions

Approval:

```text
A3 = Explicit approval
```

Requirements:

* Strong evidence
* Simulation required
* Human approval required
* Rollback plan required when technically possible
* Audit logging required

---

## R5 — Critical or Destructive Action

Irreversible or highly destructive actions.

Examples:

* Delete repositories
* Delete user files
* Force push
* Rewrite history
* Format storage
* Wipe databases
* Delete backups

Approval:

```text
A4 = Critical approval
```

Requirements:

* Highest evidence
* Multi-step confirmation
* Complete risk explanation
* Complete evidence summary
* Rollback plan if technically possible
* Audit logging mandatory

Some R5 actions may remain forbidden even with approval if they violate policy.

---

## Evidence Requirements

```text
R0 = 1 source
R1 = 2 sources
R2 = 2 independent sources
R3 = 3 independent sources
R4 = 4 independent sources
R5 = 5+ independent sources
```

The higher the risk, the stronger the required evidence.

---

## Risk Metadata

Every report or proposal should include:

* Risk level
* Confidence score
* Evidence count
* Approval required
* Rollback available
* Simulation completed
* Execution allowed or forbidden

---

## Confidence Requirement

Confidence is not truth.

Confidence measures how strongly available evidence supports the conclusion.

Suggested scale:

```text
95%+ = Very High
80%+ = High
60%+ = Medium
40%+ = Low
Below 40% = Insufficient
```

Low confidence must never trigger execution.

---

## Escalation Rule

If uncertainty increases, risk increases.

Unknown information must never decrease risk.

When in doubt, classify higher.

---

## Conflict Rule

When two risk evaluations disagree, the higher risk wins until more evidence is available.

Do not average risk levels.

Do not guess.

---

## SIA Examples

```text
Storage scan             → R0
Cleanup recommendation   → R1
Cleanup simulation       → R2
Move file                → R3
Delete file              → R5
```

---

## RO Examples

```text
Repository scan           → R0
Repository recommendation → R1
Pull request simulation   → R2
Open pull request         → R3
Merge pull request        → R4
Delete repository         → R5
```

---

## Final Rule

No action may be recommended, approved, or executed until its risk level is classified.
