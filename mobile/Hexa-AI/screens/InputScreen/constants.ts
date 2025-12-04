import { LogoStyle } from './types';

export const LOGO_STYLES: LogoStyle[] = [
  {
    id: 'none',
    label: 'No Style',
    icon: require('../../assets/img/styles/no_style.png'),
  },
  {
    id: 'monogram',
    label: 'Monogram',
    icon: require('../../assets/img/styles/monogram.png'),
  },
  {
    id: 'abstract',
    label: 'Abstract',
    icon: require('../../assets/img/styles/abstract.png'),
  },
  {
    id: 'mascot',
    label: 'Mascot',
    icon: require('../../assets/img/styles/mascot.png'),
  },
];

export const SURPRISE_PROMPTS = [
  'A futuristic tech company logo with sleek lines',
  'A vintage coffee shop logo with a rustic feel',
  "A playful children\'s brand logo with bright colors",
  'An elegant fashion brand logo with minimalist design',
];
