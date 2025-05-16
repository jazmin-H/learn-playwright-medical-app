import { test, expect } from '@playwright/test';

test('confirmar que deje reservar turno', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox', { name: 'Especialidad' }).click();
  await page.getByRole('option', { name: 'Ortopedia' }).click();
  await page.getByRole('combobox', { name: 'Médico' }).click();
  await page.getByRole('option', { name: 'Dra. Claudia Ruíz' }).click();
  await page.getByRole('button', { name: 'Fecha' }).click();
  await page.getByRole('button', { name: 'Friday, May 30th,' }).click();
  await page.getByRole('combobox', { name: 'Horario' }).click();
  await page.getByRole('option', { name: '15:30' }).click();
  await page.getByRole('button', { name: 'Reservar turno' }).click();
  await page.goto('http://localhost:3000/dashboard');
});