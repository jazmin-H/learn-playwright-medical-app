import { test, expect } from '@playwright/test';

test('Error de registro por falta de telefono', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('Shoto Todoroki');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('shoto@mail.com');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('ShotoTest123!');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('ShotoTest123!');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('TeléfonoIngrese un número de')).toBeVisible();
});