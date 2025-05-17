import { test, expect } from '@playwright/test';

test('Verificacion de los doctores en la especialidad de Neurología', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Neurología' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Neurología');
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dr. Ricardo Mendoza' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dr. Ricardo Mendoza');
    await page.getByRole('option', { name: 'Dra. Elena Castro' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dra. Elena Castro');
});