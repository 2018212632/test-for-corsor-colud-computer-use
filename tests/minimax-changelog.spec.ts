import { expect, test } from "@playwright/test";

const CHANGELOG_URL = "https://agent.minimax.io/docs/changelog";

test("Minimax changelog page is reachable and core UI works", async ({ page }) => {
  const response = await page.goto(CHANGELOG_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });

  expect(response, "No HTTP response was returned for changelog URL").not.toBeNull();
  const status = response?.status() ?? 0;
  const title = await page.title();
  const securityVerificationHeading = page.getByRole("heading", {
    name: /performing security verification/i,
  });
  const onSecurityChallenge = /just a moment/i.test(title)
    || status === 403
    || (await securityVerificationHeading.isVisible().catch(() => false));

  if (onSecurityChallenge) {
    throw new Error(
      `Changelog page is blocked by anti-bot challenge in this environment (status=${status}, title="${title}").`
    );
  }

  expect(status).toBeGreaterThanOrEqual(200);
  expect(status).toBeLessThan(400);

  const h1 = page.locator("h1").first();
  await expect(h1).toBeVisible();
  await expect(h1).toContainText(/changelog/i);

  const entries = page.locator("main h2, main h3");
  const entryCount = await entries.count();
  expect(entryCount).toBeGreaterThan(0);
  await expect(entries.first()).toBeVisible();

  const internalDocsLink = page.locator('main a[href^="/docs/"]').first();
  if ((await internalDocsLink.count()) > 0) {
    const href = await internalDocsLink.getAttribute("href");
    expect(href, "Internal docs link should contain href").toBeTruthy();
    const target = new URL(href!, CHANGELOG_URL).toString();
    const navResponse = await page.goto(target, { waitUntil: "domcontentloaded", timeout: 60_000 });
    expect(navResponse, "Navigation did not return a response").not.toBeNull();
    expect(navResponse!.status()).toBeGreaterThanOrEqual(200);
    expect(navResponse!.status()).toBeLessThan(400);
  }
});
