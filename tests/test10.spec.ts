import { test, expect } from '@playwright/test';

test('confirmacion exitoso de registro ', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('wowo');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('wowo@gmail.com');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('1170080019');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('soygay');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('soygay');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('main').click();
  await page.getByText('Iniciar sesiónIngresa tus credenciales para continuarEmailContraseñaIniciar').click();
  await page.goto('http://localhost:3000/login');
});