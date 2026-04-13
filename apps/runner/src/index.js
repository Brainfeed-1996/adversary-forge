import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadScenarios } from '../../../packages/scenario-registry/src/index.js';
import { scoreRun } from '../../../packages/evaluator-core/src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportsDir = path.resolve(__dirname, '../../reports');

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

function ensureReportsDir() {
  fs.mkdirSync(reportsDir, { recursive: true });
}

function writeReport(report) {
  ensureReportsDir();
  const outputPath = path.join(reportsDir, 'latest-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  return outputPath;
}

const scenarios = loadScenarios();
const report = scenarios.map((scenario) => runScenario(scenario, target));
const outputPath = writeReport(report);
console.log(JSON.stringify({ outputPath, report }, null, 2));
