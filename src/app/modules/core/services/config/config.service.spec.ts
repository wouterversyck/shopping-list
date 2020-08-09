import { TestBed } from '@angular/core/testing';

import { ConfigService, Theme } from './config.service';
import { DOCUMENT } from '@angular/common';
import createSpy = jasmine.createSpy;

describe('ConfigService', () => {
  let service: ConfigService;
  const document = {
    body: {
      classList: {
        remove: {},
        add: {},
        contains: {}
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: document }
      ]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set dark theme by default', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();

    service.loadTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.dark);
  });

  it('should load the correct theme from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({
      autoGoogleLogin: false,
      theme: Theme.light
    }));
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();

    service.loadTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.light);
  });

  it('should correctly save config and set theme', () => {
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();

    service.saveConfig({
      theme: Theme.dark,
      autoGoogleLogin: false
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('config', JSON.stringify({
      theme: Theme.dark,
      autoGoogleLogin: false
    }));
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.dark);
  });

  it('should correctly fetch config from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({
      autoGoogleLogin: false,
      theme: Theme.light
    }));

    const config = service.getConfig();

    expect(localStorage.getItem).toHaveBeenCalledWith('config');
    expect(config).toEqual({
      autoGoogleLogin: false,
      theme: Theme.light
    });
  });
});
