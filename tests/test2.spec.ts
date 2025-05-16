import { test, expect } from '@playwright/test';

test('error de registro por falta de contraseña', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('Juan Pérez');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('5491155544433');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('ContraseñaLa contraseña debe')).toBeVisible();
});