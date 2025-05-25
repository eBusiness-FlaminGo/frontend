import {
  Component,
  Injectable,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import {Fact, FactService} from '../../services/fact.service';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
}

type Ad = { imageUrl: string; link: string; category: string };

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css'],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  animations: [
    trigger('cardAnimation', [
      state('center', style({
        opacity: 1,
        transform: 'translateX(0) rotate(0deg)',
        zIndex: 5
      })),
      state('left', style({
        opacity: 0,
        transform: 'translateX(-150%) rotate(-10deg)',
        zIndex: 1
      })),
      state('right', style({
        opacity: 0,
        transform: 'translateX(150%) rotate(10deg)',
        zIndex: 1
      })),
      state('dragging', style({
        transform: '{{transform}}',
        opacity: '{{opacity}}',
        zIndex: 10
      }), {params: {transform: 'translateX(0) rotate(0deg)', opacity: 1}}),
      transition('center => left', [
        animate('650ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ]),
      transition('center => right', [
        animate('650ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ]),
      transition('dragging => center', [
        animate('550ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition('dragging => left', [
        animate('650ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ]),
      transition('dragging => right', [
        animate('650ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ]),
      transition('void => center', [
        style({opacity: 0, transform: 'translateX(0) scale(0.9)'}),
        animate('550ms ease-out')
      ]),
      transition('left => center', [
        style({opacity: 0, transform: 'translateX(-100%) rotate(-10deg)'}),
        animate('550ms ease-out')
      ]),
      transition('right => center', [
        style({opacity: 0, transform: 'translateX(100%) rotate(10deg)'}),
        animate('550ms ease-out')
      ])
    ]),
    trigger('thumbsAnimation', [
      transition(':enter', [
        animate(
          '1s',
          keyframes([
            style({opacity: 0, transform: 'scale(0.5) translateY(0)', offset: 0}),
            style({opacity: 1, transform: 'scale(1) translateY(-20px)', offset: 0.5}),
            style({opacity: 0, transform: 'scale(1) translateY(-40px)', offset: 1})
          ])
        )
      ])
    ])
  ]
})
export class FactsComponent {
  fallbackAd: Ad = {imageUrl: './ads/ad_fallback.png', link: 'https://example.com/ad1', category: '*'};
  ads: Ad[] = [
    {imageUrl: './ads/ad1.png', link: 'https://example.com/ad1', category: 'Botany'},
    {imageUrl: './ads/ad2.png', link: 'https://example.com/ad3', category: 'Biotechnology'}
  ];

  getFilteredAd(category: string): Ad {
    const filteredAds = this.ads.filter(ad => ad.category === category);
    return filteredAds.length > 0 ? filteredAds[0] : this.fallbackAd;
  }

  currentIndex = 0;
  likedFacts: { title: string; content: string }[] = [];
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  animationState: 'center' | 'left' | 'right' | 'dragging' = 'center';
  animationParams = {transform: 'translateX(0) rotate(0deg)', opacity: 1};

  constructor(protected factService: FactService) {
    const storedLikes = localStorage.getItem('likedFacts');
    this.likedFacts = storedLikes ? JSON.parse(storedLikes) : [];
  }

  showThumbsUp = false;
  showThumbsDown = false;

  like() {
    this.showThumbsUp = true;
    setTimeout(() => {
      this.showThumbsUp = false;
    }, 1000);

    this.animationState = 'right';
    setTimeout(() => {
      const current = this.factService.facts()[this.currentIndex];
      if (current) {
        this.likedFacts.push({title: current.title, content: current.content});
        localStorage.setItem('likedFacts', JSON.stringify(this.likedFacts));
      }
      this.nextFact();
      this.animationState = 'center';
    }, 400);
  }

  dislike() {
    this.showThumbsDown = true;
    setTimeout(() => {
      this.showThumbsDown = false;
    }, 1000);

    this.animationState = 'left';
    setTimeout(() => {
      this.nextFact();
      this.animationState = 'center';
    }, 400);
  }

  nextFact() {
    if (this.currentIndex < this.factService.facts().length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = -1;
    }
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - (this.swipeCoord?.[0] || 0), coord[1] - (this.swipeCoord?.[1] || 0)];
      const duration = time - (this.swipeTime || 0);

      if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1]) * 3) {
        const swipe = direction[0] < 0 ? 'left' : 'right';
        swipe === 'left' ? this.dislike() : this.like();
      }
    }
  }
}
