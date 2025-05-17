import { test, expect } from '@playwright/test';

test('Verificacion de los doctores en la especialidad de Ortopedia', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Ortopedia' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Ortopedia');
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dr. Óscar Pérez' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dr. Óscar Pérez');
    await page.getByRole('option', { name: 'Dra. Claudia Ruíz' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dra. Claudia Ruíz');
});