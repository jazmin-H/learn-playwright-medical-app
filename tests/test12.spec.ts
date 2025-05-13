import { test, expect } from '@playwright/test';

test('error en registro sin ingresar ningun dato ', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('Nombre completoEl nombre debe')).toBeVisible();
  await expect(page.getByText('EmailIngrese un email válido')).toBeVisible();
  await expect(page.getByText('TeléfonoIngrese un número de')).toBeVisible();
  await expect(page.getByText('ContraseñaLa contraseña debe')).toBeVisible();
  await page.goto('http://localhost:3000/register');
});