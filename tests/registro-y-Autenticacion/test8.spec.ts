import { test, expect } from '@playwright/test';

test('error al iniciar sin contraseña', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('47131851');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await expect(page.getByText('EmailIngrese un email válido')).toBeVisible();
});