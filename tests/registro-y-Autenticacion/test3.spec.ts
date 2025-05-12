import { test, expect } from '@playwright/test';

test('registro sin nombre de usuario', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('ono@gmail.com');
    await page.getByRole('textbox', { name: 'Teléfono' }).click();
    await page.getByRole('textbox', { name: 'Teléfono' }).fill('1138430099');
    await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
    await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('47131851');
    await page.getByRole('textbox', { name: 'Confirmar contraseña' }).click();
    await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('47131851');
    await page.getByRole('button', { name: 'Registrarse' }).click();
    await expect(page.getByText('Nombre completoEl nombre debe')).toBeVisible();
});