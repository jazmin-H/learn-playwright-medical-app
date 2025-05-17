import { test, expect } from '@playwright/test';

test('Verificacion exitosa de eleccion de fecha de turno', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Neurología' }).click();
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dr. Ricardo Mendoza' }).click();
    await page.getByRole('button', { name: 'Fecha' }).click();
});