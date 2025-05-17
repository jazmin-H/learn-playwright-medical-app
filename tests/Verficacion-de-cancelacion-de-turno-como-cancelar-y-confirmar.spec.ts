import { test, expect } from '@playwright/test';

test('Verficacion de cancelacion de turno como cancelar y confirmar', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.locator('div').filter({ hasText: /^NeurologíaDra\. Elena Castro29\/05\/202514:00Cancelar turno$/ }).getByRole('button')).toBeVisible();
    await page.locator('div').filter({ hasText: /^NeurologíaDra\. Elena Castro29\/05\/202514:00Cancelar turno$/ }).getByRole('button').click();
    await expect(page.getByRole('heading')).toContainText('¿Estás seguro?');
    await expect(page.getByRole('paragraph')).toContainText('Esta acción no se puede deshacer. El turno será cancelado permanentemente.');
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirmar' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.locator('div').filter({ hasText: /^NeurologíaDra\. Elena Castro29\/05\/202514:00Cancelar turno$/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.goto('http://localhost:3000/dashboard');
    await page.locator('div').filter({ hasText: 'OrtopediaDr. Óscar Pérez30/05' }).nth(3).click();
});
