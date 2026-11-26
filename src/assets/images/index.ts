import chapathiPhoto from './chapathi.jpg';
import chickenFriedRice from './chicken-fried-rice.jpg';
import chickenFryBiryani from './chicken-fry-biryani.jpg';
import chickenMughlaiBiryani from './chicken-mughlai-biryani.jpg';
import chickenNoodles from './chicken-noodles.jpg';
import chilliChicken from './chilli-chicken.jpg';
import dosa from './dosa.jpg';
import heroBanner from './hero-banner.jpg';
import idlySambar from './idly-sambar.jpg';
import porota from './porota.jpg';
import swathiMenuCard from './swathi-menu-card.jpg';
import upmaPesarattu from './upma-pesarattu.jpg';
import vada from './vada.jpg';

export const IMAGE_ASSETS = {
  heroBanner,
  menuCard: swathiMenuCard,
  idly: idlySambar,
  idlyMenu: idlySambar,
  dosa,
  masalaDosaMenu: '/images/masala-dosa-menu.png',
  vada,
  vadaMenu: vada,
  mysoreBajji: '/images/mysore-bajji.png',
  chapathi: chapathiPhoto,
  chapathiMenu: chapathiPhoto,
  porota,
  porotaMenu: porota,
  upmaPesarattu,
  upmaPesarattuMenu: upmaPesarattu,
  pesarattu: '/images/pesarattu-menu.png',
  pesarattuMenu: '/images/pesarattu-menu.png',
  poori: '/images/chapathi.jpg',
  chickenFriedRice,
  chickenNoodles,
  chickenFryBiryani,
  chickenMughlaiBiryani,
  chilliChicken,
  manchurian: '/images/manchurian.png',
} as const;

export type ImageAssetKey = keyof typeof IMAGE_ASSETS;
