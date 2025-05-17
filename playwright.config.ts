import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./tests/utils/global-setup.ts",
  globalTeardown: "./tests/utils/global-teardown.ts",
  testDir: "./tests",
  fullyParallel: false, // ← Desactiva paralelismo para headed
  workers: 1,          // ← Solo 1 worker
  retries: 0,
  reporter: "html",

  use: {
    trace: "on-first-retry",
    video: "on", // Graba videos (útil para debug)
  },

  projects: [
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
        headless: false,
        launchOptions: {
          args: ["--start-maximized"],
          slowMo: 500 // ← Ajusta velocidad
        }
      },
    }
  ],

  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});