import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const validations = [
  ["schemas/risk-assessment.schema.json", "examples/risk-assessment.example.json"],
  ["schemas/evidence-record.schema.json", "examples/examples/evidence-record.example.json"],
  ["schemas/approval-request.schema.json", "examples/approval-request.example.json"],
  ["schemas/policy-report.schema.json", "examples/policy-report.example.json"]
];

const schemaCache = new Map();

function readJson(relativePath) {
  const absolutePath = path.resolve(rootDir, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function loadSchema(schemaPath) {
  const absolutePath = path.resolve(rootDir, schemaPath);
  if (!schemaCache.has(absolutePath)) {
    schemaCache.set(absolutePath, JSON.parse(fs.readFileSync(absolutePath, "utf8")));
  }
  return schemaCache.get(absolutePath);
}

function resolveRef(ref, baseSchemaPath) {
  if (ref.startsWith("#/")) {
    const schema = loadSchema(baseSchemaPath);
    return [resolvePointer(schema, ref.slice(1)), baseSchemaPath];
  }

  const [filePart, pointer = ""] = ref.split("#");
  const absolutePath = path.resolve(path.dirname(path.resolve(rootDir, baseSchemaPath)), filePart);
  const schema = loadSchema(absolutePath);
  return [pointer ? resolvePointer(schema, pointer) : schema, absolutePath];
}

function resolvePointer(value, pointer) {
  return pointer
    .split("/")
    .filter(Boolean)
    .reduce((current, part) => current[part.replaceAll("~1", "/").replaceAll("~0", "~")], value);
}

function validate(schema, value, location, schemaPath) {
  const errors = [];

  if (schema.$ref) {
    const [resolved, resolvedPath] = resolveRef(schema.$ref, schemaPath);
    errors.push(...validate(resolved, value, location, resolvedPath));
  }

  for (const item of schema.allOf ?? []) {
    errors.push(...validate(item, value, location, schemaPath));
  }

  if (schema.type) {
    const type = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!type.some((candidate) => matchesType(candidate, value))) {
      errors.push(`${location} must be ${type.join(" or ")}`);
      return errors;
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${location} must be one of ${schema.enum.join(", ")}`);
  }

  if (schema.pattern && typeof value === "string") {
    const pattern = new RegExp(schema.pattern);
    if (!pattern.test(value)) errors.push(`${location} must match ${schema.pattern}`);
  }

  if (schema.minLength !== undefined && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${location} must have length >= ${schema.minLength}`);
  }

  if (schema.minimum !== undefined && typeof value === "number" && value < schema.minimum) {
    errors.push(`${location} must be >= ${schema.minimum}`);
  }

  if (schema.maximum !== undefined && typeof value === "number" && value > schema.maximum) {
    errors.push(`${location} must be <= ${schema.maximum}`);
  }

  if (schema.format === "date-time" && typeof value === "string" && Number.isNaN(Date.parse(value))) {
    errors.push(`${location} must be a date-time`);
  }

  if (schema.type === "array" && Array.isArray(value)) {
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) {
      errors.push(`${location} must contain unique items`);
    }

    if (schema.items) {
      value.forEach((item, index) => {
        errors.push(...validate(schema.items, item, `${location}[${index}]`, schemaPath));
      });
    }
  }

  if (schema.type === "object" && isPlainObject(value)) {
    for (const required of schema.required ?? []) {
      if (!Object.hasOwn(value, required)) errors.push(`${location}.${required} is required`);
    }

    const properties = schema.properties ?? {};
    for (const [key, propertyValue] of Object.entries(value)) {
      if (properties[key]) {
        errors.push(...validate(properties[key], propertyValue, `${location}.${key}`, schemaPath));
      } else if (schema.additionalProperties === false) {
        errors.push(`${location}.${key} is not allowed`);
      }
    }
  }

  return errors;
}

function matchesType(type, value) {
  if (type === "array") return Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "object") return isPlainObject(value);
  return typeof value === type;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

let failed = false;

for (const [schemaPath, examplePath] of validations) {
  const schema = loadSchema(schemaPath);
  const example = readJson(examplePath);
  const errors = validate(schema, example, examplePath, schemaPath);

  if (errors.length > 0) {
    failed = true;
    console.error(`FAIL ${examplePath}`);
    for (const error of errors) console.error(`  - ${error}`);
  } else {
    console.log(`OK   ${examplePath}`);
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("All examples validated.");
}
