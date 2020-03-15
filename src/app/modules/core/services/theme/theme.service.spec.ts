import { TestBed } from '@angular/core/testing';

import { Theme, ThemeService } from './theme.service';
import createSpy = jasmine.createSpy;
import { DOCUMENT } from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;
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
    service = TestBed.inject(ThemeService);
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
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.dark);
  });

  it('should load the correct theme from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(Theme.light);
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();

    service.loadTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.light);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.light);
  });

  it('should set correct theme when setDarkTheme is called', () => {
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();

    service.setDarkTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.dark);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.dark);
  });

  it('should set correct theme when setLightTheme is called', () => {
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();

    service.setLightTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.light);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.light);
  });

  it('should check proper class when calling isDarkTheme method and return proper value', () => {
    document.body.classList.contains = createSpy().and.returnValue(true);

    let result = service.isDarkTheme();

    expect(result).toBeTruthy();
    expect(document.body.classList.contains).toHaveBeenCalledWith(Theme.dark);

    document.body.classList.contains = createSpy().and.returnValue(false);

    result = service.isDarkTheme();

    expect(result).toBeFalsy();
    expect(document.body.classList.contains).toHaveBeenCalledWith(Theme.dark);
  });

  it('should toggle the theme correctly and story the new theme', () => {
    spyOn(localStorage, 'setItem');
    document.body.classList.remove = createSpy();
    document.body.classList.add = createSpy();
    document.body.classList.contains = createSpy().and.returnValue(true);

    service.toggleTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.light);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.light);

    document.body.classList.contains = createSpy().and.returnValue(false);

    service.toggleTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.dark);
    expect(document.body.classList.remove).toHaveBeenCalledWith(Theme.light);
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.dark);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.dark);
  });
});
