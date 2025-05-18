import { test, expect } from '@playwright/test';

test('Confirmar que aparezcan el nombre del usuario', async ({ page }) => {
  // 1. Haz login primero (usa credenciales de tu global-setup)
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="email"]', 'carlos.lopez@mail.com');
  await page.fill('input[name="password"]', 'CarlosTest123!');
  await page.click('button[type="submit"]');
  
  // 2. Espera a que redirija al dashboard
  await page.goto('http://localhost:3000/dashboard');
  await page.getByText('Hola, Carlos López').click();
  await page.getByRole('button', { name: 'Salir' }).click();
  await page.goto('http://localhost:3000/login');
});