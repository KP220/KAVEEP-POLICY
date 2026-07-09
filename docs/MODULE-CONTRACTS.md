# Module Contracts

Version: 0.1

---

## Purpose

This document summarizes the JSON contracts owned by `KAVEEP-POLICY`.

---

## Canonical POLICY Records

These contracts define POLICY-owned records. They are not forced into the CORE report envelope.

| Schema | Purpose |
| --- | --- |
| `schemas/risk-assessment.schema.json` | Classifies proposed actions using POLICY risk levels R0-R5. |
| `schemas/evidence-record.schema.json` | Records evidence metadata and confidence contribution. |
| `schemas/approval-request.schema.json` | Describes human approval requirements for proposed actions. |

Examples:

* `examples/risk-assessment.example.json`
* `examples/examples/evidence-record.example.json`
* `examples/approval-request.example.json`

---

## POLICY Report Artifact

`schemas/policy-report.schema.json` is the report-like contract for this repository.

It uses:

* CORE-owned envelope fields from `../KAVEEP-CORE/schemas/report-envelope.schema.json`
* POLICY-owned details under `metadata.policyPayload`

The example report artifact is:

```text
examples/policy-report.example.json
```

---

## Contract Boundaries

POLICY contracts describe governance state. They do not execute actions.

Report artifacts may summarize policy alignment, evidence status, approval posture, or integration status, but they must not add runtime enforcement, external API behavior, deletion, move, rename, overwrite, cleanup, or execution behavior.

When evidence is insufficient, report artifacts must remain `unverified` and use `no_action` as the safe default.
