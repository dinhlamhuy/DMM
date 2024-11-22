/* eslint-disable react-refresh/only-export-components */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_VN from './VN.json';
import translation_EN from './EN.json';
import translation_MN from './MN.json';



const resources = {
  EN: {
    all: translation_EN
  },
  VN: {
    all: translation_VN
  },
  MN: {
    all: translation_MN
  }

}
const defaultNS= 'all';

 const DefautLng = localStorage.getItem('Lng');
 const factory = localStorage.getItem('Factory');

const lngDefault = DefautLng === null ? factory ==='LYM'?'MN': 'EN' :DefautLng;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lngDefault,
    ns:['all'],
    fallbackLng: lngDefault,
    defaultNS,
    interpolation: {
      escapeValue: false
    }
  });
  // console.log('Initialized i18n with:', resources, lngDefault, defaultNS);
  

export default i18n;