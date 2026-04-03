import { effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type AppTheme = 'light' | 'dark';

const STORAGE_KEY = 'task-manager-theme';

function readStoredTheme(): AppTheme {
  if (typeof localStorage === 'undefined') {
    return 'dark';
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<AppTheme>(readStoredTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      this.document.documentElement.dataset['theme'] = t;
      localStorage.setItem(STORAGE_KEY, t);
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);
  }
}
