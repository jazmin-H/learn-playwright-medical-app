import { test, expect } from '@playwright/test';

test('Verificacion si estan los titulos del formulario de reserva de turno para completar', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservar');
    await expect(page.getByRole('heading')).toContainText('Reservar Turno');
    await expect(page.getByRole('main')).toContainText('Datos del turno');
    await expect(page.getByRole('main')).toContainText('Selecciona la especialidad, médico, fecha y horario para tu consulta');
    await expect(page.getByRole('main')).toContainText('Especialidad');
    await expect(page.getByRole('main')).toContainText('Médico');
    await expect(page.getByRole('main')).toContainText('Fecha');
    await expect(page.getByRole('main')).toContainText('Horario');
    await expect(page.getByRole('main')).toContainText('Reservar turno');
});