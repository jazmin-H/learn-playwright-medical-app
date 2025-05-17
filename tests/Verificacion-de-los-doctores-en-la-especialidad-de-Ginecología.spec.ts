import { test, expect } from '@playwright/test';

test('Verificacion de los doctores en la especialidad de Ginecología', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Ginecología' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Ginecología');
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dra. María González' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dra. María González');
    await page.getByRole('option', { name: 'Dr. Luis Herrera' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dr. Luis Herrera');
});