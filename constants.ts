import { ShoppingItem } from './types';

// Level 1 Data
export const LEVEL1_GOOD_ITEMS = ['🍎', '🌰', '🥛', '📒', '👕', '🧼', '🍇'];
export const LEVEL1_BAD_ITEMS = ['🥤', '👾', '🍬', '🤖'];

// Level 2 Data
export const SHOPPING_ITEMS: ShoppingItem[] = [
  { id: 1, name: 'Yerli Elma', price: 3, isDomestic: true, emoji: '🍎' },
  { id: 2, name: 'İthal Muz', price: 8, isDomestic: false, emoji: '🍌' },
  { id: 3, name: 'Fındık', price: 5, isDomestic: true, emoji: '🌰' },
  { id: 4, name: 'Kola', price: 6, isDomestic: false, emoji: '🥤' },
  { id: 5, name: 'Süt (Yerli)', price: 4, isDomestic: true, emoji: '🥛' },
  { id: 6, name: 'Çikolata (Yabancı)', price: 7, isDomestic: false, emoji: '🍫' },
  { id: 7, name: 'Zeytin', price: 4, isDomestic: true, emoji: '🫒' },
  { id: 8, name: 'Oyuncak Robot', price: 10, isDomestic: false, emoji: '🤖' },
];

// Level 4 Data
export const FACTORY_GOOD_ITEMS = ['🍎', '🏺', '📦', '🥛']; // Apples, Jars, Packages, Milk
export const FACTORY_BAD_ITEMS = ['🥤', '🚬', '🔋', '🧴']; // Soda, Waste, Batteries, Plastic
