import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.1ech.com/contact-us",
      },
      {
        label: "Blog",
        href: "https://pancakeswap.medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.1ech.com/contact-us/telegram",
      },
      {
        label: "RECH",
        href: "https://docs.1ech.com/tokenomics/rech",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.1ech.com/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.1ech.com/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.1ech.com/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.1ech.com",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@1ech-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.1ech.com/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.1ech.com/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/pancakeswap",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/pancakeswap",
      },
      {
        label: "Bahasa Indonesia",
        href: "https://t.me/PancakeSwapIndonesia",
      },
      {
        label: "中文",
        href: "https://t.me/PancakeSwap_CN",
      },
      {
        label: "Tiếng Việt",
        href: "https://t.me/PancakeSwapVN",
      },
      {
        label: "Italiano",
        href: "https://t.me/pancakeswap_ita",
      },
      {
        label: "русский",
        href: "https://t.me/pancakeswap_ru",
      },
      {
        label: "Türkiye",
        href: "https://t.me/pancakeswapturkiye",
      },
      {
        label: "Português",
        href: "https://t.me/PancakeSwapPortuguese",
      },
      {
        label: "Español",
        href: "https://t.me/PancakeswapEs",
      },
      {
        label: "日本語",
        href: "https://t.me/pancakeswapjp",
      },
      {
        label: "Français",
        href: "https://t.me/pancakeswapfr",
      },
      {
        label: "Deutsch",
        href: "https://t.me/PancakeSwap_DE",
      },
      {
        label: "Filipino",
        href: "https://t.me/Pancakeswap_Ph",
      },
      {
        label: "ქართული ენა",
        href: "https://t.me/PancakeSwapGeorgia",
      },
      {
        label: "Announcements",
        href: "https://t.me/PancakeSwapAnn",
      },
    ],
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "https://reddit.com/r/pancakeswap",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/pancakeswap_official",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/pancakeswap/",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/pancakeswap",
  },
  {
    label: "Medium",
    icon: MediumIcon,
    href: "https://pancakeswap.medium.com/",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
