import { test as base } from '@playwright/test';

type Fixtures = {
  // Add your custom fixtures here
};

export const test = base.extend<Fixtures>({
  // Add custom fixture implementations here
});

export { expect } from '@playwright/test';