import { test, expect } from '@playwright/test';

test('error de registro por que no coinciden las contraseñas', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('sisisi');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('si@gmail.com');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('1160020017');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('jazmin123');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('Confirmar contraseñaLas')).toBeVisible();
  await page.goto('http://localhost:3000/register');
});