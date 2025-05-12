import { test, expect } from '@playwright/test';

test('error al iniciar sesion sin contraseña', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('main').click();
    await expect(page.getByText('ContraseñaLa contraseña es')).toBeVisible();
});