import { test, expect } from '@playwright/test';

test('Verificacion de la eleccion de especialidad ', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await expect(page.getByLabel('Especialidad')).toContainText('Neurología');
    await page.getByRole('option', { name: 'Ortopedia' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Ortopedia');
    await page.getByLabel('Ginecología').getByText('Ginecología').click();
    await expect(page.getByLabel('Especialidad')).toContainText('Ginecología');
    await page.getByRole('option', { name: 'Oftalmología' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Oftalmología');
});