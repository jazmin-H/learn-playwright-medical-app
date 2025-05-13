import { test, expect } from '@playwright/test';

test('confirmacion correcta de inicio de sesion', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('wowo@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('soygay');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});