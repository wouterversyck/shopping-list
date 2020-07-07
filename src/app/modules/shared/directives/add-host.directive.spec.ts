import { AddHostDirective } from './add-host.directive';
import { ViewContainerRef } from '@angular/core';

describe('AddHostDirective', () => {
  it('should create an instance', () => {
    const directive = new AddHostDirective({} as ViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
