import { test, expect } from '@playwright/test';

test('confirmacion de  inicio de sesion', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.getByRole('main').click();
    await page.getByRole('button', { name: 'Salir' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('ono@gmail.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('47131851');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});