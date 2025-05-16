import { test, expect } from '@playwright/test';

test('error de inicio de sesion por falta de gmail', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('CarlosTest123!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByText('EmailIngrese un email válido')).toBeVisible();
});