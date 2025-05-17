import { test, expect } from '@playwright/test';

test('Error en inicio de sesion sin ingresar ningun dato', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByText('EmailIngrese un email válido')).toBeVisible();
  await expect(page.getByText('ContraseñaLa contraseña es')).toBeVisible();
  await page.goto('http://localhost:3000/login');
});