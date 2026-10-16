/**
 * Swathi Tiffins & Fast Food - Official Image Asset Registry
 * Centralized, properly named image assets for all dishes, hero banners, and menu cards.
 */

export const IMAGE_ASSETS = {
  // Brand & Atmosphere
  heroBanner: '/src/assets/images/hero-banner.jpg',
  menuCard: '/src/assets/images/swathi-menu-card.jpg',

  // Traditional South Indian Tiffins
  idly: '/src/assets/images/idly-sambar.jpg',
  dosa: '/src/assets/images/dosa.jpg',
  vada: '/src/assets/images/vada.jpg',
  chapathi: '/src/assets/images/chapathi.jpg',
  porota: '/src/assets/images/porota.jpg',
  upmaPesarattu: '/src/assets/images/upma-pesarattu.jpg',
  pesarattu: '/src/assets/images/upma-pesarattu.jpg',

  // Evening Fast Food & Biryani
  chickenFriedRice: '/src/assets/images/chicken-fried-rice.jpg',
  chickenNoodles: '/src/assets/images/chicken-noodles.jpg',
  chickenFryBiryani: '/src/assets/images/chicken-fry-biryani.jpg',
  chickenMughlaiBiryani: '/src/assets/images/chicken-mughlai-biryani.jpg',
  chilliChicken: '/src/assets/images/chilli-chicken.jpg',
} as const;

export type ImageAssetKey = keyof typeof IMAGE_ASSETS;
