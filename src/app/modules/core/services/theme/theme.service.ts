import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';


export enum Theme {
  light = 'light-theme',
  dark = 'dark-theme'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  localStorageKey = 'theme';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  loadTheme() {
    const themeClass = localStorage.getItem(this.localStorageKey);

    if (themeClass) {
      this.setTheme(themeClass);
    } else {
      this.setTheme(Theme.dark);
    }
  }

  setTheme(themeClass: string) {
    this.document.body.classList.remove(Theme.dark);
    this.document.body.classList.remove(Theme.light);
    this.document.body.classList.add(themeClass);
    localStorage.setItem(this.localStorageKey, themeClass);
  }

  toggleTheme() {
    this.isDarkTheme() ? this.setLightTheme() : this.setDarkTheme();
  }

  setDarkTheme() {
    this.setTheme(Theme.dark);
  }

  setLightTheme() {
    this.setTheme(Theme.light);
  }

  isDarkTheme(): boolean {
    return this.document.body.classList.contains(Theme.dark);
  }
}
