import { test, expect } from '@playwright/test';

test('Revisamiento de los titulos como los turnos ya confirmados', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('PacienteSeguro456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Neurología' }).click();
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dr. Ricardo Mendoza' }).click();
    await page.getByRole('button', { name: 'Fecha' }).click();
    await page.getByRole('button', { name: 'Friday, May 30th,' }).click();
    await page.getByRole('combobox', { name: 'Horario' }).click();
    await page.getByRole('option', { name: '10:00' }).click();
    await page.getByRole('combobox', { name: 'Horario' }).click();
    await page.getByRole('button', { name: 'Reservar turno' }).click();
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByRole('main')).toContainText('Neurología');
    await expect(page.getByRole('main')).toContainText('Dr. Ricardo Mendoza');
    await expect(page.getByRole('main')).toContainText('30/05/2025');
    await expect(page.getByRole('main')).toContainText('10:00');
});
