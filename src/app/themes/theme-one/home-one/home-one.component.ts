import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { SliderOneComponent } from '../../../components/slider-one/slider-one.component';
import { HomeService } from '../../../services/home.service';
import { Homeposters } from '../../../interfaces/homePosters';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-one',
  standalone: true,
  imports: [
    AsyncPipe,
    SliderOneComponent
  ],
  providers: [HomeService],
  template: `
  <app-slider-one [posters]="posters"></app-slider-one>
  `,

  styleUrl: './home-one.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOneComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  posters: Homeposters[] = [];
  constructor(public homeService: HomeService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.homeService.getPosters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res)
          this.posters = res.data;
        },
        error: (err) => {
          this.posters = [];
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
