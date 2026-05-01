# ADR-001: Make adversarial scenarios replayable and explicit

## Status
Accepted

## Context

Ad-hoc red-team prompts and one-off tests are difficult to compare, audit, and benchmark.

## Decision

Represent scenarios as explicit, replayable artifacts with category, objective, expected safe behavior, and evaluation criteria.

## Consequences

### Positive

- reproducible testing
- benchmark comparability
- clearer documentation of safety expectations

### Negative

- more upfront modeling work
- requires curation of scenario packs over time
