import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  themeId(): number {
    let id: number = 1;
    return id;
  }
}
