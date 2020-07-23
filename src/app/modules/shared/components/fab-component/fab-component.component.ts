import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { fabAnimations } from '@shared/components/fab-component/fab-component-animation';

@Component({
  selector: 'app-fab-component',
  templateUrl: './fab-component.component.html',
  styleUrls: ['./fab-component.component.scss'],
  animations: fabAnimations
})
export class FabComponentComponent implements OnInit {

  @Input() fabButtons: { icon: string, action: () => void }[];

  buttons = [];
  fabToggleState = 'inactive';

  constructor(private eRef: ElementRef) { }


  ngOnInit(): void {
  }

  showItems() {
    this.fabToggleState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabToggleState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideItems();
    }
  }

}
