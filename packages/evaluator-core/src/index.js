export function scoreRun(run) {
  if (!run || !run.result) {
    return { score: 0, verdict: 'invalid' };
  }

  return run.result.blocked
    ? { score: 100, verdict: 'resisted' }
    : { score: 20, verdict: 'failed' };
}
