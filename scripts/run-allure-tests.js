const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const resultsDir = path.join(rootDir, 'allure-results');

fs.rmSync(resultsDir, { recursive: true, force: true });

const testResult = spawnSync('npx', ['playwright', 'test'], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
});

if (testResult.error) {
    console.error(`Unable to run Playwright tests: ${testResult.error.message}`);
    process.exit(1);
}

const reportResult = spawnSync(process.execPath, [path.join(__dirname, 'generate-allure.js')], {
    cwd: rootDir,
    stdio: 'inherit'
});

if (reportResult.error) {
    console.error(`Unable to generate the Allure report: ${reportResult.error.message}`);
    process.exit(1);
}

process.exit(testResult.status || reportResult.status || 0);
