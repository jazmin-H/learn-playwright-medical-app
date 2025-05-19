import { test, expect } from '@playwright/test';

test('Verificacion si estan los titulos del formulario de reserva de turno para completar', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('juan.perez@mail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('PacienteSeguro456!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.goto('http://localhost:3000/dashboard/reservar');
  await expect(page.getByRole('heading')).toContainText('Reservar Turno');
  await expect(page.getByRole('main')).toContainText('Datos del turno');
  await expect(page.getByRole('main')).toContainText('Selecciona la especialidad, médico, fecha y horario para tu consulta');
  await expect(page.getByRole('main')).toContainText('EspecialidadSelecciona una especialidadNeurologíaOrtopediaGinecologíaOftalmología');
  await expect(page.getByRole('main')).toContainText('MédicoSelecciona un médico');
  await expect(page.getByRole('main')).toContainText('FechaSelecciona una fecha');
  await expect(page.getByRole('main')).toContainText('HorarioSelecciona un horarioNo hay horarios disponibles');
});