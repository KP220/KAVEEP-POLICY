# SPEC-002

# Risk Classification

Version

0.1

---

## Purpose

Define a unified risk classification model for all KAVEEP repositories, modules, and AI agents.

Every recommendation, simulation, approval request, and execution must include a risk classification.

Risk determines:

- Required evidence
- Required approval
- Allowed actions
- Logging requirements
- Rollback expectations

---

# Core Principle

Higher risk requires:

More evidence

↓

More verification

↓

Stronger approval

↓

Better logging

↓

Safer execution

---

# Risk Levels

## R0

### Observation

Read-only.

No modification.

Examples:

- Scan files
- Read repository
- Analyze logs
- Measure storage
- View metadata

Approval:

Not required.

Simulation:

Not required.

Execution:

None.

---

## R1

### Recommendation

Produces suggestions only.

Examples:

- Recommend cleanup
- Recommend optimization
- Recommend file organization
- Recommend branch cleanup

Approval:

Not required.

Simulation:

Optional.

Execution:

Forbidden.

---

## R2

### Simulation

Predicts the effect of an action without performing it.

Examples:

- Cleanup preview
- Repository impact analysis
- Storage recovery estimate
- Dependency analysis

Approval:

Not required.

Simulation:

Required.

Execution:

Forbidden.

---

## R3

### Controlled Action

Real action that is reversible.

Examples:

- Move files
- Rename files
- Create backups
- Create branches
- Open pull requests

Requirements:

Simulation required.

Human approval required.

Rollback required.

Evidence:

Medium.

---

## R4

### High Risk

Actions affecting important assets.

Examples:

- Modify repositories
- Merge pull requests
- Install software
- Remove applications
- Change system configuration
- Modify permissions

Requirements:

Simulation required.

Human approval required.

Evidence:

High.

Rollback:

Mandatory whenever possible.

---

## R5

### Critical

Irreversible or highly destructive actions.

Examples:

- Delete repositories
- Delete user files
- Force push
- Rewrite history
- Format storage
- Wipe databases
- Delete backups

Requirements:

Highest evidence.

Explicit approval.

Multi-step confirmation.

Rollback plan if technically possible.

---

# Evidence Requirements

Risk

↓

Minimum Evidence

R0

1 source

R1

2 sources

R2

2 independent sources

R3

3 independent sources

R4

4 independent sources

R5

5+ independent sources

---

# Confidence Requirement

Every recommendation should include:

Confidence Score

Example

95%

Very High

80%

High

60%

Medium

40%

Low

Below 40%

Insufficient

Low confidence must never trigger execution.

---

# Risk Metadata

Every report should include:

Risk Level

Confidence

Evidence Count

Approval Required

Rollback Available

Simulation Completed

---

# Escalation Rule

If uncertainty increases,

risk automatically increases.

Unknown information

must never decrease risk.

---

# Conflict Rule

When two risk evaluations disagree,

the higher risk wins

until more evidence is available.

---

# Repository Examples

KAVEEP-SIA

Storage Scan

↓

R0

Cleanup Recommendation

↓

R1

Cleanup Simulation

↓

R2

Move File

↓

R3

Delete File

↓

R5

---

KAVEEP-RO

Repository Scan

↓

R0

Repository Recommendation

↓

R1

PR Simulation

↓

R2

Open Pull Request

↓

R3

Merge Pull Request

↓

R4

Delete Repository

↓

R5

---

# Acceptance Criteria

Every KAVEEP module

must be able to classify

its actions

using R0–R5.

Every report

must include

its risk level.

---

# Next

SPEC-003

Approval Model
