
import { IMAGE_ASSETS } from '../assets/images';

export interface MenuItem {
  id: string;
  name: string;
  category: 'TIFFIN' | 'FAST FOOD';
  categoryLabel?: string;
  price: number;
  priceDisplay: string;
  hasSizes?: boolean;
  halfPrice?: number;
  fullPrice?: number;
  prices?: {
    half: number;
    full: number;
  };
  description: string;
  image: string;
  tag?: string;
  isSpecial?: boolean;
  isVeg?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  prepTime?: string;
  desktopSpan?: string;
  tabletSpan?: string;
  minHeightDesktop?: string;
}

export const TIFFIN_ITEMS: MenuItem[] = [
  {
    id: 'idly',
    name: 'Idly (4 Pieces)',
    category: 'TIFFIN',
    categoryLabel: 'TRADITIONAL TIFFIN',
    price: 30,
    priceDisplay: '₹30',
    description:
      'Four soft steamed South Indian rice cakes served with fresh coconut chutney & piping hot sambar.',
    image: IMAGE_ASSETS.idly,
    tag: 'Steamed Fresh',
    isVeg: true,
    prepTime: '5 mins',
    desktopSpan: 'lg:row-span-3',
    tabletSpan: 'md:row-span-3',
    minHeightDesktop: 'lg:min-h-[460px]',
  },
  {
    id: 'dosa',
    name: 'Dosa',
    category: 'TIFFIN',
    categoryLabel: 'SIGNATURE TIFFIN',
    price: 40,
    priceDisplay: '₹40',
    description:
      'Crisp golden crepe roasted with pure ghee, served with spiced potato masala & chutneys.',
    image: IMAGE_ASSETS.dosa,
    tag: 'Ghee Roasted',
    isSpecial: true,
    isVeg: true,
    prepTime: '8 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
  {
    id: 'vada',
    name: 'Vada',
    category: 'TIFFIN',
    categoryLabel: 'CRISPY FAVOURITE',
    price: 30,
    priceDisplay: '₹30',
    description:
      'Crispy golden lentil fritters with a fluffy interior, ginger, peppercorns & chutneys.',
    image: IMAGE_ASSETS.vada,
    tag: 'Crispy Snack',
    isVeg: true,
    prepTime: '5 mins',
    desktopSpan: 'lg:row-span-3',
    tabletSpan: 'md:row-span-3',
    minHeightDesktop: 'lg:min-h-[460px]',
  },
  {
    id: 'mysore-bajji',
    name: 'Mysore Bajji (4 Pieces)',
    category: 'TIFFIN',
    categoryLabel: 'CRISPY SNACK',
    price: 30,
    priceDisplay: '₹30',
    description:
      'Four golden, fluffy Mysore bajjis served hot with fresh chutney.',
    image: IMAGE_ASSETS.vada,
    tag: 'Crispy Favourite',
    isVeg: true,
    prepTime: '8 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
  {
    id: 'chapathi',
    name: 'Chapathi',
    category: 'TIFFIN',
    categoryLabel: 'HOMESTYLE TIFFIN',
    price: 40,
    priceDisplay: '₹40',
    description:
      'Two soft hand-rolled whole-wheat flatbreads served with rich spiced vegetable kurma.',
    image: IMAGE_ASSETS.chapathi,
    tag: 'Homestyle',
    isVeg: true,
    prepTime: '10 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
  {
    id: 'porota',
    name: 'Porota',
    category: 'TIFFIN',
    categoryLabel: 'SOUTHERN CLASSIC',
    price: 40,
    priceDisplay: '₹40',
    description:
      'Flaky layered South Indian parotta freshly toasted on the tawa, served with rich salna.',
    image: IMAGE_ASSETS.porota,
    tag: 'Flaky Layers',
    isVeg: true,
    prepTime: '8 mins',
    desktopSpan: 'lg:row-span-3',
    tabletSpan: 'md:row-span-3',
    minHeightDesktop: 'lg:min-h-[460px]',
  },
  {
    id: 'upma-pesarattu',
    name: 'Upma Pesarattu',
    category: 'TIFFIN',
    categoryLabel: 'ANDHRA SPECIAL',
    price: 50,
    priceDisplay: '₹50',
    description:
      'Crisp whole green gram crepe filled with savory spiced upma, served with ginger & coconut chutney.',
    image: IMAGE_ASSETS.upmaPesarattu,
    tag: 'Andhra Special',
    isVeg: true,
    prepTime: '8 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
  {
    id: 'pesarattu',
    name: 'Pesarattu',
    category: 'TIFFIN',
    categoryLabel: 'ANDHRA SPECIAL',
    price: 50,
    priceDisplay: '₹50',
    description:
      'Nutritious whole green gram crepe with finely chopped onions, served with ginger chutney.',
    image: IMAGE_ASSETS.pesarattu,
    tag: 'Andhra Special',
    isVeg: true,
    prepTime: '10 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
];

export const FAST_FOOD_ITEMS: MenuItem[] = [
  {
    id: 'chicken-fried-rice',
    name: 'Chicken Fried Rice',
    category: 'FAST FOOD',
    categoryLabel: 'WOK SPECIAL',
    price: 50,
    priceDisplay: 'Half ₹50 / Full ₹100',
    hasSizes: true,
    halfPrice: 50,
    fullPrice: 100,
    prices: {
      half: 50,
      full: 100,
    },
    description:
      'Wok-tossed fragrant basmati rice with tender seasoned chicken & crunchy fresh vegetables.',
    image: IMAGE_ASSETS.chickenFriedRice,
    tag: 'Wok Tossed',
    isSpecial: true,
    isVeg: false,
    prepTime: '12 mins',
    desktopSpan: 'lg:row-span-3',
    tabletSpan: 'md:row-span-3',
    minHeightDesktop: 'lg:min-h-[460px]',
  },
  {
    id: 'chicken-noodles',
    name: 'Chicken Noodles',
    category: 'FAST FOOD',
    categoryLabel: 'STREET NOODLES',
    price: 50,
    priceDisplay: 'Half ₹50 / Full ₹100',
    hasSizes: true,
    halfPrice: 50,
    fullPrice: 100,
    prices: {
      half: 50,
      full: 100,
    },
    description:
      'Street-style wok-tossed noodles with shredded chicken, crisp peppers & zesty chilli sauces.',
    image: IMAGE_ASSETS.chickenNoodles,
    tag: 'Street Favourite',
    isVeg: false,
    prepTime: '10 mins',
    desktopSpan: 'lg:row-span-3',
    tabletSpan: 'md:row-span-3',
    minHeightDesktop: 'lg:min-h-[460px]',
  },
  {
    id: 'chicken-fry-biryani',
    name: 'Chicken Fry Biryani',
    category: 'FAST FOOD',
    categoryLabel: 'BIRYANI SPECIAL',
    price: 100,
    priceDisplay: '₹100',
    description:
      'Aromatic spiced basmati biryani topped with crispy fried spiced chicken & cooling raita.',
    image: IMAGE_ASSETS.chickenFryBiryani,
    tag: 'Chef Special',
    isSpecial: true,
    isVeg: false,
    prepTime: '10 mins',
    desktopSpan: 'lg:row-span-3',
    tabletSpan: 'md:row-span-3',
    minHeightDesktop: 'lg:min-h-[460px]',
  },
  {
    id: 'chicken-mughlai-biryani',
    name: 'Chicken Mughlai Biryani',
    category: 'FAST FOOD',
    categoryLabel: 'ROYAL SPECIAL',
    price: 120,
    priceDisplay: '₹120',
    description:
      'Rich slow-cooked royal dum biryani infused with saffron, egg, tender chicken & creamy gravy.',
    image: IMAGE_ASSETS.chickenMughlaiBiryani,
    tag: 'Royal Dum',
    isVeg: false,
    prepTime: '12 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
  {
    id: 'chilli-chicken',
    name: 'Chilli Chicken',
    category: 'FAST FOOD',
    categoryLabel: 'INDO-CHINESE',
    price: 50,
    priceDisplay: '₹50',
    description:
      'Crispy chicken bites glazed in fiery dark wok sauce with sliced green chillies & scallions.',
    image: IMAGE_ASSETS.chilliChicken,
    tag: 'Indo-Chinese Sizzler',
    isVeg: false,
    prepTime: '12 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
  {
    id: 'manchurian',
    name: 'Manchurian',
    category: 'FAST FOOD',
    categoryLabel: 'INDO-CHINESE',
    price: 50,
    priceDisplay: '₹50',
    description:
      'Crispy vegetable Manchurian tossed in a flavorful Indo-Chinese sauce with fresh vegetables and aromatic spices.',
    image: IMAGE_ASSETS.manchurian,
    tag: 'Street Favourite',
    isVeg: true,
    prepTime: '10 mins',
    desktopSpan: 'lg:row-span-2',
    tabletSpan: 'md:row-span-2',
    minHeightDesktop: 'lg:min-h-[290px]',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  ...TIFFIN_ITEMS,
  ...FAST_FOOD_ITEMS,
];

export interface GalleryItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  colSpan?: string;
  rowSpan?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    name: 'Soft Steamed Idly',
    category: 'Morning Tiffin',
    image: IMAGE_ASSETS.idly,
    description:
      'Melt-in-mouth rice cakes with fresh coconut chutney and piping hot sambar.',
  },
  {
    id: 'g-2',
    name: 'Crispy Golden Dosa',
    category: 'Signature Tiffin',
    image: IMAGE_ASSETS.dosa,
    description:
      'Paper-thin roasted crepe with pure ghee and potato masala.',
  },
  {
    id: 'g-3',
    name: 'Golden Medu Vada',
    category: 'Crispy Snack',
    image: IMAGE_ASSETS.vada,
    description:
      'Lentil fritters seasoned with ginger and whole black pepper.',
  },
  {
    id: 'g-4',
    name: 'Layered Porota',
    category: 'Southern Classic',
    image: IMAGE_ASSETS.porota,
    description:
      'Flaky layered South Indian parotta served with rich aromatic salna.',
  },
  {
    id: 'g-5',
    name: 'Wok Chicken Fried Rice',
    category: 'Fast Food',
    image: IMAGE_ASSETS.chickenFriedRice,
    description:
      'Tossed over high flame with fresh spices, scallions & tender chicken.',
  },
  {
    id: 'g-6',
    name: 'Street Chicken Noodles',
    category: 'Fast Food',
    image: IMAGE_ASSETS.chickenNoodles,
    description:
      'Hot stir-fried noodles with crisp peppers, garlic and chilli sauce.',
  },
  {
    id: 'g-7',
    name: 'Chicken Fry Biryani',
    category: 'Chef Special',
    image: IMAGE_ASSETS.chickenFryBiryani,
    description:
      'Spiced aromatic basmati topped with golden crispy fried chicken pieces.',
  },
  {
    id: 'g-8',
    name: 'Royal Mughlai Biryani',
    category: 'Royal Dum Special',
    image: IMAGE_ASSETS.chickenMughlaiBiryani,
    description:
      'Infused with saffron, boiled egg, tender chicken and aromatic spices.',
  },
  {
    id: 'g-9',
    name: 'Fiery Chilli Chicken',
    category: 'Indo-Chinese',
    image: IMAGE_ASSETS.chilliChicken,
    description:
      'Crisp chicken cubes glazed with fiery green chillies and soy.',
  },
  {
    id: 'g-10',
    name: 'Manchurian',
    category: 'Indo-Chinese',
    image: IMAGE_ASSETS.manchurian,
    description:
      'Crispy vegetable Manchurian tossed in a flavorful Indo-Chinese sauce with fresh vegetables and aromatic spices.',
  },
];

