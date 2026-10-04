const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function resolveJavaHome() {
  const candidates = [];

  if (process.env.JAVA_HOME) {
    candidates.push(process.env.JAVA_HOME);
  }

  const javaFromPath = (() => {
    try {
      return execSync('where.exe java', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    } catch {
      return '';
    }
  })();

  if (javaFromPath) {
    const javaPath = javaFromPath.split(/\r?\n/)[0].trim();
    if (javaPath) {
      candidates.push(path.dirname(path.dirname(javaPath)));
    }
  }

  const windowsRoots = [
    'C:\\Program Files\\Java',
    'C:\\Program Files\\Eclipse Adoptium',
    'C:\\Program Files\\Microsoft',
    'C:\\Program Files\\Zulu'
  ];

  for (const root of windowsRoots) {
    if (!fs.existsSync(root)) continue;
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const folder = path.join(root, entry.name);
      const javaBin = path.join(folder, 'bin', 'java.exe');
      if (fs.existsSync(javaBin)) {
        candidates.push(folder);
      }
    }
  }

  const uniqueCandidates = [...new Set(candidates.filter(Boolean))];
  for (const candidate of uniqueCandidates) {
    const javaExe = path.join(candidate, 'bin', 'java.exe');
    if (fs.existsSync(javaExe)) {
      return candidate;
    }
  }

  return null;
}

function main() {
  const javaHome = resolveJavaHome();

  if (!javaHome) {
    console.error('Allure report generation requires Java. Please install a JDK and ensure JAVA_HOME or java is available on PATH.');
    process.exit(1);
  }

  process.env.JAVA_HOME = javaHome;
  process.env.PATH = `${path.join(javaHome, 'bin')}${path.delimiter}${process.env.PATH || ''}`;

  const resultsDir = path.resolve(__dirname, '..', 'allure-results');
  if (!fs.existsSync(resultsDir)) {
    console.error(`Allure results directory not found: ${resultsDir}. Run Playwright tests before generating the report.`);
    process.exit(1);
  }

  const result = spawnSync('npx', ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report'], {
    stdio: 'inherit',
    shell: true,
    env: process.env
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  process.exit(result.status || 0);
}

main();
