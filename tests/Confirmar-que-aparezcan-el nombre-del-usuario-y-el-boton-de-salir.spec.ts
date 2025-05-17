import { test, expect } from '@playwright/test';

test('Confirmar que aparezcan el nombre del usuario y el boton de salir', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await page.getByText('Hola, Carlos López').click();
  await page.getByRole('button', { name: 'Salir' }).click();
  await page.getByText('Iniciar sesiónIngresa tus credenciales para continuarEmailContraseñaIniciar').click();
  await page.goto('http://localhost:3000/login');
});