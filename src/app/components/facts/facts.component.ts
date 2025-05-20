import {
  Component,
  Injectable
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
}

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
      state('center', style({opacity: 1, transform: 'translateX(0)'})),
      state('left', style({opacity: 0, transform: 'translateX(-100%)'})),
      state('right', style({opacity: 0, transform: 'translateX(100%)'})),
      transition('center => left', [
        animate('300ms ease-in')
      ]),
      transition('center => right', [
        animate('300ms ease-in')
      ]),
      transition('void => center', [
        style({opacity: 0, transform: 'translateX(0)'}),
        animate('300ms ease-out')
      ]),
      transition('left => center', [
        style({opacity: 0, transform: 'translateX(-100%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
      ]),
      transition('right => center', [
        style({opacity: 0, transform: 'translateX(100%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
      ])
    ])
  ]
})
export class FactsComponent {
  facts: { title: string; content: string; bg: string }[] = [
    {
      title: 'The Clonal Whiptail Lizard',
      content: `The New Mexico whiptail (Aspidoscelis neomexicana) is made up entirely of females and reproduces by parthenogenesis—each hatchling is a genetic clone of its mother. This means no energy is wasted on courtship or sperm production, allowing rapid population growth in stable desert habitats. However, the lack of genetic diversity makes them vulnerable to sudden environmental changes. By trading variation for efficiency, these lizards reveal nature’s clever balancing act between risk and reward.`,
      bg: 'bg-blue-100'
    },
    {
      title: 'Bananas Are True Berries',
      content: `Botanically speaking, a “berry” is a fruit that develops from a single ovary and contains seeds embedded directly in its flesh. Bananas, grapes, and even watermelons meet this criterion—making them true berries. Strawberries, on the other hand, form from a flower with multiple ovaries; the little “seeds” on the outside are actually individual fruits called achenes. This twist shows how everyday language can hide surprising botanical truths about the foods we eat.`,
      bg: 'bg-green-100'
    },
    {
      title: 'Tardigrades—Masters of DNA Repair',
      content: `Tardigrades, or “water bears,” don’t just survive extreme vacuum and radiation—they produce a unique protein called Dsup (“damage suppressor”) that binds directly to their DNA. In lab tests, human cells engineered to produce Dsup showed up to 40% fewer DNA breaks under radiation exposure. Why? Because Dsup forms a flexible, protective shield around genetic material, preventing damage at the molecular level. Unlocking this natural mechanism could inspire revolutionary advances in medicine and biotechnology.`,
      bg: 'bg-yellow-100'
    }
  ];

  currentIndex = 0;
  likedFacts: { title: string; content: string }[] = [];

  animationState: 'center' | 'left' | 'right' = 'center';

  constructor() {
    const storedLikes = localStorage.getItem('likedFacts');
    this.likedFacts = storedLikes ? JSON.parse(storedLikes) : [];
  }

  like() {
    this.animationState = 'left';
    setTimeout(() => {
      const current = this.facts[this.currentIndex];
      if (current) {
        this.likedFacts.push({title: current.title, content: current.content});
        localStorage.setItem('likedFacts', JSON.stringify(this.likedFacts));
      }
      this.nextFact();
      this.animationState = 'center';
    }, 300);
  }

  dislike() {
    this.animationState = 'right';
    setTimeout(() => {
      this.nextFact();
      this.animationState = 'center';
    }, 300);
  }

  nextFact() {
    if (this.currentIndex < this.facts.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = -1;
    }
  }

  // Swipe tracking logic
  private swipeCoord?: [number, number];
  private swipeTime?: number;

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
        swipe === 'left' ? this.like() : this.dislike();
      }
    }
  }
}
