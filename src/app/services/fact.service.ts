import {Injectable, signal} from '@angular/core';

export type Fact = { title: string; content: string; bg: string; category: string }


@Injectable({
  providedIn: 'root'
})
export class FactService {

  facts = signal<Fact[]>([
    {
      title: 'The Clonal Whiptail Lizard',
      content: `The New Mexico whiptail (Aspidoscelis neomexicana) is made up entirely of females and reproduces by parthenogenesis—each hatchling is a genetic clone of its mother. This means no energy is wasted on courtship or sperm production, allowing rapid population growth in stable desert habitats. However, the lack of genetic diversity makes them vulnerable to sudden environmental changes. By trading variation for efficiency, these lizards reveal nature's clever balancing act between risk and reward.`,
      bg: 'bg-blue-100',
      category: 'Zoology'
    },
    {
      title: 'Bananas Are True Berries',
      content: `Botanically speaking, a "berry" is a fruit that develops from a single ovary and contains seeds embedded directly in its flesh. Bananas, grapes, and even watermelons meet this criterion—making them true berries. Strawberries, on the other hand, form from a flower with multiple ovaries; the little "seeds" on the outside are actually individual fruits called achenes. This twist shows how everyday language can hide surprising botanical truths about the foods we eat.`,
      bg: 'bg-green-100',
      category: 'Botany'
    },
    {
      title: 'Tardigrades—Masters of DNA Repair',
      content: `Tardigrades, or "water bears," don't just survive extreme vacuum and radiation—they produce a unique protein called Dsup ("damage suppressor") that binds directly to their DNA. In lab tests, human cells engineered to produce Dsup showed up to 40% fewer DNA breaks under radiation exposure. Why? Because Dsup forms a flexible, protective shield around genetic material, preventing damage at the molecular level. Unlocking this natural mechanism could inspire revolutionary advances in medicine and biotechnology.`,
      bg: 'bg-yellow-100',
      category: 'Biotechnology'
    }
  ]);

  constructor() {
  }
}
