import { test, expect } from '@playwright/test';

test('Verificacion de la mayoria de botones', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByRole('button', { name: 'Reservar nuevo turno' })).toBeVisible();
    await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
    await page.getByRole('combobox', { name: 'Especialidad' }).click();
    await page.getByRole('option', { name: 'Neurología' }).click();
    await page.getByRole('combobox', { name: 'Médico' }).click();
    await page.getByRole('option', { name: 'Dra. Elena Castro' }).click();
    await page.getByRole('button', { name: 'Fecha' }).click();
    await page.getByRole('button', { name: 'Thursday, May 29th,' }).click();
    await page.getByRole('combobox', { name: 'Horario' }).click();
    await page.getByRole('option', { name: '14:00' }).click();
    await expect(page.getByRole('button', { name: 'Reservar turno' })).toBeVisible();
    await page.getByRole('button', { name: 'Reservar turno' }).click();
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByRole('link', { name: 'Reservar Turno' })).toBeVisible();
    await page.getByRole('link', { name: 'Reservar Turno' }).click();
    await expect(page.getByRole('link', { name: 'Mis Turnos' })).toBeVisible();
    await page.getByRole('link', { name: 'Mis Turnos' }).click();
});