# Next Steps

Version: 0.1

---

## Contract Alignment

1. Keep `schemas/policy-report.schema.json` aligned with the CORE report envelope.
2. Keep POLICY-specific report fields under `metadata.policyPayload`.
3. Leave canonical POLICY records in their native schemas unless a separate report artifact is required.

---

## Validation

Run example validation before publishing contract changes:

```text
npm.cmd run validate:examples
```

Validation is local and schema-focused. It does not run policy engines, enforce actions, call external APIs, or perform destructive operations.

---

## Future Work

Potential future schema work:

* Add more POLICY report examples for approval review and evidence convergence summaries.
* Add compatibility notes when CORE publishes a new report envelope version.
* Add migration guidance only when an existing report artifact changes shape.

Do not add runtime policy engine logic, enforcement logic, external API logic, or execution behavior as part of report contract alignment.
