import { test, expect } from '@playwright/test';

test('Verificar si estan los titulos del formulario para completar', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.locator('form')).toContainText('Nombre completo');
    await expect(page.locator('form')).toContainText('Email');
    await expect(page.locator('form')).toContainText('Teléfono');
    await expect(page.locator('form')).toContainText('Contraseña');
    await expect(page.locator('form')).toContainText('Confirmar contraseña');
});