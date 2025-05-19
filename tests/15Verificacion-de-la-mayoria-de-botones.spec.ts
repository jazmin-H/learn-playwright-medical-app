import { test, expect } from '@playwright/test';

test('Verificacion de la mayoria de botones', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('PacienteSeguro456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Neurología' }).click();
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dra. Elena Castro' }).click();
    await page.getByRole('button', { name: 'Fecha' }).click();
    await page.getByRole('button', { name: 'Thursday, May 29th,' }).click();
    await page.getByRole('combobox', { name: 'Horario' }).click();
    await page.getByRole('option', { name: '14:00' }).click();
    await expect(page.getByRole('button', { name: 'Reservar turno' })).toBeVisible();
    await page.getByRole('button', { name: 'Reservar turno' }).click();
    await page.goto('http://localhost:3000/dashboard');
    await page.getByRole('link', { name: 'Reservar Turno' }).click();
    await page.goto('http://localhost:3000/dashboard/reservar');
    await page.getByRole('link', { name: 'Mis Turnos' }).click();
    await page.goto('http://localhost:3000/dashboard');
});