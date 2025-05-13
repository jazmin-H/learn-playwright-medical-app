import { test, expect } from '@playwright/test';

test('error de registro por falta de contraseña', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('samir');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('samirmalo@gmail.com');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('1138348877');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('ContraseñaLa contraseña debe')).toBeVisible();
});