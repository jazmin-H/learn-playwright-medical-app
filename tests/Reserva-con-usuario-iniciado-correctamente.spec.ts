import { test, expect } from '@playwright/test';

test('Reserva con usuario iniciado correctamente', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@clinica.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('AdminSecure123!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.goto('http://localhost:3000/dashboard/reservar');
  await page.getByRole('combobox', { name: 'Especialidad' }).click();
  await page.getByLabel('Neurología').getByText('Neurología').click();
  await page.getByRole('combobox', { name: 'Médico' }).click();
  await page.getByRole('option', { name: 'Dra. Elena Castro' }).click();
  await page.getByRole('button', { name: 'Fecha' }).click();
  await page.getByRole('button', { name: 'Friday, May 30th,' }).click();
  await page.getByRole('combobox', { name: 'Horario' }).click();
  await page.getByRole('option', { name: '15:00' }).click();
  await page.getByRole('button', { name: 'Reservar turno' }).click();
  await page.locator('div').filter({ hasText: 'NeurologíaDra. Elena Castro30' }).nth(3).click();
});