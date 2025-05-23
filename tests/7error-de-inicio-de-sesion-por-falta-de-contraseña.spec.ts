import { test, expect } from '@playwright/test';

test('Error de inicio de sesion por falta de contraseña', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('carlos.lopez@mail.com');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByText('ContraseñaLa contraseña es')).toBeVisible();
});