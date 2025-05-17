import { test, expect } from '@playwright/test';

test('Verificacion de los doctores en la especialidad de Oftalmología', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).dblclick();
    await page.getByRole('option', { name: 'Oftalmología' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Oftalmología');
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dra. Patricia Vargas' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dra. Patricia Vargas');
    await page.getByRole('option', { name: 'Dr. Javier Morales' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dr. Javier Morales');
});