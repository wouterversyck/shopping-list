import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddHost]'
})
export class AddHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
