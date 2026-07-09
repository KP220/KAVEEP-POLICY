# CORE Integration

Version: 0.1

---

## Purpose

This document defines the ownership split between `KAVEEP-CORE` and `KAVEEP-POLICY` for report-like artifacts.

`KAVEEP-CORE` owns the canonical report envelope:

```text
../KAVEEP-CORE/schemas/report-envelope.schema.json
```

`KAVEEP-POLICY` owns policy, safety, risk, approval, evidence, and convergence payloads.

---

## Ownership Split

CORE owns shared report envelope fields:

* `reportId`
* `sessionId`
* `module`
* `moduleVersion`
* `contractVersion`
* `status`
* `verificationStatus`
* `riskLevel`
* `evidenceRefs`
* `policyRefs`
* `auditRefs`
* `warnings`
* `errors`
* `metadata`
* `createdAt`
* `updatedAt`

POLICY owns report-specific payload under:

```text
metadata.policyPayload
```

POLICY does not redefine CORE envelope fields.

---

## Report Artifact Contract

Report artifacts in this repository must compose the CORE envelope with a POLICY payload:

```json
{
  "allOf": [
    { "$ref": "../../KAVEEP-CORE/schemas/report-envelope.schema.json" },
    { "properties": { "metadata": { "properties": { "policyPayload": {} } } } }
  ]
}
```

The current POLICY report artifact schema is:

```text
schemas/policy-report.schema.json
```

The example is:

```text
examples/policy-report.example.json
```

---

## Non-Report Policy Records

The following schemas are canonical POLICY records, not report envelopes:

* `schemas/risk-assessment.schema.json`
* `schemas/evidence-record.schema.json`
* `schemas/approval-request.schema.json`

They remain native POLICY contracts unless they are explicitly emitted as report artifacts.

---

## Safety Defaults

Report artifacts must preserve these defaults:

* `status` should be `no_action` when no explicit approved action exists.
* `verificationStatus` should be `unverified` when evidence is missing, inaccessible, conflicting, or insufficient.
* `auditRefs` are append-only references and must not be rewritten or deleted to alter report history.

This integration adds schema alignment only. It does not add runtime policy engine logic, enforcement logic, external API logic, or execution behavior.
