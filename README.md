# Adversary Forge

![CI](https://github.com/Brainfeed-1996/adversary-forge/actions/workflows/ci.yml/badge.svg)

AI red-team and defense evaluation framework for LLM applications, autonomous agents, tool-using copilots, and memory-aware AI systems.

Adversary Forge is a production-minded security evaluation platform for measuring how AI systems behave under realistic adversarial pressure. It focuses on repeatable attack scenarios, traceable evaluation pipelines, rigorous reporting, and decision-useful benchmarking so teams can answer a hard question with evidence: **is this AI system actually safe enough for the capability we are about to ship?**

---

## Table of contents

- [Why this exists](#why-this-exists)
- [What this project demonstrates](#what-this-project-demonstrates)
- [Problem statement](#problem-statement)
- [Design goals](#design-goals)
- [Non-goals](#non-goals)
- [System architecture](#system-architecture)
- [Evaluation lifecycle](#evaluation-lifecycle)
- [Threat classes covered](#threat-classes-covered)
- [Core capabilities](#core-capabilities)
- [Scenario model](#scenario-model)
- [Reporting model](#reporting-model)
- [Repository structure](#repository-structure)
- [Key engineering choices](#key-engineering-choices)
- [Example use cases](#example-use-cases)
- [Operational workflow](#operational-workflow)
- [Metrics that matter](#metrics-that-matter)
- [Security and safety posture](#security-and-safety-posture)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Why this belongs in a high-signal portfolio](#why-this-belongs-in-a-high-signal-portfolio)
- [License](#license)

---

## Why this exists

Most AI security discussions are still too qualitative.

Teams say things like:

- “we tested prompt injection”
- “we have a safety layer”
- “the agent is sandboxed”
- “we ran a few red-team prompts”

That is not enough.

Modern AI systems are not just chat interfaces. They are connected systems with:

- tools and side effects
- memory and retrieval layers
- private and regulated data access
- approval workflows
- execution loops that can compound errors
- model upgrades that silently shift behavior

Adversary Forge exists to make these systems **measurable, replayable, and comparable** under adversarial conditions.

## What this project demonstrates

This repository is intentionally shaped as a flagship portfolio project. It demonstrates:

- applied AI security engineering
- evaluation system design
- reproducible experimentation
- trace-oriented backend architecture
- developer tooling and framework design
- benchmark methodology and scoring systems
- clean technical writing through ADRs and formal docs

In other words, it is not just “an app”. It is an engineering artifact that shows how to think about AI systems the way platform, reliability, and security engineers do.

## Problem statement

AI application teams need a practical way to:

1. describe adversarial scenarios as portable test assets
2. run those scenarios against heterogeneous targets
3. capture execution traces, tool calls, and outcomes
4. evaluate behavior using consistent policies and rubrics
5. compare results across models, prompt versions, agents, and releases
6. identify regressions before production exposure

Without that, every test cycle becomes ad hoc, anecdotal, and difficult to trust.

## Design goals

Adversary Forge is designed around the following principles:

### 1. Replayability first
A security finding is much more useful when it can be rerun deterministically enough to validate a fix, compare a new model, or generate evidence for governance review.

### 2. Clear separation of concerns
Scenario definition, target adaptation, execution, evaluation, and reporting are different problems and should be modeled independently.

### 3. Trace completeness over demo simplicity
A flashy dashboard matters less than preserving the evidence needed to explain why a system passed or failed.

### 4. Comparative benchmarking
The framework should support side-by-side evaluation of:

- model A vs model B
- prompt version A vs version B
- tool policy A vs policy B
- memory architecture A vs memory architecture B
- agent release N vs N+1

### 5. Safety-aware realism
Scenarios should simulate realistic attacker behavior without turning the project into an unsafe abuse toolkit.

## Non-goals

This project is **not** trying to be:

- a live offensive exploitation platform
- a malware toolkit
- an unrestricted fuzzing engine for arbitrary remote systems
- a governance-only checklist product with no technical depth
- a replacement for application-specific business logic tests

The focus is rigorous evaluation, not uncontrolled attack execution.

## System architecture

```text
scenario pack
   |
   v
scenario registry -----> validation layer
   |                          |
   v                          v
target adapter -------> execution harness -------> trace capture
                                              |
                                              v
                                      evaluator pipeline
                                              |
                    +-------------------------+-------------------------+
                    |                         |                         |
                    v                         v                         v
              policy scoring            attack success            defense signal quality
                    |                         |                         |
                    +-------------------------+-------------------------+
                                              |
                                              v
                                       report generation
                                              |
                       +----------------------+----------------------+
                       |                                             |
                       v                                             v
                 machine-readable output                        analyst-ready HTML
```

### Main components

#### Scenario registry
Stores reusable scenarios with metadata, inputs, expected defenses, attack families, and scoring hints.

#### Target adapters
Normalize interaction with different target classes, for example:

- plain chat assistants
- retrieval-augmented systems
- tool-using agents
- workflow-based copilots
- internal policy assistants

#### Execution harness
Coordinates the run lifecycle, feeds scenario steps, collects responses and tool events, and preserves context for downstream evaluation.

#### Evaluator core
Applies scoring logic to determine whether the target resisted, partially resisted, or failed the scenario.

#### Report layer
Converts raw traces and scores into assets useful for:

- security engineers
- AI platform teams
- auditors
- product stakeholders
- release gates in CI

## Evaluation lifecycle

A typical run follows this sequence:

1. Select a scenario pack.
2. Bind a target adapter and execution configuration.
3. Execute scenario steps against the target.
4. Capture prompts, responses, tool calls, retrieval context, and policy decisions.
5. Evaluate the run against rule sets and scoring rubrics.
6. Generate structured output for machines and rich reports for humans.
7. Compare with historical baselines to detect regressions.

## Threat classes covered

The framework is designed to cover a broad set of AI-native security risks:

- prompt injection
- indirect prompt injection from retrieved content
- tool abuse and action hijacking
- privilege escalation through instruction confusion
- memory poisoning
- data exfiltration attempts
- policy bypass and refusal degradation
- unsafe autonomy and over-execution
- hidden instruction propagation
- cross-turn persistence attacks
- evaluation target gaming and benchmark contamination

## Core capabilities

- replayable scenario execution
- structured scenario packs with metadata and versioning potential
- pluggable target adapters
- evaluator pipeline for rule-based and rubric-based scoring
- benchmark orchestration across multiple targets
- JSON and HTML report generation
- CI-friendly output for regression gating
- evidence-oriented trace capture
- support for both red-team and defense validation workflows

## Scenario model

A scenario is not just a prompt.

It is a test asset that can encode:

- attack objective
- preconditions
- environment assumptions
- multi-step conversation or tool interaction flow
- expected safe behavior
- allowed tool envelope
- disallowed side effects
- evaluation rules and severity hints

This makes the project much closer to a proper testing framework than a folder of prompts.

See also:

- `docs/scenario-format.md`
- `docs/methodology.md`
- `docs/threat-model.md`

## Reporting model

The reporting layer is designed to answer multiple levels of questions.

### For engineers

- what exactly happened?
- where did the defense fail?
- which tool call or retrieval segment caused the break?
- can I replay this locally?

### For security leadership

- what attack families are most likely to succeed?
- what changed after a prompt, policy, or model update?
- which systems are safe enough for staged rollout?

### For governance and audit

- what scenarios were run?
- what evidence exists for the claimed result?
- what scoring method was used?
- how is severity assigned?

## Repository structure

```text
adversary-forge/
  apps/
    runner/                # CLI and batch execution surface
    dashboard/             # result exploration and analyst review UI
    reports/               # generated artifacts and report templates
  packages/
    scenario-registry/     # scenario loading, validation, metadata
    evaluator-core/        # scoring engine and evaluation contracts
  scenarios/               # reusable scenario packs
  docs/                    # architecture, ADRs, methodology, reporting
```

## Key engineering choices

### JSON scenarios instead of opaque scripts
This improves portability, reviewability, version control hygiene, and future UI support.

### Execution and evaluation are decoupled
The system can preserve raw traces even if evaluation logic changes later.

### Report generation is first-class
In many security tools, reporting is an afterthought. Here, evidence packaging is part of the architecture.

### Methodology is documented, not implied
This repository includes explicit design documents because evaluation credibility depends on methodological clarity.

## Example use cases

### 1. Release gate for an internal AI agent
Run a fixed benchmark pack on every new prompt or model revision and block rollout if critical attack success rate rises.

### 2. Comparative model selection
Evaluate the same task-oriented assistant against several foundation models and compare both utility and adversarial resistance.

### 3. Security review of a retrieval system
Test whether retrieved documents can inject hidden instructions or leak policy-sensitive information.

### 4. Blue-team validation
After adding defense layers, rerun historical scenarios to confirm the mitigation actually works.

## Operational workflow

A mature workflow around Adversary Forge typically looks like this:

1. Security or AI platform engineers author scenarios.
2. Product teams bind scenarios to target adapters.
3. CI executes smoke benchmarks on pull requests.
4. Scheduled suites run deeper evaluations on release branches.
5. Reports are reviewed by engineering and security.
6. Regressions are tracked as fixable defects, not vague concerns.

## Metrics that matter

Useful metrics in this domain include:

- attack success rate by threat family
- severity-weighted failure rate
- policy adherence rate
- unsafe tool invocation count
- mean time to reproduce a failure
- benchmark stability across repeated runs
- defense regression rate between releases
- trace completeness ratio

This project is built to make those metrics derivable, not hand-wavy.

## Security and safety posture

Because this repository touches adversarial techniques, the documentation emphasizes responsible use:

- scenarios are designed for defensive validation
- execution should stay within authorized environments
- sensitive traces should be handled carefully
- public benchmark packs should avoid publishing harmful operational detail

See `SECURITY.md` for disclosure and usage guidance.

## Documentation

- `docs/architecture.md`
- `docs/methodology.md`
- `docs/threat-model.md`
- `docs/benchmarking.md`
- `docs/adr-001-replayable-scenarios.md`
- `docs/scenario-format.md`
- `docs/reporting.md`

Subpackage and app-level docs:

- `apps/runner/README.md`
- `apps/dashboard/README.md`
- `packages/scenario-registry/README.md`
- `packages/evaluator-core/README.md`

## Roadmap

### Near term

- richer scenario metadata and schema evolution strategy
- target adapters for broader classes of agent systems
- historical run storage and baseline comparison
- improved HTML reporting and trace exploration
- CI policy gates with severity-aware thresholds

### Mid term

- scenario minimization for easier debugging of failures
- differential evaluation across model and prompt variants
- trace viewers with tool-call and retrieval overlays
- policy pack marketplace for organization-specific defenses
- benchmark reproducibility scorecards

### Long term

- hybrid rule-based plus learned evaluators
- corpus-scale regression testing against scenario suites
- enterprise evidence export for assurance and governance workflows
- simulation environments for more realistic tool ecosystems

## Why this belongs in a high-signal portfolio

Adversary Forge signals the ability to operate at the intersection of:

- AI systems engineering
- security engineering
- developer platform architecture
- evaluation science
- technical communication

It is the kind of project that creates strong interview conversations because it shows not only implementation ability, but also systems thinking, rigor, and taste.

## License

Apache-2.0
