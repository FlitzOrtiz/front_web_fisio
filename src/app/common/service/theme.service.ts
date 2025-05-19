import {
  Injectable,
  Renderer2,
  RendererFactory2,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private colorScheme: string = 'light';
  private colorSchemePrefix = 'color-scheme-';
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
    this.initTheme();
  }

  initTheme() {
    this.getColorScheme();
    if (this.isBrowser) {
      this.renderer.addClass(
        document.body,
        this.colorSchemePrefix + this.colorScheme
      );
    }
  }

  isDarkMode(): boolean {
    return this.colorScheme === 'dark';
  }

  setDarkMode(isDark: boolean) {
    this.colorScheme = isDark ? 'dark' : 'light';
    this.setColorScheme(this.colorScheme);
    if (this.isBrowser) {
      localStorage.setItem('prefers-color', this.colorScheme);
    }
  }

  getColorScheme() {
    if (this.isBrowser) {
      const localStorageColorScheme = localStorage.getItem('prefers-color');

      if (localStorageColorScheme) {
        this.colorScheme = localStorageColorScheme;
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.colorScheme = 'dark';
      }
    }
    // Default is 'light' if not in browser environment
  }

  setColorScheme(scheme: string) {
    if (this.isBrowser) {
      this.renderer.removeClass(
        document.body,
        this.colorSchemePrefix + (scheme === 'dark' ? 'light' : 'dark')
      );

      this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
    }
  }
}
