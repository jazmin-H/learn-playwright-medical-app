import { test, expect } from '@playwright/test';

test('Verificacion fecha de la reserva de turno', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Ortopedia' }).click();
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dra. Claudia Ruíz' }).click();
    await page.getByRole('button', { name: 'Fecha' }).click();
    await page.getByRole('dialog').locator('div').nth(2).click();
    await expect(page.getByRole('dialog')).toContainText('May 2025');
    await page.getByRole('button', { name: 'Fecha' }).click();
    await expect(page.getByLabel('Sunday', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Monday', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Tuesday', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Wednesday', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Thursday', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Friday', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Saturday', { exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Saturday, May 17th,' })).toBeVisible();
    await page.getByRole('button', { name: 'Fecha' }).click();
});