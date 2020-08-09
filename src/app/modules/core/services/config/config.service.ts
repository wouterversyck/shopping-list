import { Injectable } from '@angular/core';

import { Config } from './models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private KEY = 'config';

  constructor() { }

  getConfig(): Config {
    return JSON.parse(localStorage.getItem(this.KEY)) ?? new Config();
  }

  saveConfig(config: Config) {
    localStorage.setItem(this.KEY, JSON.stringify(config));
  }
}
