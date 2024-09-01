import type { Config } from 'tailwindcss'
import {getIconCollections, iconsPlugin} from "@egoist/tailwindcss-icons";
export default <Partial<Config>>{
  plugins: [
      iconsPlugin({
        collections: getIconCollections(['flowbite'])
      })
  ],
  theme: {
    listStyleType: {
      disc: 'disc',
      decimal: 'decimal',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      fhd: '1920px',
      '2k': '2560px',
      '4k': '3840px',
    },
    container: {
      center: true
    },
    extend: {
      colors: {
        'black-pearl': {
          50: '#eef8ff',
          100: '#dcf1ff',
          200: '#b2e4ff',
          300: '#6dcfff',
          400: '#20b7ff',
          500: '#009dff',
          600: '#007ddf',
          700: '#0063b4',
          800: '#005495',
          900: '#00457a',
          950: '#001a31',
        },
        punch: {
          50: '#fef4f2',
          100: '#fde8e3',
          200: '#fcd5cc',
          300: '#f9b7a8',
          400: '#f38d76',
          500: '#e9674a',
          600: '#d24829',
          700: '#b43c21',
          800: '#95351f',
          900: '#7c3120',
          950: '#43160c',
        },

      }
    }
  }
}
