import { test, expect } from '@playwright/test';

test('Revisamiento de los titulos como los turnos ya confirmados', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByRole('heading')).toContainText('Mis Turnos');
    await expect(page.getByRole('main')).toContainText('Neurología');
    await expect(page.getByRole('main')).toContainText('Dra. Elena Castro');
    await expect(page.getByRole('main')).toContainText('29/05/2025');
    await expect(page.getByRole('main')).toContainText('14:00');
    await expect(page.getByRole('main')).toContainText('Cancelar turno');
    await expect(page.getByRole('main')).toContainText('Ortopedia');
    await expect(page.getByRole('main')).toContainText('Dr. Óscar Pérez');
    await expect(page.getByRole('main')).toContainText('30/05/2025');
    await expect(page.getByRole('main')).toContainText('14:00');
    await expect(page.getByRole('main')).toContainText('Cancelar turno');
});