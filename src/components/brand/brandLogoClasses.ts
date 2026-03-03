// app/components/brand/brandLogoClasses.ts

export const LOGO_ASSET_MAP = {
  primary: '/images/logo/brand/usrad-logo.svg',
  white: '/images/logo/brand/usrad-logo-white.svg',
  navy: '/images/logo/brand/usrad-logo-navy.svg',
  black: '/images/logo/brand/usrad-logo-black.svg',
} as const;

export const LOGO_SIZE_CLASSES = {
  compact: 'h-7 sm:h-9',
  navbar: 'h-8 sm:h-10',
  header: 'h-10 sm:h-12',
  footer: 'h-8 sm:h-10',
  login: 'h-16',
  'login-lg': 'h-20',
} as const;

export const LOGO_PRINT_CLASSES = {
  compact: 'print:h-9',
  navbar: 'print:h-10',
  header: 'print:h-12',
} as const;

export const LOGO_BRANDING_CLASSES = {
  sm: 'max-w-[120px]',
  md: 'max-w-[160px]',
  lg: 'max-w-[200px]',
  xl: 'max-w-[280px]',
} as const;

export type LogoVariant = keyof typeof LOGO_ASSET_MAP;
export type LogoSize = keyof typeof LOGO_SIZE_CLASSES;
export type LogoPrintSize = keyof typeof LOGO_PRINT_CLASSES;
export type LogoBranding = keyof typeof LOGO_BRANDING_CLASSES;
