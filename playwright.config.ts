import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  fullyParallel:true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, 
  reporter: 'html',
  use: {
    baseURL: 'https://petstore.swagger.io/v2',
    trace: 'on-first-retry',
  },
  projects: [
{
  name: 'api',
  testDir: './tests/api',
  use: {
    extraHTTPHeaders: {
      'Accept': 'application/JSON',
      'Content-Type': 'application/json',
    
    }
  }
}}
  ]

})