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

function toHtml(report) {
  const items = report.map((entry) => `
    <tr>
      <td>${entry.scenario.id}</td>
      <td>${entry.scenario.category}</td>
      <td>${entry.evaluation.verdict}</td>
      <td>${entry.evaluation.score}</td>
    </tr>
  `).join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Adversary Forge Report</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; background: #0f172a; color: #e5e7eb; }
      table { width: 100%; border-collapse: collapse; margin-top: 16px; }
      th, td { border: 1px solid #334155; padding: 10px; text-align: left; }
      th { background: #1e293b; }
    </style>
  </head>
  <body>
    <h1>Adversary Forge Report</h1>
    <p>Target: ${target.id}</p>
    <table>
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Category</th>
          <th>Verdict</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>${items}</tbody>
    </table>
  </body>
</html>`;
}

function writeReports(report) {
  ensureReportsDir();
  const jsonPath = path.join(reportsDir, 'latest-report.json');
  const htmlPath = path.join(reportsDir, 'latest-report.html');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(htmlPath, toHtml(report));
  return { jsonPath, htmlPath };
}

const scenarios = loadScenarios();
const report = scenarios.map((scenario) => runScenario(scenario, target));
const outputPaths = writeReports(report);
console.log(JSON.stringify({ outputPaths, report }, null, 2));
