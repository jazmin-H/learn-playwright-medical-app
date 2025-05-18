import { test, expect } from '@playwright/test';

test('confirmacion correcta de inicio de sesion', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('carlos.lopez@mail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('CarlosTest123!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('button', { name: 'Salir' }).click();
  await page.goto('http://localhost:3000/login');
});