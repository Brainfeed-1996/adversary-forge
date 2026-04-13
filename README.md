# Adversary Forge

![CI](https://github.com/Brainfeed-1996/adversary-forge/actions/workflows/ci.yml/badge.svg)

AI red-team and defense evaluation framework for LLM applications and agentic systems.

Adversary Forge is a security evaluation platform designed to test language-model applications, tool-using agents, memory systems, and workflow automations against realistic attack scenarios.

## Why this project matters

AI systems are increasingly connected to tools, data sources, and decision loops. That makes them valuable and dangerous. Adversary Forge exists to make those systems measurable under adversarial pressure.

## Current status

Early flagship build phase with:

- replayable JSON scenarios
- scenario registry loader
- evaluation core
- runner with JSON and HTML report output
- ADR and methodology docs
- CI and contribution templates

## Evaluation model

```text
scenario pack
   |
   v
target adapter
   |
   v
execution harness
   |
   v
trace capture
   |
   v
evaluator
   |
   v
report output
```

## Core capabilities

- prompt injection test suites
- tool abuse and privilege escalation scenarios
- memory poisoning evaluations
- data exfiltration simulation
- policy compliance scoring
- benchmark orchestration and replay
- comparative model and agent evaluation
- red team and blue team workflows

## Repository structure

```text
adversary-forge/
  apps/
    runner/
    dashboard/
    reports/
  packages/
    scenario-registry/
    evaluator-core/
  scenarios/
  docs/
```

## Documentation

- docs/architecture.md
- docs/methodology.md
- docs/threat-model.md
- docs/benchmarking.md
- docs/adr-001-replayable-scenarios.md
- docs/scenario-format.md
- docs/reporting.md

## Roadmap

### Near term

- add richer HTML reporting
- support richer target adapters
- support historical run storage
- introduce scenario metadata versioning

### Mid term

- benchmark dashboards
- comparative target runs
- trace viewers
- policy regression packs

## License

Apache-2.0
