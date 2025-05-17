import { test, expect } from '@playwright/test';

test('Verificacion horaria de la reserva de turno', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Neurología' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Neurología');
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dr. Ricardo Mendoza' }).click();
    await expect(page.getByLabel('Médico')).toContainText('Dr. Ricardo Mendoza');
    await page.getByRole('button', { name: 'Fecha' }).click();
    await page.getByLabel('Saturday', { exact: true }).click();
    await page.getByRole('gridcell', { name: 'Thursday, May 22nd,' }).click();
    await expect(page.getByLabel('Fecha')).toContainText('22/05/2025');
    await page.getByRole('combobox', { name: 'Horario' }).click();
    await page.getByRole('option', { name: '14:00' }).click();
    await expect(page.getByLabel('Horario')).toContainText('14:00');
    await page.getByRole('listbox').getByText('09:0009:3010:0010:3011:0011:').click();
});