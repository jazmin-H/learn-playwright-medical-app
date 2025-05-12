import { test, expect } from '@playwright/test';

test('Deberia haber una contraseña', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByRole('textbox', { name: 'Nombre completo' }).click();
    await page.getByRole('textbox', { name: 'Nombre completo' }).fill('');
    await page.getByRole('textbox', { name: 'Nombre completo' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nombre completo' }).fill('M');
    await page.getByRole('textbox', { name: 'Nombre completo' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nombre completo' }).fill('Martin');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('martin@gmail.com');
    await page.getByRole('textbox', { name: 'Teléfono' }).click();
    await page.getByRole('textbox', { name: 'Teléfono' }).fill('1138770958');
    await page.getByRole('button', { name: 'Registrarse' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('martin@gmail.com');
    await expect(page.getByText('ContraseñaLa contraseña debe')).toBeVisible();
});