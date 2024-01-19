import { ChangeDetectionStrategy, Component, Input, OnInit, afterNextRender } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay, SwiperOptions, } from 'swiper';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Homeposters } from '../../interfaces/homePosters';
import { NgFor, NgStyle } from '@angular/common';
import { ImgBaseUrlPipe } from '../../pipes/img-base-url.pipe';
import { MatButtonModule } from '@angular/material/button'
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]);


@Component({
  selector: 'app-slider-one',
  standalone: true,
  imports: [NgFor, ImgBaseUrlPipe, NgStyle, SwiperModule, MatButtonModule],
  templateUrl: './slider-one.component.html',
  styleUrl: './slider-one.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(500)), // Adjust the duration as needed
    ]),
  ],
})
export class SliderOneComponent implements OnInit {
  navigation: boolean = true;
  config: SwiperOptions = {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 300,
    autoplay: { delay: 3500, pauseOnMouseEnter: false, disableOnInteraction: false, stopOnLastSlide: false },
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    // navigation: { hideOnClick: true },
    // pagination: { type: 'progressbar' },
    // scrollbar: { draggable: true },

  };

  @Input() posters: Homeposters[] = []
  animationState: string = 'hide';
  constructor() {
    afterNextRender(() => {
      this.navigation = !!(window.innerWidth > 600);
      console.log('this.navigation', this.navigation);
    })
    // this.homeService.getPosters()
  }

  onResize() {
    this.navigation = !!(window.innerWidth < 600);
  }

  ngOnInit(): void {
    // this.homeService.getHomePosters().subscribe({
    //   next: (res: any) => {
    //     this.posters = res.data
    //   },
    //   error: (err: any) => {
    //     console.log(err)
    //   }
    // })
    // const element = document.querySelector('.slider');
    // if (element) {
    //   element.classList.add('fade-in-out');
    // }
  }
}
