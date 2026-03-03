// app/components/brand/BrandLogo.tsx
import {
  LOGO_ASSET_MAP,
  LOGO_BRANDING_CLASSES,
  LOGO_PRINT_CLASSES,
  LOGO_SIZE_CLASSES,
  type LogoBranding,
  type LogoPrintSize,
  type LogoSize,
  type LogoVariant,
} from './brandLogoClasses';

type BrandLogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  branding?: LogoBranding;
  printSize?: LogoPrintSize;
  alt?: string;
  className?: string;
};

export function BrandLogo({
  variant = 'primary',
  size,
  branding,
  printSize,
  alt = 'USRad',
  className,
}: BrandLogoProps) {
  const src = LOGO_ASSET_MAP[variant];

  const classes: string[] = ['select-none', 'object-contain'];

  if (branding) {
    classes.push('w-full', 'h-auto', LOGO_BRANDING_CLASSES[branding]);
  } else if (size) {
    classes.push(LOGO_SIZE_CLASSES[size]);
  }

  if (printSize) {
    classes.push(LOGO_PRINT_CLASSES[printSize]);
  }

  if (className) {
    classes.push(className);
  }

  return <img src={src} alt={alt} className={classes.join(' ')} />;
}
