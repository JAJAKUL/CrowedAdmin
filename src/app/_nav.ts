import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },



  {
    name: 'User Management',
    url: '/manage-user',
    icon: 'icon-wrench'
  },
  {
    name: 'Event Management',
    url: '/event-manage',
    icon: 'icon-shield'
  },

  {
    name: 'Coupon Management',
    url: '/coupon-manage',
    icon: 'icon-people'
  },

  {
    name: 'Room Management',
    url: '/room-manage',
    icon: 'icon-people'
  },

  {
    name: 'CMS ',
    url: '/pages',
    icon: 'icon-compass',
    children: [

      {
        name: 'About Us',
        url: '/about-us',
        icon: 'icon-speech'
      },
      // {
      //   name: 'Contact Us',
      //   url: '/page-underconstruction',
      //   icon: 'icon-cursor'
      // },
      {
        name: 'Terms & Conditions',
        url: '/terms-condition',
        icon: 'icon-docs'
      },
      {
        name: 'Privacy Policy',
        url: '/privacy-policy',
        icon: 'icon-doc'
      }
    ]
  },

];
