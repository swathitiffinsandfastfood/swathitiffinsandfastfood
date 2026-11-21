/**
 * Swathi Tiffins & Fast Food - Official Image Asset Registry
 * Centralized, properly named image assets for all dishes, hero banners, and menu cards.
 */

export const IMAGE_ASSETS = {
  // Brand & Atmosphere
  heroBanner: '/images/hero-banner.jpg',
  menuCard: '/images/swathi-menu-card.jpg',

  // Traditional South Indian Tiffins
  idly: '/images/idly-sambar.jpg',
  idlyMenu: '/images/idly-menu.png',
  dosa: '/images/dosa.jpg',
  masalaDosaMenu: '/images/masala-dosa-menu.png',
  vada: '/images/vada.jpg',
  vadaMenu: '/images/vada-menu.png',
  chapathi: '/images/chapathi.jpg',
  chapathiMenu: '/images/chapathi-menu.png',
  porota: '/images/porota.jpg',
  porotaMenu: '/images/porota-menu.png',
  upmaPesarattu: '/images/upma-pesarattu.jpg',
  pesarattu: '/images/upma-pesarattu.jpg',

  // Evening Fast Food & Biryani
  chickenFriedRice: '/images/chicken-fried-rice.jpg',
  chickenNoodles: '/images/chicken-noodles.jpg',
  chickenFryBiryani: '/images/chicken-fry-biryani.jpg',
  chickenMughlaiBiryani: '/images/chicken-mughlai-biryani.jpg',
  chilliChicken: '/images/chilli-chicken.jpg',
  manchurian: '/images/manchurian.png',
} as const;

export type ImageAssetKey = keyof typeof IMAGE_ASSETS;
