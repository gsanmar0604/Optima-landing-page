import { Component, signal } from '@angular/core';
import { CONTACT_EMAIL } from './env.generated';
import { SITE } from './site';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly site = SITE;
  protected readonly email = CONTACT_EMAIL;
  protected readonly mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Contacto desde la web de ${SITE.name}`)}`;
  protected readonly year = new Date().getFullYear();

  // Si el logo no existe o falla al cargar, se oculta en vez de mostrar una imagen rota.
  protected readonly logoVisible = signal(true);

  // Aviso temporal "¡Copiado!" tras copiar el correo.
  protected readonly copied = signal(false);
  private resetTimer?: ReturnType<typeof setTimeout>;

  // Alternativa al enlace mailto: por si el dispositivo no tiene programa de correo configurado.
  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => this.copied.set(false), 2500);
    } catch {
      // Sin permiso de portapapeles: el correo sigue visible debajo y se puede seleccionar a mano.
    }
  }
}
