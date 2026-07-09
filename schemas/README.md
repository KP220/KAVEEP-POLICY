# KAVEEP-POLICY Schemas

This directory contains POLICY-owned JSON Schema contracts.

## Canonical POLICY Records

These schemas are native POLICY records:

* `risk-assessment.schema.json`
* `evidence-record.schema.json`
* `approval-request.schema.json`

They are not CORE report envelopes.

## Report Artifacts

`policy-report.schema.json` is the POLICY report artifact contract.

It composes:

* `../../KAVEEP-CORE/schemas/report-envelope.schema.json`
* POLICY-specific payload under `metadata.policyPayload`

Report artifacts preserve `no_action` as the safe default and `unverified` for insufficient evidence. `auditRefs` remain append-only references.
