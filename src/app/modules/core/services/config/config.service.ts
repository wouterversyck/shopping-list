import { Inject, Injectable } from '@angular/core';

import { Config } from './models/config.model';
import { DOCUMENT } from '@angular/common';

export enum Theme {
  light = 'light-theme',
  dark = 'dark-theme'
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private KEY = 'config';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  getConfig(): Config {
    return JSON.parse(localStorage.getItem(this.KEY)) ?? new Config();
  }

  saveConfig(config: Config) {
    localStorage.setItem(this.KEY, JSON.stringify(config));

    this.setTheme(config.theme);
  }

  loadTheme() {
    const themeClass = this.getConfig().theme;
    this.setTheme(themeClass);
  }

  private setTheme(themeClass: string) {
    this.document.body.classList.remove(Theme.dark);
    this.document.body.classList.remove(Theme.light);
    this.document.body.classList.add(themeClass);
  }
}
