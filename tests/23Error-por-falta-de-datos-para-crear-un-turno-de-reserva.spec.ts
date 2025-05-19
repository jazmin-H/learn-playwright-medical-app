import { test, expect } from '@playwright/test';

test('Error por falta de datos para crear un turno de reserva', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('PacienteSeguro456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
    await page.getByRole('button', { name: 'Reservar turno' }).click();
    await expect(page.getByText('EspecialidadSelecciona una')).toBeVisible();
    await expect(page.getByText('MédicoSelecciona un mé')).toBeVisible();
    await expect(page.getByText('FechaSelecciona una')).toBeVisible();
    await expect(page.getByText('HorarioSelecciona un')).toBeVisible();
});