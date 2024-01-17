import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('slideInOutLeft', [
      state('in', style({ left: '0%' })),
      state('out', style({ left: '-150%' })),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out')),
    ]),
    trigger('slideInOutRight', [
      state('in', style({ right: '0%' })),
      state('out', style({ right: '-150%' })),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out')),
    ]),
  ],
  standalone: true,
  imports: [NgClass, NgIf]
})
export class OverlayComponent {

  isVisible = false; // Input to control visibility
  @Input() position: 'right' | 'left' = 'left';
  @Input() styles!: string;
  @Input() showClose: boolean = true;

  open() {
    this.isVisible = true;
  }
  close() {
    this.isVisible = false;
  }
}
