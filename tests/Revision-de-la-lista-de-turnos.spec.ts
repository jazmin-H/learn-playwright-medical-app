import { test, expect } from '@playwright/test';

test('Revision de la lista de turnos', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByText('NeurologíaDra. Elena Castro29/05/202514:00Cancelar turnoOrtopediaDr. Óscar Pé')).toBeVisible();
});