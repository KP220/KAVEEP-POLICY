# Validation

Version: 0.1

---

## Purpose

This repository validates JSON examples against their local schemas with a minimal, dependency-free Node.js script.

Run:

```text
npm.cmd run validate:examples
```

---

## Scope

The validator checks the examples in this repository:

* `examples/risk-assessment.example.json`
* `examples/examples/evidence-record.example.json`
* `examples/approval-request.example.json`
* `examples/policy-report.example.json`

The POLICY report example validates against `schemas/policy-report.schema.json`, which composes the CORE report envelope at:

```text
../KAVEEP-CORE/schemas/report-envelope.schema.json
```

---

## Non-Goals

Validation is schema-only.

It does not:

* Execute policy decisions.
* Enforce runtime behavior.
* Call external APIs.
* Delete, move, rename, overwrite, clean up, or execute user files.
