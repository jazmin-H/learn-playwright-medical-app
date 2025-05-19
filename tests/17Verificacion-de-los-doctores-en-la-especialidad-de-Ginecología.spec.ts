import { test, expect } from '@playwright/test';

test('Verificacion de los doctores en la especialidad de Ginecología', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('PacienteSeguro456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Ginecología' }).click();
    await expect(page.getByLabel('Especialidad')).toContainText('Ginecología');
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dra. María González' }).click();
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dr. Luis Herrera' }).click();
});
