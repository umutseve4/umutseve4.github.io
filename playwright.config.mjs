import {defineConfig} from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  reporter: isCI
    ? [['line'], ['html', {outputFolder: 'playwright-report', open: 'never'}]]
    : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    // Preserve evidence of failures without adding retries or changing assertions.
    trace: isCI ? 'retain-on-failure' : 'off',
    screenshot: isCI ? 'only-on-failure' : 'off',
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    port: 4173,
    reuseExistingServer: true,
  },
  projects: [
    {name: 'desktop-1440', use: {viewport: {width: 1440, height: 900}}},
    {name: 'tablet-768', use: {viewport: {width: 768, height: 1024}}},
    {name: 'mobile-375', use: {viewport: {width: 375, height: 812}}},
    {name: 'mobile-320', use: {viewport: {width: 320, height: 700}}},
  ],
});
