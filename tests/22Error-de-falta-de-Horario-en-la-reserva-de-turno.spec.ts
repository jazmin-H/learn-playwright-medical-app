import { test, expect } from '@playwright/test';

test('Error de falta de Horario en la reserva de turno pero sin mostrar un entorno de error', async ({ page }) => {
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
  await page.getByRole('option', { name: 'Oftalmología' }).click();
  await page.getByRole('combobox', { name: 'Médico' }).click();
  await page.getByRole('option', { name: 'Dr. Javier Morales' }).click();
  await page.getByRole('button', { name: 'Fecha' }).click();
  await page.getByRole('gridcell', { name: 'Tuesday, May 27th,' }).click();
  await page.getByRole('button', { name: 'Reservar turno' }).click();
  await expect(page.getByText('HorarioSelecciona un')).toBeVisible();
});