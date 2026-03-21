# Operational Baseline

## Non-Python Baseline (Current Repository)
- Package manager: npm
- Steps:
  1. Ensure Node.js 20+
  2. Run npm install
  3. Run npm run build
  4. Run npm run dev

## Python Baseline (When Applicable)
- Package manager: uv
- Steps:
  1. Install uv
  2. Initialize project environment with uv
  3. Install/manage dependencies through uv workflow
  4. Record command baseline in project quickstart

## Rollback
- If baseline update fails, revert to last approved recommendation report and last known working command set.

## Troubleshooting
- Dependency mismatch: clear install artifacts and reinstall with official manager.
- Command drift: compare against playbook and recommendation report.
