import { Product } from "../store/comparisonSlice";

import apple_iphone_12 from '../images/phones/apple_iphone_12.png';
import xiaomi_mi_11_lite from '../images/phones/Xiaomi Mi 11 Lite 1.png';
import samsung_a72 from '../images/phones/A72.png';
import samsung_s21 from '../images/phones/S21.png';
import realme_8_pro from '../images/phones/realme_8_pro.png';
import apple_iphone_xr from '../images/phones/apple_iphone_xr.png'



export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 12',
    image: apple_iphone_12, // путь к изображению
    features: {
      producer: 'Apple',
      releaseYear: '2020',
      screenSize: '6.1" (дюйм)',
      country: 'Китай',
      memoryCapacity: '128 Гб',
      screenRefreshRate: '60 Гц',
      NFC: false,
      esimSupport: true,
      wirelessCharging: true,
      cost: '81 990 ₽'
    }
  },
  {
    id: 2,
    name: 'Xiaomi Mi 11 Lite',
    image: xiaomi_mi_11_lite,
    features: {
      producer: 'Xiaomi',
      releaseYear: '2021',
      screenSize: '6.55"',
      country: 'Китай',
      memoryCapacity: '128 Гб',
      screenRefreshRate: '90 Гц',
      NFC: true,
      esimSupport: true,
      wirelessCharging: false,
      cost: '27 490 ₽'
    }
  },
  {
    id: 3,
    name: 'Samsung Galaxy A72',
    image: samsung_a72,
    features: {
      producer: 'Samsung',
      releaseYear: '2021',
      screenSize: '6.7"',
      country: 'Вьетнам',
      memoryCapacity: '128 Гб',
      screenRefreshRate: '90 Гц',
      NFC: true,
      esimSupport: false,
      wirelessCharging: true,
      cost: '32 890 ₽'
    }
  },
  {
    id: 4,
    name: 'Samsung Galaxy S21',
    image: samsung_s21,
    features: {
      producer: 'Samsung',
      releaseYear: '2021',
      screenSize: '6.2"',
      country: 'Вьетнам',
      memoryCapacity: '128 Гб',
      screenRefreshRate: '120 Гц', // добавил 120 для варианта
      NFC: true,
      esimSupport: true,
      wirelessCharging: true,
      cost: '75 990 ₽'
    }
  },
  {
    id: 5,
    name: 'Apple iPhone XR',
    image: apple_iphone_xr,
    features: {
      producer: 'Apple',
      releaseYear: '2018',
      screenSize: '6.1"',
      country: 'Китай',
      memoryCapacity: '128 Гб',
      screenRefreshRate: '60 Гц',
      NFC: true,
      esimSupport: false,
      wirelessCharging: true,
      cost: '45 990 ₽'
    }
  },
  {
    id: 6,
    name: 'Realme 8 Pro',
    image: realme_8_pro,
    features: {
      producer: 'Realme',
      releaseYear: '2021',
      screenSize: '6.4"',
      country: 'Китай',
      memoryCapacity: '128 Гб',
      screenRefreshRate: '60 Гц',
      NFC: true,
      esimSupport: false,
      wirelessCharging: false,
      cost: '19 990 ₽'
    }
  }
];