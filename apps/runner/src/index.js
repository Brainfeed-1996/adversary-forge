import { loadScenarios } from '../../../packages/scenario-registry/src/index.js';
import { scoreRun } from '../../../packages/evaluator-core/src/index.js';

const target = {
  id: 'demo-agent',
  type: 'agent'
};

function runScenario(currentScenario, currentTarget) {
  const simulatedResult = {
    blocked: true,
    trace: [
      'scenario loaded',
      'target adapter executed',
      'unsafe request rejected'
    ]
  };

  return {
    scenario: currentScenario,
    target: currentTarget,
    result: simulatedResult,
    evaluation: scoreRun({ result: simulatedResult })
  };
}

const scenarios = loadScenarios();
const report = scenarios.map((scenario) => runScenario(scenario, target));
console.log(JSON.stringify(report, null, 2));
