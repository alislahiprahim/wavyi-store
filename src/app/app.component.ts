import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { BehaviorSubject } from 'rxjs';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, LoaderComponent, AsyncPipe, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wavyi-store';
  loading$: BehaviorSubject<boolean> = inject(LoaderService).loading$

  constructor() { }
}
