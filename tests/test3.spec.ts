import { test, expect } from '@playwright/test';

test('error de registro sin nombre de usuario', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('maria.garcia@mail.com');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('5491166677788');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('MariaPassword789!');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('MariaPassword789!');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('Nombre completoEl nombre debe')).toBeVisible();
});