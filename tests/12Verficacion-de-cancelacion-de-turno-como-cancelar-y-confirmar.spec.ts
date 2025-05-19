import { test, expect } from '@playwright/test';

test('Verficacion de cancelacion de turno como cancelar y confirmar', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('PacienteSeguro456!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Cancelar turno' }).click();
  await expect(page.getByLabel('¿Estás seguro?')).toContainText('¿Estás seguro?Esta acción no se puede deshacer. El turno será cancelado permanentemente.');
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('button', { name: 'Cancelar turno' }).click();
  await expect(page.getByText('¿Estás seguro?Esta acción no')).toBeVisible();
  await page.getByRole('button', { name: 'Confirmar' }).click();
});
