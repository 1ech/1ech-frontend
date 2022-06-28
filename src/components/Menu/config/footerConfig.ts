import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.1ech.com/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.1ech.com/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Community'),
        href: 'https://docs.1ech.com/contact-us/telegram',
      },
      {
        label: t('Litepaper'),
        href: 'https://v2litepaper.1ech.com/',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://pancakeswap.creator-spring.com/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.1ech.com/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.1ech.com/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.1ech.com/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.1ech.com',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.1ech.com/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.1ech.com/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.1ech.com/hiring/become-a-chef',
      },
    ],
  },
]
