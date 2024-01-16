import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LocalStorageConfigService } from '../../services/localStorageConfig.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state('void', style({
        transform: 'translateY(50%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in')
      ])
    ]),
    trigger('FadeInOut', [
      state('void', style({
        // transform: 'translateX(-20%)',
        opacity: 0
      })),
      state('*', style({
        // transform: 'translateX(0)',
        opacity: 1
      })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),

    ])
  ],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class DropdownComponent {
  showDropdown = false;
  showSubmenu = false;
  @Input({ required: true }) itemTitle: string = '';
  @Input({ required: true }) menuItems!: any[]
  constructor(public localStorageConfig: LocalStorageConfigService,) { }

  toggleMegaMenu(dropDown: HTMLElement, toggle: number = 0 || 1) {
    // if (toggle) {
    //   menu.style.opacity = '1';
    //   menu.style.visibility = 'visible';
    //   menu.style.animation = 'slideIn 0.2s infinite'
    //   return
    // }
    // menu.style.opacity = '0';
    // menu.style.visibility = 'hidden';
    // menu.style.animation = 'slideOut 0.2s infinite'
  }
  ngOnChanges(changes: any): void {
    // ;
  }
}
